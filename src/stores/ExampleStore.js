import {configure, makeAutoObservable} from 'mobx';
configure({
  useProxies: 'never',
});

class ExampleStore {
  constructor({apiManager = null}) {
    this.storeName = 'ExampleStore';
    this.storageExclusions = ['apiManager', 'authStore'];
    this.isHyderated = 0;
    if (apiManager) {
      this.apiManager = apiManager;
    }
    makeAutoObservable(this);
  }

  hyderated = () => {
    this.isHyderated = true;
  };
}

export default ExampleStore;
