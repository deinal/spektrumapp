import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/Home/index';
import NewsScreen from './src/News/news';
import LunchScreen from './src/Lunch/lunch';
import InfoScreen from './src/Info/index';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `md-home`;
  } else if (routeName === 'News') {
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
      Home: { screen: HomeScreen },
      News: { screen: NewsScreen},
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
