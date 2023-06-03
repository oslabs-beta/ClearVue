import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  // TODO: add more specific types for state
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
