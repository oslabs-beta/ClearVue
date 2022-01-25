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

const setName = (fileNamePath) => {
  const str = fileNamePath;
  const strArr = str.split('/');

  return (strArr[strArr.length - 1].split('.')[0]);
};

// Helper function to parse subTree array of properties (present in root level ._instance & component nodes)
const parseSubTree = (instance) => {
  // access the instance's subTree object and iterate through
  const subTreeObj = instance.subTree;
  // parsedTree would store and return an entire instance's vue application hierarchy
  const parsedTree = {};
  // iterate through each property within the instance.subTree object, pulling out "name", "children", and "props"
  for (const property in subTreeObj) {
    // if children or dynamic children property exists, call parseChildren function to parse array of child nodes
    if ((property === 'dynamicChildren' && Array.isArray(subTreeObj[property]) && subTreeObj[property].length !== 0)) parsedTree.children = parseChildren(subTreeObj[property]);
    // if component property exists, recursive call parseSubTree on the component property's SUBTREE
    else if (property === 'component' && subTreeObj[property]) parsedTree.components = parseSubTree(subTreeObj[property]);
  }
  // if name is not defined (for children it will be in its parser), regex the type.file
  if (!parsedTree.name) {
    if (instance.type['__file']) parsedTree.name = setName(instance.type['__file']);
  } else parsedTree.name = instance.type['name'];

  // save Vue data if component is called on instance
  if (Object.keys(instance.data).length !== 0) parsedTree.data = instance.data;

  // save relevant component parent/children props
  if (Object.keys(instance.props).length !== 0) parsedTree.props = instance.props;
  return parsedTree;
};

// Helper function to parse children & dynamicChildren arrays
const parseChildren = (childrenArray) => {
  // parsedChildNode is the storage array of children objects, return this data
  const parsedChildNode = [];
  // parse through array of childNodes
  childrenArray.forEach((childNode) => {
    // store each childNodes' "name", "children", and "props", if we hit a "component" that's truthy, call parseSubTree passing in the component's subTree
    const singleChildObject = {};
    for (const property in childNode) {
      if (property === 'dynamicChildren' && Array.isArray(childNode[property]) && Object.keys(childNode[property].lenght !== 0)) singleChildObject.children = parseChildren(childNode[property]);
      else if (property === 'props' && childNode[property]) singleChildObject.props = childNode[property];
      else if (property === 'type' && childNode[property].name) singleChildObject.name = childNode[property].name;

      else if (property === 'component' && childNode[property]) singleChildObject.children = parseSubTree(childNode[property]);
    }

    parsedChildNode.push(singleChildObject);
  });
  return parsedChildNode;
};

// create subTree to begin storing DOM nodes and relevant data
const subTree = [];

/* iterate through each Vue instance component
and store the subTree (object containing root component hierarchy) */
roots.forEach((node) => {
  const instance = node.__vue_app__._instance;
  // iterate through root instance level subTree and pull out necessary properties and store into subTree
  subTree.push(parseSubTree(instance));
});

console.log('this is the subTree array: ', subTree);
