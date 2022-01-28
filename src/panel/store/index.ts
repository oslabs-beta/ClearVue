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
      const deepCopy = (data: any) => JSON.parse(JSON.stringify(data));

      const processTree = (tree: any) => {
        if (!tree) {
          return undefined;
        }

        const {
          name, props, data, children, components,
        } = tree;
        const node = {
          name, props, data, children: [],
        };

        if (typeof props === 'object') {
          node.props = deepCopy(props);
        }
        if (typeof data === 'object') {
          node.data = deepCopy(data);
        }

        if (components) {
          (node.children as any[]).push(processTree(components));
        } else if (children) {
          for (let i = 0; i <= children.length; i++) {
            if (children[i]) {
              (node.children as any[]).push(processTree(children[i]));
            }
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
