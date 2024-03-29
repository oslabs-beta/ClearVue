<template>
  <div>
    <svg></svg>
  </div>
</template>

<script lang="js">
/* eslint no-underscore-dangle: ["error", { "allow": ["_children"] }] */
/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-shadow */

import { defineComponent } from 'vue';
import * as d3 from 'd3';

export default defineComponent({
  name: 'Tree',
  mounted() {

    // 1. Access Data

    const treeData = {
      name: 'root',
      children: [
        { name: 'child #1' },
        {
          name: 'child #2',
          children: [
            { name: 'grandchild #1' },
            { name: 'grandchild #2' },
            { name: 'grandchild #3' },
          ],
        },
      ],
    };

    // 2. Create chart dimensions

    const dimensions = {
      width: window.innerwidth * 0.9,
      height: window.innerHeight * 0.9,
      margin: {
        top: 15,
        right: 15,
        bottom: 40,
        left: 60,
      },
    };

    dimensions.boundedWidth = dimensions.width
      - dimensions.margin.left
      - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height
      - dimensions.margin.top
      - dimensions.margin.bottom;

    // 3. Draw Canvas/Create Tree Structure

    const tree = d3.layout.tree()
      .size([dimensions.height, dimensions.width]);


    // const margin = ({
    //   top: 10, right: 120, bottom: 10, left: 40,
    // });
    // const width = 960 - margin.right - margin.left;
    // const height = 500 - margin.top - margin.bottom;

    const dx = 10;
    const dy = dimensions.boundedWidth / 6;
    const tree = d3.tree().nodeSize([dx, dy]);

    const diagonal = d3.linkHorizontal().x((d) => d.y).y((d) => d.x);

    const root = d3.hierarchy(treeData);

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (d.depth && d.data.name.length !== 7) d.children = null;
    });

    const svg = d3.select('svg')
      .attr('viewBox', [500, 100, dimensions.boundedWidth, dx])
      .style('font', '10px sans-serif')
      .style('user-select', 'none');

    const gLink = svg.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#555')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', 1.5);

    const gNode = svg.append('g')
      .attr('cursor', 'pointer')
      .attr('pointer-events', 'all');

    function update(source) {
      const duration = d3.event && d3.event.altKey ? 2500 : 250;
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Compute the new tree layout.
      tree(root);

      let left = root;
      let right = root;
      root.eachBefore((node) => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + margin.top + margin.bottom;

      const transition = svg.transition()
        .duration(duration)
        .attr('viewBox', [-margin.left, left.x - margin.top, dimensions.boundedWidth, height])
        .tween('resize', window.ResizeObserver ? null : () => () => svg.dispatch('toggle'));

      // Update the nodes…
      const node = gNode.selectAll('g')
        .data(nodes, (d) => d.id);

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
        .attr('transform', (d) => `translate(${source.y0},${source.x0})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .on('click', (event, d) => {
          d.children = d.children ? null : d._children;
          update(d);
        });

      nodeEnter.append('circle')
        .attr('r', 2.5)
        .attr('fill', (d) => (d._children ? '#555' : '#999'))
        .attr('stroke-width', 10);

      nodeEnter.append('text')
        .attr('dy', '0.31em')
        .attr('x', (d) => (d._children ? -6 : 6))
        .attr('text-anchor', (d) => (d._children ? 'end' : 'start'))
        .text((d) => d.data.name)
        .clone(true)
        .lower()
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .attr('stroke', 'white');

      // Transition nodes to their new position.
      const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr('transform', (d) => `translate(${d.y},${d.x})`)
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1);

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition(transition).remove()
        .attr('transform', (d) => `translate(${source.y},${source.x})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0);

      // Update the links…
      const link = gLink.selectAll('path')
        .data(links, (d) => d.target.id);

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append('path')
        .attr('d', (d) => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
        .attr('d', diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
        .attr('d', (d) => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        });

      // Stash the old positions for transition.
      root.eachBefore((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    update(root);

    return svg.node();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
