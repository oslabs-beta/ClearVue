/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */

// parser will parse and process DOM on inpected window and pull all vue
// instances/components and send it to content -> background -> devtool extension
// start from HTML body
const body = document.querySelector('body');

// Store DOM tree in a variable
const candidates = body.children;

// Vue elements storage in roots array
const roots = [];

// we check if the __vue_app__ property is defined on each DOM node
// If present, we populate roots with any DOM element with the Vue property
for (const candidate of candidates) {
  if (candidate.__vue_app__) {
    roots.push(candidate);
  }
}

// Helper function to parse children & dynamicChildren arrays
const parseChildren = (childrenArray) => {
  const parsedChildNode = [];
  childrenArray.forEach((childNode) => {
    const singleChildObject = {};
    for (const property in childNode) {
      if (property === 'children' && Array.isArray(childNode[property])) singleChildObject.children = parseChildren(childNode[property]);
      else if (property === 'component' && childNode[property]) singleChildObject.component = parseSubTree(childNode[property].subTree);
      else if (property === 'dynamicChildren' && Array.isArray(childNode[property])) singleChildObject.dynamicChildren = parseChildren(childNode[property]);
      else if (property === 'dynamicProps' && childNode[property]) singleChildObject.dynamicProps = childNode[property];
      else if (property === 'el' && childNode[property]) singleChildObject.el = childNode[property];
      else if (property === 'props' && childNode[property]) singleChildObject.props = childNode[property];
      else if (property === 'type' && childNode[property]) singleChildObject.type = childNode[property];
      else if (property === 'uid') singleChildObject.uid = childNode[property];
    }
    parsedChildNode.push(singleChildObject);
  });
  return parsedChildNode;
};

// Helper function to parse subTree array of properties (present in root level ._instance & component nodes)
const parseSubTree = (subTreeObj) => {
  const parsedTree = {};
  for (const property in subTreeObj) {
    // if children property exists, call parseChildren function to parse array of child nodes
    if (property === 'children' && Array.isArray(subTreeObj[property])) parsedTree.children = parseChildren(subTreeObj[property]);
    // if component property exists, recursive call parseSubTree on the component property's SUBTREE
    else if (property === 'component' && subTreeObj[property]) parsedTree.component = parseSubTree(subTreeObj[property].subTree);
    // if dynaChild property exists, call parseChildren function to parse array
    else if (property === 'dynamicChildren' && Array.isArray(subTreeObj[property])) parsedTree.dynamicChildren = parseChildren(subTreeObj[property]);
    
    // remainder of properties should be saved within object
    else if (property === 'dynamicProps' && subTreeObj[property]) parsedTree.dynamicProps = subTreeObj[property];
    else if (property === 'el' && subTreeObj[property]) parsedTree.el = subTreeObj[property];
    else if (property === 'props' && subTreeObj[property]) parsedTree.props = subTreeObj[property];
    else if (property === 'type' && subTreeObj[property]) parsedTree.type = subTreeObj[property];
    else if (property === 'uid') parsedTree.uid = subTreeObj[property];
  }
  return parsedTree;
};


// create subTree to begin storing DOM nodes and relevant data
const subTree = [];

/* iterate through each Vue instance component
and store the subTree (object containing root component hierarchy) */
roots.forEach((node) => {
  const instance = node.__vue_app__._instance.subTree;
  // iterate through root instance level subTree and pull out necessary properties and store into subTree
  subTree.push(parseSubTree(instance));
});

console.log('this is the subTree array: ', subTree);
