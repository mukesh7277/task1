import * as React from 'react';
import {Container, Text} from '@src/components/elements';
import {Place, BusinessStoreItems} from '@src/data/mock-places';
import PlaceListItem from '@src/components/common/PlaceListItem';
import styles from './styles';
import { useObserver } from "mobx-react-lite";
import { View } from 'react-native';
import { useBusinessContext } from '../BusinessStore';


type FeaturedTabProps = {};

const FeaturedTab: React.FC<FeaturedTabProps> = () => {
  const store = useBusinessContext();
  return  useObserver(() => (
    <Container style={styles.tabContent}>
      {store.trending.map((item: Place) => {
        return (
          <View  key={item.id}>
        <PlaceListItem data={item} />
        <Text style={{width:"50%",marginTop:5,marginBottom:10,backgroundColor:'red',fontSize:12,textAlign:'center'}} onPress={() => store.removetrend(item.id)}>remove</Text>
        </View>)
      })}
    </Container>
  ));
};

export default FeaturedTab;
