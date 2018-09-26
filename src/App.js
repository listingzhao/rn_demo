/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image,Platform,Button,FlatList,TouchableOpacity, StyleSheet, Text, View, NativeModules,DeviceEventEmitter,ToastAndroid} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  NavigationActions,
  StackActions
} from 'react-navigation';
import Ionicons, { TabBarItem } from 'react-native-vector-icons/Ionicons';
import RiskScreen from './views/Risk'
import DetailsScreen from './views/Details'
import PullScrollView from './views/PullScrollView'
import PullScrollScreen from './views/ScrollView'
import PullFlatList from './views/PullFlatList'
import FlatScreen from './views/FlatList'
import Fetch from './lib/Fetch';

var MOCKED_MOVIES_DATA = [
  {
    title: "标题",
    year: "2015",
    posters: { thumbnail: "https://i.imgur.com/UePbdph.jpg" }
  }
];

var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
// export default class App extends Component<Props> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       loaded: false
//     }
//     this.fetchData = this.fetchData.bind(this)
//   }

//   componentDidMount() {
//     console.log('componentDidMount')
//     this.fetchData()
//   }

//   fetchData() {
//     // fetch(REQUEST_URL)
//     //   .then(response => response.json())
//     //   .then(responseJson => {
//     //     console.log(responseJson)
//     //     this.setState({
//     //       data: this.state.data.concat(responseJson.movies),
//     //       loaded: true
//     //     });
//     //   });
    
//     Fetch.GET(REQUEST_URL).then(res => {
//       console.log(res)
//       this.setState({
//         data: this.state.data.concat(res.movies),
//         loaded: true
//       });
//     })
    
//   }

//   render() {
//     if (!this.state.loaded) {
//       return this.renderLoadingView();
//     }
//     return (
//       <FlatList data={this.state.data} renderItem={this.renderMovie} style={styles.list}></FlatList>
//     );
//   }

//   renderMovie({item}) {
//     return (
//       <View style={styles.container2}>
//         <Image style={styles.thumbnail} 
//                 source={{uri: item.posters.thumbnail}}></Image>
//         <View style={styles.rightContainer}>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.year}>{item.year}</Text>
//         </View>
//       </View>
//     );
//   }

//   renderLoadingView() {
//     return (
//       <View style={styles.container}>
//       <Text>
//         正在加载电影数据。。。
//       </Text>
//     </View>
//     );
//   }
// }

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={{ flex: 1, textAlign: 'center',fontWeight: 'bold', fontSize: 18 }}>首页</Text>
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => alert('This is a button!')}
        >
          <Image
              style={{
                marginLeft:16,
                  height:18,
                  width:11,
              }}
              source={require('../assets/icons/gray_back.png')}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <View />
      ),
      headerBackTitle: null,
    }
  }
  onPressButton() {
    console.log("You tapped the button!"); 
    NativeModules.IntentMoudle.startActivityFromJs("com.appwjs.HelloActivity", "从JS传过来的参数信息.");
  }

  getData() {
    DeviceEventEmitter.addListener('nativeCallRn',(msg)=>{
      title = "RN界面,收到数据：" + msg;
      ToastAndroid.show("发送成功", ToastAndroid.SHORT);
    })
    
  }

  callbackComm(msg) {
    NativeModules.IntentMoudle.rnCallNativeFromCallback(msg,(result) => {
         ToastAndroid.show("CallBack收到消息:" + result, ToastAndroid.SHORT);
    })
  }

  promiseComm(msg) {
    console.log('promiseComm')
    NativeModules.IntentMoudle.rnCallNativeFromPromise(msg).then((result) => {
      ToastAndroid.show("Promise收到消息:" + result, ToastAndroid.SHORT)
    }).catch((err) => console.log(err))
  }

  componentDidMount() {
    this.getData()
    //this.callbackComm('jsmsg')
    const { navigate } = this.props.navigation
  }
  render() {
    const { navigate } = this.props.navigation
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="滚动加载刷新"
          onPress={()=> {
            navigate('PullScrollScreen')
          }}
        />
        <Button
          title="下拉刷新页面"
          onPress={()=> {
            navigate('PullScrollView')
          }}
        />
        <Button
          title="下拉刷新列表"
          onPress={()=> {
            navigate('PullFlatList')
          }}
        />
        <Button
          title="FlatList"
          onPress={()=> {
            navigate('FlatScreen')
          }}
        />

        <Button
          title="Go to Details"
          onPress={() =>
            navigate('Details')
          }
        />
        <Button
          title="Go to Risk"
          onPress={() =>
            navigate('Risk')
          }
        />
        <Button
          title="Promise回调"
          onPress={()=> {
            this.promiseComm('promise发送啦')
          }}
        />
        <TouchableOpacity onPress={ }>
          <Text>跳转到Demo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressButton }>
          <Text>跳转到原生页面</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


class InitialScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return null;
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Risk: RiskScreen,
    PullScrollView: PullScrollView
  }, {
    initialRouteName: '',
  }
);

const routeConfig = {
  Initial: InitialScreen,
  Home: HomeScreen,
  Details: DetailsScreen,
  Risk: RiskScreen,
  PullScrollView: PullScrollView,
  PullScrollScreen: PullScrollScreen,
  PullFlatList: PullFlatList,
  FlatScreen: FlatScreen
}

const Navigator = ({ initialRouteName }) => {
  const stackNavigatorConfigs = {
    initialRouteName
  }
  const CustomNavigator = createStackNavigator(routeConfig, stackNavigatorConfigs)
  return <CustomNavigator />
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConent: true,
      initialRouteName: "Home"
    };
  }
  componentDidMount() {
    console.log("this.state.initialRouteName",this.state.initialRouteName)
    // NativeModules.IntentMoudle.dataToJs(res => {
    //   console.log(res)
    //   if(res != "没有数据") {
    //     this.setState({
    //       initialRouteName: res,
    //       showConent: true
    //     })
    //     // navigators.dispatch(
    //     //   // NavigationActions.navigate({ routeName: "Risk" })
    //     //   StackActions.reset({
    //     //     index: 0,
    //     //     actions: [NavigationActions.navigate({ routeName: res})],
    //     //   })
    //     // );
    //   }else {
    //     this.setState({
    //       showConent: true
    //     })
    //   }
    // },err=> alert(err))

    // console.log(this.navigator)
    
    // this.navigator && this.navigator.dispatch(
    //   NavigationActions.navigate({ routeName: "Risk" })
    // );
  }

  render() {
    if (this.state.showConent == true) {
      return <Navigator initialRouteName = {this.state.initialRouteName} />;
    }else {
      return null;
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  }
});
