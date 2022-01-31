<template>
  <div class='svg-container'>
    <svg id='vert-collapse-tree'></svg>
  </div>
  <div>{{ getChartData }}</div>
  <div>{{ treeData }}</div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
import { defineComponent } from 'vue';
import * as d3 from 'd3';
import * as flextree from 'd3-flextree';

export default defineComponent({
  name: 'VerticalTree',
  computed: {
    getChartData() {
      return this.$store.getters.getChartData;
    },
    treeData() {
      return this.$store.state.treeData;
    },
  },
  mounted() {
    let treeData;

    // populate treeData based on current mode
    if (process.env.NODE_ENV === 'production') {
      treeData = this.getChartData;
    } else {
      treeData = {
        name: 'A',
        size: [100, 100],
        children: [
          {
            name: 'BA',
            size: [100, 50],
            children: [
              { name: 'BAA', size: [100, 50] },
              {
                name: 'BAB',
                size: [100, 50],
                children: [
                  { name: 'BABA', size: [100, 50] },
                  {
                    name: 'BABB',
                    size: [100, 50],
                    children: [
                      { name: 'BABBA', size: [100, 50] },
                    ],
                  },
                  { name: 'BABC', size: [100, 50] },
                ],
              },
              { name: 'BAC', size: [100, 50] },
            ],
          },
          {
            name: 'BB',
            size: [100, 75],
            children: [
              { name: 'BBA', size: [100, 50] },
              { name: 'BBB', size: [100, 50] },
              { name: 'BBC', size: [100, 50] },
            ],
          },
        ],
      };
    }

    const width = 600;
    const height = 400;

    const flexLayout = flextree.flextree();

    // append the svg object to the body of the page
    const svg = d3.select('#vert-collapse-tree');
    const g = svg
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 600 400')
      // class to make it responsive
      .classed('svg-content-responsive', true)
      .append('g')
      .attr('transform', `translate(${width / 2},100)`);

    const duration = 750;
    let i = 0;
    const root = d3.hierarchy(treeData, (d) => d.children);

    // Collapse after second level
    root.children.forEach(collapse);
    root.x0 = 0;
    root.y0 = 0;

    // Collapse the node and all it's children
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }
    function update(source) {
      // Assigns the x and y position for the nodes
      const treeData = flexLayout(root);

      // Compute the new tree layout.
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      // ****************** Nodes section ***************************

      // Update the nodes...
      const node = g.selectAll('g.node').data(nodes, (d) => d.id || (d.id = ++i));

      // Enter any new modes at the parent's previous position.
      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${source.x0},${source.y0})`)
        .on('dblclick', click);

      // Add Circle for the nodes
      // nodeEnter
      //   .append('circle')
      //   .attr('class', 'node')
      //   .attr('r', 1e-6)
      //   .style('fill', (d) => (d._children ? '#42b883' : '#e3e3e3'));

      // Add rectangle instead of circle for the nodes
      let rectWidth = 65;
      const rectHeight = 30;
      nodeEnter.append('rect')
        .attr('class', 'node')
        .attr('width', (d) => rectWidth = (d.data.name.length > 6) ? 85 : 65)
        .attr('height', rectHeight)
        .attr('x', -(rectWidth / 2))
        .attr('y', -(rectHeight / 2))
        .attr('rx', 5)
        .attr('ry', 5)
        // .translate(1, 1)
        .style('fill', (d) => (d._children ? '#42b883' : '#e3e3e3'));

      // Add tooltip for nodes
      nodeEnter.append('svg:title')
        .text((d) => d.data.name);

      // Add labels for the nodes
      nodeEnter
        .append('text')
        .attr('pointer-events', 'none')
        .attr('dy', '0.35em')
        .text((d) => d.data.name)
        .attr('text-anchor', 'middle');

      // UPDATE
      const nodeUpdate = nodeEnter
        .merge(node)
        .attr('fill', '#42b883')
        .attr('stroke', '#35495e')
        .attr('stroke-width', '3px;')
        .style('font', '12px sans-serif');

      // Transition to the proper position for the node
      nodeUpdate
        .transition()
        .duration(duration)
        .attr('transform', function (event, i, arr) {
          const d = d3.select(this).datum();
          return `translate(${d.x},${d.y})`;
        });

      // Update the node attributes and style
      nodeUpdate
        .select('circle.node')
        .attr('r', 20)
        .style('fill', (d) => (d._children ? '#42b883' : '#e3e3e3'))
        .attr('cursor', 'pointer');

      // Remove any exiting nodes
      const nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr('transform', function (event, _i, arr) {
          const d = d3.select(this).datum();
          return `translate(${source.x},${source.y})`;
        })
        .remove();

      // On exit reduce the node circles size to 0
      nodeExit.select('circle').attr('r', 1e-6);

      // On exit reduce the opacity of text labels
      nodeExit.select('text').style('fill-opacity', 1e-6);

      // ****************** links section ***************************

      // Update the links...
      const link = g.selectAll('path.link').data(links, (d) => d.id);

      // Enter any new links at the parent's previous position.
      const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', (d) => {
          const o = {
            x: source.x0,
            y: source.y0,
          };
          return diagonal(o, o);
        });

      // UPDATE
      const linkUpdate = linkEnter
        .merge(link)
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('stroke-width', '2px');

      // Transition back to the parent element position
      linkUpdate
        .transition()
        .duration(duration)
        .attr('d', (d) => diagonal(d, d.parent));

      // Remove any exiting links
      const linkExit = link
        .exit()
        .transition()
        .duration(duration)
        .attr('d', function (event, i, arr) {
          const d = d3.select(this).datum();
          const o = {
            x: source.x,
            y: source.y,
          };
          return diagonal(o, o);
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {
        const path = `M ${s.x} ${s.y}
            C ${(s.x + d.x) / 2} ${s.y},
              ${(s.x + d.x) / 2} ${d.y},
              ${d.x} ${d.y}`;

        return path;
      }

      // Toggle children on click.
      function click(event, d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
    }
    // eslint-disable-next-line no-use-before-define
    update(root);
  },
});
</script>
