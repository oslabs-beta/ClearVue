import { createStore } from 'vuex';

export default createStore({
  state: {
    tabId: 0,
    port: {},
    treeData: [],
    testData: {},
  },
  mutations: {
    initTab(state) {
      console.log('init tabId');
      const { tabId } = chrome.devtools.inspectedWindow;
      state.tabId = tabId;
    },
    initPort(state, port) {
      state.port = port;
    },
    updateTree(state, payload) {
      state.treeData = JSON.parse(payload);
      console.log('vuex treeData updated: ', state.treeData);
    },
    testLog(state, str) {
      console.log('mutation invoked: ', str);
    },
  },
  getters: {
    getChartData(state) {
      const processTree = (tree) => {
        const {
          name, props, data, children, component,
        } = tree;
        const node = {
          name, props, data, children: [],
        };

        if (children) {
          for (let i = 0; i <= children.length; i++) {
            node.children.push(processTree(children[i]));
          }
        }
        if (component) {
          for (let i = 0; i <= component.children.length; i++) {
            node.children.push(processTree(component.children[i]));
          }
        }

        return node;
      };

      return processTree(state.treeData);
    },
  },
  actions: {
  },
  modules: {
  },
});
