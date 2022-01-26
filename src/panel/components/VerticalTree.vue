<template>
  <div>
    <svg id="vertical-tree"></svg>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineComponent } from '@vue/runtime-core';
import * as d3 from 'd3';

export default defineComponent({
  name: 'Tree',
  mounted() {
    const treeData = [
      {
        name: 'Top Level',
        parent: 'null',
        children: [
          {
            name: 'Level 2: A',
            parent: 'Top Level',
            children: [
              {
                name: 'Son of A',
                parent: 'Level 2: A',
              },
              {
                name: 'Daughter of A',
                parent: 'Level 2: A',
              },
            ],
          },
          {
            name: 'Level 2: B',
            parent: 'Top Level',
          },
        ],
      },
    ];

    // ************** Generate the tree diagram *****************
    const margin = {
      top: 40,
      right: 120,
      bottom: 20,
      left: 120,
    };
    const width = 960 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;

    let i = 0;

    const tree = d3.layout.tree().size([height, width]);

    const diagonal = d3.svg.diagonal().projection((d) => [d.x, d.y]);

    const svg = d3
      .select('#vertical-tree')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    console.log(svg);

    const root = treeData[0];

    function update(source) {
      // Compute the new tree layout.
      const nodes = tree.nodes(source).reverse();
      const links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach((d) => {
        d.y = d.depth * 100;
      });

      // Declare the nodes…
      const node = svg.selectAll('g.node').data(nodes, (d) => d.id || (d.id = ++i));

      // Enter the nodes.
      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${d.x},${d.y})`);

      nodeEnter.append('circle').attr('r', 10).style('fill', '#fff');

      nodeEnter
        .append('text')
        .attr('y', (d) => (d.children ? -18 : 18))
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .text((d) => d.name)
        .style('fill-opacity', 1);

      // Declare the links…
      const link = svg.selectAll('path.link').data(links, (d) => d.target.id);

      // Enter the links.
      link.enter().insert('path', 'g').attr('class', 'link').attr('d', diagonal);
    }
    update(root);
  },
});

</script>

<style scoped>

.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 3px;
}

.node text { font: 12px sans-serif; }

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

</style>
