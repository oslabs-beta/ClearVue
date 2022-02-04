/* eslint-disable */
import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    tabId: number,
    activeData: any,
    activeProps: any,
    webVitals: any,
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
