import React, {
  Component
} from 'react';
import {
  Image,
  ScrollView,
  Platform,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  NavigationActions,
  StackActions
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import YXHomeScreen from './home'

class YxSettingScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '分类'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>分类!</Text>
      </View>
    );
  }
}

class YxNewsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '识物'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>识物!</Text>
      </View>
    );
  }
}

class YxCartScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '购物车'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>购物车!</Text>
      </View>
    );
  }
}

class YxPersonScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '个人'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>个人!</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator({
  yxtab1: YXHomeScreen,
  yxtab2: YxSettingScreen,
  yxtab3: YxNewsScreen,
  yxtab4: YxCartScreen,
  yxtab5: YxPersonScreen
},{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'yxtab1') {
        iconName = `md-home`;
      } else if (routeName === 'yxtab2') {
        iconName = `ios-funnel`;
      } else if(routeName === 'yxtab3') {
        iconName = 'md-qr-scanner'
      } else if(routeName === 'yxtab4') {
        iconName = 'md-cart'
      } else if(routeName === 'yxtab5') {
        iconName = 'md-person'
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inavtiveTintColor: 'gray',
  }
})