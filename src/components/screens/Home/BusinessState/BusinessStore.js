import React, { createContext, useContext } from "react";
import { useLocalStore } from "mobx-react-lite";
import { Text } from "@src/components/elements";

const BusinessContext = createContext();
export const useBusinessContext = () => useContext(BusinessContext);

export const BusinessProvider = ({ children }) => {
  const store = useLocalStore(() => ({
      featured: [
        {
          id: '1',
          image: require('@src/assets/place-details/main-photo.jpg'),
          title: 'Inorbit Malls ',
          subTitle: '',
          distance: 75,
          time: 90,
          rating: 4,
        },
        {
          id: '2',
          image: require('@src/assets/place-details/main-photo.jpg'),
          title: 'PepsiCo',
          subTitle: '',
          distance: 91,
          time: 64,
          rating: 5,
        },
        {
          id: '3',
          title: 'Infiniti Mall',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 70,
          time: 35,
          rating: 5,
        },
        {
          id: '4',
          title: 'Spaghetti - Italy',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 75,
          time: 90,
          rating: 4,
        },
        {
          id: '5',
          title: 'Banh',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 91,
          time: 64,
          rating: 5,
        },
        {
          id: '6',
          title: 'KFC',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 70,
          time: 35,
          rating: 5,
        },
        {
          id: '7',
          title: 'Khachapuri',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 75,
          time: 90,
          rating: 4,
        },
        {
          id: '8',
          title: 'Banh mi',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 91,
          time: 64,
          rating: 5,
        },
        {
          id: '9',
          title: 'KFC',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
    
          distance: 70,
          time: 35,
          rating: 5,
        },
      ],
      newest: [
        {
          id: '1',
          title: 'Spaghetti',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 75,
          time: 90,
          rating: 4,
        },
        {
          id: '2',
          title: 'Banh mi',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 91,
          time: 64,
          rating: 5,
        },
        {
          id: '3',
          title: 'KFC',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 70,
          time: 35,
          rating: 5,
        },
        {
          id: '4',
          title: 'Haggis',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 75,
          time: 90,
          rating: 4,
        },
        {
          id: '5',
          title: 'Banh mi',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 91,
          time: 64,
          rating: 5,
        },
        {
          id: '6',
          title: 'KFC',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 70,
          time: 35,
          rating: 5,
        },
        {
          id: '7',
          title: 'Inorbit Malls ',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 75,
          time: 90,
          rating: 4,
        },
        {
          id: '8',
          title: 'Haggis',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 91,
          time: 64,
          rating: 5,
        },
        {
          id: '9',
          title: 'KFC',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 70,
          time: 35,
          rating: 5,
        },
      ],
      trending: [
        {
          id: '1',
          title: 'Spagh',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 75,
          time: 90,
          rating: 4,
        },
        {
          id: '2',
          title: 'Banh mi',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 91,
          time: 64,
          rating: 5,
        },
        {
          id: '3',
          title: 'Gumbo',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 70,
          time: 35,
          rating: 5,
        },
        {
          id: '4',
          title: 'Spaghetti',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 75,
          time: 90,
          rating: 4,
        },
        {
          id: '5',
          title: 'Banh mi',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 91,
          time: 64,
          rating: 5,
        },
        {
          id: '6',
          title: 'KFC',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 70,
          time: 35,
          rating: 5,
        },
        {
          id: '7',
          title: 'Jollof',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 75,
          time: 90,
          rating: 4,
        },
        {
          id: '8',
          title: 'Singapore',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 91,
          time: 64,
          rating: 5,
        },
        {
          id: '9',
          title: 'KFC',
          image: require('@src/assets/place-details/main-photo.jpg'),
          subTitle: '',
          distance: 70,
          time: 35,
          rating: 5,
        },
      ],

    remove(id) {
      const idx = store.featured.findIndex((bus) => bus.id === id);
      store.featured.splice(idx, 1);
    },

    removenew(id) {
      const idx = store.newest.findIndex((bus) => bus.id === id);
      store.newest.splice(idx, 1);
    },

    removetrend(id) {
      const idx = store.trending.findIndex((bus) => bus.id === id);
      store.trending.splice(idx, 1);
    },
  }));

  return <BusinessContext.Provider value={store}>{children}</BusinessContext.Provider>;
};