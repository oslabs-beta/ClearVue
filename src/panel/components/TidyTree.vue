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

    // Copyright 2021 Observable, Inc.
    // Released under the ISC license.
    // https://observablehq.com/@d3/tree
    function Tree(data, { // data is either tabular (array of objects) or hierarchy (nested objects)
      path,
      id = Array.isArray(data) ? (d) => d.id : null,
      parentId = Array.isArray(data) ? (d) => d.parentId : null,
      children, // if hierarchical data, given a d in data, returns its children
      tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
      sort, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
      label, // given a node d, returns the display name
      title, // given a node d, returns its hover text
      link, // given a node d, its link (if any)
      linkTarget = '_blank', // the target attribute for links (if any)
      width = 1200, // outer width, in pixels
      height = 600, // outer height, in pixels
      r = 3, // radius of nodes
      padding = 1, // horizontal padding for first and last column
      fill = '#999', // fill for nodes
      fillOpacity, // fill opacity for nodes
      stroke = '#555', // stroke for links
      strokeWidth = 1.5, // stroke width for links
      strokeOpacity = 0.4, // stroke opacity for links
      strokeLinejoin, // stroke line join for links
      strokeLinecap, // stroke line cap for links
      halo = '#fff', // color of label halo
      haloWidth = 3, // padding around the labels
    } = {}) {
      // If id and parentId options are specified, or the path option, use d3.stratify
      // to convert tabular data to a hierarchy; otherwise we assume that the data is
      // specified as an object {children} with nested objects (a.k.a. the “flare.json”
      // format), and use d3.hierarchy.
      // eslint-disable-next-line no-nested-ternary
      const root = path != null ? d3.stratify().path(path)(data)
        : id != null || parentId != null ? d3.stratify().id(id).parentId(parentId)(data)
          : d3.hierarchy(data, children);

      // Compute labels and titles.
      const descendants = root.descendants();
      const L = label == null ? null : descendants.map((d) => label(d.data, d));

      // Sort the nodes.
      if (sort != null) root.sort(sort);

      // Compute the layout.
      const dx = 10;
      const dy = width / (root.height + padding);
      tree().nodeSize([dx, dy])(root);

      // Center the tree.
      let x0 = Infinity;
      let x1 = -x0;
      root.each((d) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });

      // Compute the default height.
      if (height === undefined) height = x1 - x0 + dx * 2;

      const svg = d3.select('svg')
        .attr('viewBox', [-dy * padding / 2, x0 - dx, width, height])
        .attr('width', width)
        .attr('height', height)
        .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10);

      svg.append('g')
        .attr('fill', 'none')
        .attr('stroke', stroke)
        .attr('stroke-opacity', strokeOpacity)
        .attr('stroke-linecap', strokeLinecap)
        .attr('stroke-linejoin', strokeLinejoin)
        .attr('stroke-width', strokeWidth)
        .selectAll('path')
        .data(root.links())
        .join('path')
        .attr('d', d3.linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x));

      const node = svg.append('g')
        .selectAll('a')
        .data(root.descendants())
        .join('a')
        .attr('xlink:href', link == null ? null : (d) => link(d.data, d))
        .attr('target', link == null ? null : linkTarget)
        .attr('transform', (d) => `translate(${d.y},${d.x})`);

      node.append('circle')
        .attr('fill', (d) => (d.children ? stroke : fill))
        .attr('r', r);

      if (title != null) {
        node.append('title')
          .text((d) => title(d.data, d));
      }

      if (L) {
        node.append('text')
          .attr('dy', '0.32em')
          .attr('x', (d) => (d.children ? -6 : 6))
          .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
          .text((d, i) => L[i])
          .call((text) => text.clone(true))
          .attr('fill', 'none')
          .attr('stroke', halo)
          .attr('stroke-width', haloWidth);
      }

      return svg.node();
    }

    const chart = Tree(treeData, {
      label: (d) => d.name,
      title: (d, n) => `${n.ancestors().reverse().map((d) => d.data.name).join('.')}`, // hover text
      width: 1152,
    });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
