// parser will parse and process DOM on inpected window and pull all vue
// instances/components and send it to content -> background -> devtool extension

// start from HTML body
const body = document.querySelector('body');

// we check all dom nodes on body
const candidates = body.children;

const roots = [];

// we check if the __vue_app__ property is defined
for (const candidate of candidates) {
  if (candidate.__vue_app__) {
    roots.push(candidate);
  }
}

const instanceMaps = [];

// pull instance map off each app record
for (const root of roots) {
  instanceMaps.push(root.__vue_app__.__VUE_DEVTOOLS_APP_RECORD.instanceMap);
}
