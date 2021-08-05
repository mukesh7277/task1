import * as React from 'react';
import {Button, Container, Text} from '@src/components/elements';
import {FeaturedTab, NewestTab, TrendingTab} from './Tabs';
import {TabView} from '@src/components/elements';
import styles from './styles';
import {TabViewData} from '@src/components/elements/TabView/TabView';
import RNRestart from 'react-native-restart';


type RemarkablePlacesProps = {};

const tabData: TabViewData = [
  {key: '0', title: 'Featured', content: FeaturedTab},
  {
    key: '1',
    title: 'Newest',
    content: NewestTab,
  },
  {
    key: '3',
    title: 'Trending',
    content: TrendingTab,
  },
];

const BusinessState: React.FC<RemarkablePlacesProps> = () => {
  const startReload = ()=> RNRestart.Restart();

  return (
    <Container style={styles.container}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'orange',textAlign:'center'}}>Business Store</Text>
      <TabView
        tabData={tabData}
        tabBarStyle={styles.tabBarStyle}
        isTabBarFullWidth
      />
        <Button onPress={startReload}><Text>Reload</Text></Button>
    </Container>
  );
};

export default BusinessState;
