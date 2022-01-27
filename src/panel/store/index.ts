import { createStore } from 'vuex';

export default createStore({
  state: {
    tabId: -1,
    port: {},
    treeData: {},
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
  actions: {
  },
  modules: {
  },
});
