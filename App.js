import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/Home/index';
import ArchiveScreen from './src/News/news';
import LunchScreen from './src/Lunch/lunch';
import InfoScreen from './src/Info/index';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Hem') {
    iconName = `md-home`;
  } else if (routeName === 'Arkiv') {
    iconName = `md-paper`;
  } else if (routeName === 'Lunch') {
    iconName = `md-pizza`;
  } else if (routeName === 'Info') {
    iconName = `ios-information-circle`;
  }

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

export default createAppContainer(
  createBottomTabNavigator(
    {
      Hem: { screen: HomeScreen },
      Arkiv: { screen: ArchiveScreen},
      Lunch: { screen: LunchScreen},
      Info: { screen: InfoScreen },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
    }),
      tabBarOptions: {
        activeTintColor: '#FF60A5',
        inactiveTintColor: 'black',
      },
    }
  )
);
