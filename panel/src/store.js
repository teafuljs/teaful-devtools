import createStore from 'teaful';

export const { useStore, getStore } = createStore({
  selectedStore: 0,
  selectedHistory: 0,
  stores: [],
  showAdd: false,
});
