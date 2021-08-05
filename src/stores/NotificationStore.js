import {makeAutoObservable} from 'mobx';

class NotificationStore {
  constructor({apiManager = null}) {
    this.storeName = 'NotificationStore';
    this.storageExclusions = ['apiManager', 'authStore'];
    this.unread = [];
    this.read = [];
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

export default NotificationStore;
