import React from 'react';
import AuthStore from './AuthStore';
import {StorageHandler} from './StorageHandler';
import ApiManager from './api/Manager';
// import OrderStore from './OrderStore';
let store = null;
export const initializeStore = (initialData = {}) => {
  if (store === null) {
    storageHandler = new StorageHandler();
    let authStore = new AuthStore(initialData);
    let apiManager = new ApiManager(authStore);
    makePersistent([authStore]);
    store = {
      AuthStore: authStore,
      // OrderStore: new OrderStore({apiManager}),
    };
  }
  // make other stores persistent
  makePersistent([]);
  return store;
};

makePersistent = (stores) => {
  // for storage support stores must have isHyderated prop and hyderated function
  return stores.map(async (store) => {
    storageHandler.trackStore(store);
    await storageHandler.refreshStore(store);
  });
};

/* Store helpers */
export const Store = initializeStore();
export const StoreContext = React.createContext(Store);
export const StoreProvider = ({children, store}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);

/* HOC to inject store to any functional or class component */
export const withStore = (Component) => (props) => {
  return <Component {...props} store={useStore()} />;
};
