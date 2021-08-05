import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeStack from '../Stacks/HomeStack';

type TabNavigationProps = {};
type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};
const Tab = createBottomTabNavigator();
const {Navigator} = Tab;

const renderTabBarIcon = (routeName: string) => {
  return (props: TabBarIconProps) => {
    const {color} = props;
    let iconName = 'home';
    switch (routeName) {
      case 'Explore':
        iconName = 'compass';
        break;
      case 'Activity':
        iconName = 'history';
        break;
      case 'Notifications':
        iconName = 'bell';
        break;
      case 'Account':
        iconName = 'user';
        break;
      case 'Documentation':
        iconName = 'book';
        break;
      default:
        break;
    }
    return <Icon name={iconName} solid size={24} color={color} />;
  };
};

const TabNavigation: React.FC<TabNavigationProps> = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={(props) => {
        const {
          route: {name: routeName},
        } = props;
        return {
          tabBarIcon: renderTabBarIcon(routeName),
        };
      }}>
      <Tab.Screen name="Explore" component={HomeStack} />
      <Tab.Screen name="Activity" component={HomeStack} />
      <Tab.Screen name="Notifications" component={HomeStack} />
      <Tab.Screen name="Account" component={HomeStack} />
      <Tab.Screen name="History" component={HomeStack} />
    </Navigator>
  );
};

export default TabNavigation;
