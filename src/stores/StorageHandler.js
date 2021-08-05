import {toJS, reaction, makeAutoObservable, runInAction} from 'mobx';
import EncryptedStorage from 'react-native-encrypted-storage';
export class StorageHandler {
  constructor() {
    this.trackedStores = [];
    makeAutoObservable(this);
  }

  trackStore = (storeRef) => {
    // A lit of MobX stores registered with the handler
    this.trackedStores.push(storeRef);
    // console.log(this.trackedStores, 'TRACKED STORES');

    // Reacts to property changes and updates EncryptedStorage to match
    this.userPropStoreReaction = reaction(
      () => toJS(storeRef),
      (storeData, reaction) => {
        this.updateStoreValues(storeData);
      },
    );
  };

  // Set local data to match store data
  updateStoreValues = async (store) => {
    try {
      if (!store.isHyderated) return 0;
      // console.log('UPDATE STORE', JSON.stringify(store));
      await EncryptedStorage.setItem(store.storeName, JSON.stringify(store));
    } catch (e) {
      console.log(e, 'STORAGE HANDLER ERROR');
    }
  };

  // Refreshes store values to match local data
  refreshStore = async (store) => {
    try {
      const localStore = await this.getStore(toJS(store));
      let exclusions = localStore.storageExclusions
        ? localStore.storageExclusions
        : [];
      exclusions.unshift('apiManager');
      Object.keys(localStore).forEach((key) => {
        if (exclusions.includes(key)) return;
        runInAction(() => {
          store[key] = localStore[key];
        });
      });
      if (!store.isHyderated) store.hyderated();
      return store.isHyderated;
    } catch (e) {
      console.log(e, 'STORAGE HANDLER ERROR');
    }
  };

  // Returns stored data for a MobX store if stored data exists.  Otherwise returns the input store data
  getStore = async (store) => {
    try {
      const localStore =
        (await EncryptedStorage.getItem(store.storeName)) ||
        JSON.stringify(store);
      return JSON.parse(localStore);
    } catch (e) {
      console.log(e, 'STORAGE HANDLER ERROR');
    }
  };

  cleanStore = async (store) => {
    try {
      if (!store.isHyderated) return 0;
      await EncryptedStorage.removeItem(store.storeName);
    } catch (e) {
      console.log(e, 'STORAGE HANDLER ERROR');
    }
  };
}
