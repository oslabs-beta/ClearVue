import { createStore } from 'vuex';

export default createStore({
  state: {
    tabId: 0,
    port: {},
    webVitals: {},
    treeData: [],
    testData: {},
    activeData: { sample: 'data' },
    activeProps: { sample: 'prop' },
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
    updateVitals(state, newVitals) {
      state.webVitals = newVitals;
    },
    updateTree(state, payload) {
      state.treeData = JSON.parse(payload);
      console.log('vuex treeData updated: ', state.treeData);
    },
    updateActiveData(state, newData) {
      state.activeData = newData;
    },
    updateActiveProps(state, newProps) {
      state.activeProps = newProps;
    },
    testLog(state, str) {
      console.log('mutation invoked: ', str);
    },
  },
  getters: {
    getChartData(state) {
      const deepCopy = (data: any) => JSON.parse(JSON.stringify(data));
      const roughSizeOfObject = (object: any) : number => {
        const objectList = [];
        const stack = [object];
        let bytes = 0;

        while (stack.length) {
          const value = stack.pop();

          if (typeof value === 'boolean') {
            bytes += 4;
          } else if (typeof value === 'string') {
            bytes += value.length * 2;
          } else if (typeof value === 'number') {
            bytes += 8;
          } else if
          (
            typeof value === 'object'
                && objectList.indexOf(value) === -1
          ) {
            objectList.push(value);
            stack.push(...Object.values(value));
          }
        }
        return bytes;
      };
      const processTree = (tree: any) => {
        if (tree === undefined || tree === null) return {};
        const {
          name, props, data, children, components,
        } = tree;
        const node = {
          name,
          props,
          data,
          children: [],
          size: [100, 50],
          value: 0,
        };

        if (node.name === undefined) node.name = 'Component';

        // if (typeof props === 'object') {
        //   node.props = deepCopy(props);
        //   node.value += roughSizeOfObject(node.props);
        // }
        // if (typeof data === 'object') {
        //   node.data = deepCopy(data);
        //   node.value += roughSizeOfObject(node.data);
        // }

        if (components) {
          (node.children as any[]).push(processTree(components));
        } else if (children) {
          console.log('children found! -->', children);
          if (Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
              if (Object.keys(children[i]).length) {
                (node.children as any[]).push(processTree(children[i]));
              }
            }
          } else if (typeof (children) === 'object' && Object.keys(children).length) {
            (node.children as any[]).push(processTree(children));
            if (children.components) {
              (node.children as any[]).push(processTree(children.components));
            }
          }
        }

        return node;
      };

      return processTree(state.treeData[0]);
    },
    isDevMode(state) {
      if ((process.env.NODE_ENV === 'production')) {
        return false;
      }
      return true;
    },
  },
  actions: {},
  modules: {},
});
