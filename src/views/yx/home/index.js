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

import SimpleSwiper from '../../../components/swiper'

const styles = StyleSheet.create({
  swiper: {
    alignSelf:'center',
    marginVertical: 100,
    borderWidth: 2,
    borderColor: 'red',
    overflow:'visible',
    width: 100,
  },
  item: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  one: {
    backgroundColor: '#0ca',
  },
  two: {
    backgroundColor: '#0cc',
  },
  three: {
    backgroundColor: '#0ac',
  },
})

class Tab1 extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '推荐'
    }
  }
  

  constructor(props) {
    super(props);
    this.state = {
      index: 1
    }
  }

  handleChange = (index) => {
    console.log('handleChange:',index)
            this.setState({
              index: index
            })
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: '#ffffff'}}>
        <Text>推荐!</Text>
        <TouchableOpacity style={[styles.button,{left: 60}]} activeOpacity={0.5} onPress={() => {console.log('onPress')}}>
            <Text>下一个</Text>
          </TouchableOpacity>
        <View>
        <SimpleSwiper style={styles.swiper}
          index={this.state.index}
          onChange={this.handleChange}>
          <View style={[styles.item,styles.one]}>
              <Text>one</Text>
          </View>
          <View style={[styles.item,styles.two]}>
              <Text>two</Text>
          </View>
          <View style={[styles.item,styles.three]}>
              <Text>three</Text>
          </View>
        </SimpleSwiper>
        </View>
      </View>
    );
  }
}

class Tab2 extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '新品'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
        <Text>新品!</Text>
      </View>
    );
  }
}

class Tab3 extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '居家'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
        <Text>居家!</Text>
      </View>
    );
  }
}

class Tab4 extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '鞋包配饰'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
        <Text>鞋包配饰!</Text>
      </View>
    );
  }
}

class Tab5 extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '服装'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
        <Text>服装!</Text>
      </View>
    );
  }
}

const TabNavigator = createMaterialTopTabNavigator({
  htab1: Tab1,
  htab2: Tab2,
  htab3: Tab3,
  htab4: Tab4,
  htab5: Tab5,
},{
  lazy: true,
  tabBarOptions: {
    scrollEnabled: true,
    activeTintColor: '#b4282d',
    inactiveTintColor: '#333',
    showIcon: false,
    labelStyle: {
      fontSize: 14
    },
    style: {
      backgroundColor: '#fff',
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
      height: 47,
      borderBottomWidth: 1,
      borderBottomColor: '#E8E8E8'
    },
    tabStyle: {
      width: 90,
    },
    indicatorStyle: {
      height: 2,
      backgroundColor: '#b4282d'
    },
  }
})

export default class Index extends Component{
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '首页'
    }
  }
  render() {
    return (
      <View style={{ flex: 1}}>
        <TabNavigator />
      </View>
    );
  }
}