import { createStore } from 'vuex';

export default createStore({
  state: {
    tabId: -1,
  },
  mutations: {
    initExtension(state, payload) {
      state.tabId = payload.tabId;
    },
  },
  actions: {
  },
  modules: {
  },
});
