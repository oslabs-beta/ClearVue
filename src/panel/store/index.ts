import { createStore } from 'vuex';

export default createStore({
  state: {
    tabId: -1,
    port: {},
  },
  mutations: {
    initConnection(state) {
      console.log('init connection');
      const { tabId } = chrome.devtools.inspectedWindow;
      state.tabId = tabId;

      const port = chrome.runtime.connect({ name: `${tabId}` });
      port.onMessage.addListener((msg) => {
        console.log('port received msg:', msg);
        this.testData = msg.data;
      });

      port.postMessage({
        action: 'parseTab',
        tabId,
        message: 'extension dispatch action to parse target tab',
      });

      state.port = port;
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
