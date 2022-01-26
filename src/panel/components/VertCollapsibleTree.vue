<template>
  <div>
    <svg id="vert-collapse-tree" width="500" height="500"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import * as flextree from 'd3-flextree';

export default {
  mounted() {
    const treeData = {
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
                { name: 'BABB', size: [100, 50] },
              ],
            },
            { name: 'BAC', size: [200, 50] },
          ],
        },
        {
          name: 'BB',
          size: [100, 75],
          children: [
            { name: 'BBA', size: [50, 50] },
            { name: 'BBB', size: [50, 50] },
          ],
        },
      ],
    };

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
      const path = `M ${s.x} ${s.y}
            C ${(s.x + d.x) / 2} ${s.y},
              ${(s.x + d.x) / 2} ${d.y},
              ${d.x} ${d.y}`;

      return path;
    }

    function update(source) {
      // Assigns the x and y position for the nodes
      const flexLayout = flextree.flextree();
      // eslint-disable-next-line no-shadow
      const treeData = flexLayout(source);

      // Compute the new tree layout.
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      // ****************** Nodes section ***************************

      const width = 960;
      const height = 500;
      let i = 0;

      // append the svg object to the body of the page
      const svg = d3.select('#vert-collapse-tree');
      const g = svg
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},100)`);

      // Update the nodes...
      const node = g.selectAll('g.node').data(nodes, (d) => d.id || (d.id = ++i));

      // Enter any new modes at the parent's previous position.
      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${source.x0},${source.y0})`)
        // eslint-disable-next-line no-use-before-define
        .on('click', click);

      // Add Circle for the nodes
      nodeEnter
        .append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        // eslint-disable-next-line no-underscore-dangle
        .style('fill', (d) => (d._children ? 'lightsteelblue' : '#fff'));

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
        .attr('fill', '#fff')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', '3px;')
        .style('font', '12px sans-serif');

      const duration = 750;

      // Transition to the proper position for the node
      nodeUpdate
        .transition()
        .duration(duration)
        // eslint-disable-next-line func-names
        .attr('transform', function (event, _i, arr) {
          const d = d3.select(this).datum();
          return `translate(${d.x},${d.y})`;
        });

      // Update the node attributes and style
      nodeUpdate
        .select('circle.node')
        .attr('r', 20)
        // eslint-disable-next-line no-underscore-dangle
        .style('fill', (d) => (d._children ? 'lightsteelblue' : '#fff'))
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
        .attr('d', function (event, _i, arr) {
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
      return svg.node();
    }

    // Toggle children on click.
    function click(event, d) {
      if (d.children) {
        // eslint-disable-next-line no-underscore-dangle
        d._children = d.children;
        d.children = null;
      } else {
        // eslint-disable-next-line no-underscore-dangle
        d.children = d._children;
        // eslint-disable-next-line no-underscore-dangle
        d._children = null;
      }
      update(d);
    }

    const root = d3.hierarchy(treeData, (d) => d.children);

    // Collapse the node and all it's children
    function collapse(d) {
      if (d.children) {
        // eslint-disable-next-line no-underscore-dangle
        d._children = d.children;
        // eslint-disable-next-line no-underscore-dangle
        d._children.forEach(collapse);
        d.children = null;
      }
    }
    // Collapse after second level
    root.children.forEach(collapse);
    root.x0 = 0;
    root.y0 = 0;

    update(root);
  },
};
</script>
