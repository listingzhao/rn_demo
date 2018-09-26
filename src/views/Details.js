import React, {Component} from 'react';
import {Image,ScrollView,RefreshControl,Platform,Button,TextInput,FlatList,TouchableOpacity, StyleSheet, Text, View, NativeModules,DeviceEventEmitter,ToastAndroid,BVLinearGradient,PixelRatio} from 'react-native';
import {
  createMaterialTopTabNavigator,
} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import px2dp from '../utils/dp'
import {onePixel} from '../utils/ScreenUtils'
import Tab1 from './w-plan/PlanInfo'

import {scaleSize,scaleHeight,setSpText} from '../utils/ScreenUtils'


var highlightTab = (tabName, focused) => {
  var footerHeight, color;
  if(focused) {
    footerHeight = 1;
    color="red";
  }else {
    footerHeight = 1;
    color="#fff";
  }

  var styles = StyleSheet.create({
    tab: {
      alignItems: 'stretch',
      justifyContent: 'flex-end'
    },
    labelFooter: {
      backgroundColor: color,
      height: footerHeight,
    }
  })

  return (
    <View style={styles.tab}>
      <Text>{tabName}</Text>
      <View style={styles.labelFooter}></View>
    </View>
  )
}

class Tab2 extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '风控流程'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
        <Text>风控流程!</Text>
      </View>
    );
  }
}

class Tab3 extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '借款信息'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
        <Text>借款信息!</Text>
      </View>
    );
  }
}

class Tab4 extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '出借记录'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
        <Text>出借记录!</Text>
      </View>
    );
  }
}

const TabNavigator = createMaterialTopTabNavigator({
  TabOne: Tab1,
  TabTwo: Tab2,
  Tabthree: Tab3,
  Tabfour: Tab4
}, {
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#5B71F9',
    inactiveTintColor: '#888888',
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
    indicatorStyle: {
      width: 56,
      height: 2,
      left: 22,
      backgroundColor: '#5B71F9'
    },
  }
})

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '标的',
      refreshing: false,
    }
  }
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerStyle: {
        elevation: 0,
        backgroundColor: '#5B71F9'
      },
      headerTitle: (
        <Text style={{ flex: 1, alignSelf: 'center', textAlign: 'center', color: '#ffffff' ,fontWeight: 'bold', fontSize: setSpText(18) }}>{params.title}</Text>
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
              style={{
                marginLeft:16,
                  height:18,
                  width:11,
              }}
              source={require('../../assets/icons/gray_back.png')}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <View />
      )
    }
  }
  onPressButton() {
    console.log("You tapped the button!"); 
    NativeModules.IntentMoudle.startActivityFromJs("com.appwjs.HelloActivity", "从JS传过来的参数信息.");
  }
  componentDidMount() {
    this.state.title = "微智享-14天"
    this.props.navigation.setParams({
      title: this.state.title
    })
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    },2000);
  }
  render() {   
    return (
        <View style={styles.conwrap}>
          <ScrollView style={{backgroundColor: 'red'}} refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            />
          }>
            <View style={{height: scaleHeight(154),backgroundColor: 'red'}}>
                <LinearGradient colors={['#5B71F9','#5B8BF9']} locations={[0,0.97]} style={styles.linearcont}>
                  <View style={styles.container}>
                    <Text style={{color: '#fff', fontWeight: 'bold', fontSize:setSpText(36), paddingTop: scaleHeight(24),paddingBottom: scaleHeight(8), lineHeight: scaleHeight(36)}}>
                      7.0
                      <Text style={{color: '#fff', fontSize: setSpText(24)}}>
                        %
                      </Text>
                    </Text>
                    <Text style={{color: '#e8e8e8', fontSize: setSpText(14), paddingBottom: scaleHeight(16)}}>
                      预期年化利率
                    </Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text style={{color: '#fff', fontSize: setSpText(14), }}>14天</Text>
                      <Text style={{color: '#e8e8e8', fontSize: setSpText(14)}}>
                        借款期限
                      </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text style={{color: '#fff', fontSize: setSpText(14)}}>1000元</Text>
                      <Text style={{color: '#e8e8e8', fontSize: setSpText(14)}}>
                        起投金额
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                </LinearGradient>
              </View>
              <View style={{padding: scaleSize(16), backgroundColor: '#fff', marginBottom: scaleHeight(12)}}>
                <View style={{flexDirection: 'row', paddingBottom: scaleHeight(12)}}>
                  <View style={{color: '#888888', fontSize: setSpText(14)}}>
                    <Text>还款方式</Text>
                  </View>
                  <View style={{flex: 1, paddingLeft: scaleSize(16), color: '#333333'}}>
                    <Text>一次性还本付息</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: scaleHeight(12)}}>
                  <View style={{color: '#888888'}}>
                    <Text>起息时间</Text>
                  </View>
                  <View style={{flex: 1, paddingLeft: scaleSize(16), color: '#333333'}}>
                    <Text>满标放款之日</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{color: '#888888'}}>
                    <Text>安全等级</Text>
                  </View>
                  <View style={{flex: 1, flexDirection:'row', paddingLeft: scaleSize(16)}}>
                    <Text>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#E8E8E8" />
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{padding: scaleSize(16), backgroundColor: '#fff', marginBottom: scaleHeight(12)}}>
                <View style={{flexDirection: 'row', paddingBottom: scaleHeight(12)}}>
                  <View style={{color: '#888888', fontSize: setSpText(14)}}>
                    <Text>还款方式</Text>
                  </View>
                  <View style={{flex: 1, paddingLeft: scaleSize(16), color: '#333333'}}>
                    <Text>一次性还本付息</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: scaleHeight(12)}}>
                  <View style={{color: '#888888'}}>
                    <Text>起息时间</Text>
                  </View>
                  <View style={{flex: 1, paddingLeft: scaleSize(16), color: '#333333'}}>
                    <Text>满标放款之日</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{color: '#888888'}}>
                    <Text>安全等级</Text>
                  </View>
                  <View style={{flex: 1, flexDirection:'row', paddingLeft: scaleSize(16)}}>
                    <Text>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#E8E8E8" />
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{padding: scaleSize(16), backgroundColor: '#fff', marginBottom: scaleHeight(12)}}>
                <View style={{flexDirection: 'row', paddingBottom: scaleHeight(12)}}>
                  <View style={{color: '#888888', fontSize: setSpText(14)}}>
                    <Text>还款方式</Text>
                  </View>
                  <View style={{flex: 1, paddingLeft: scaleSize(16), color: '#333333'}}>
                    <Text>一次性还本付息</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: scaleHeight(12)}}>
                  <View style={{color: '#888888'}}>
                    <Text>起息时间</Text>
                  </View>
                  <View style={{flex: 1, paddingLeft: scaleSize(16), color: '#333333'}}>
                    <Text>满标放款之日</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{color: '#888888'}}>
                    <Text>安全等级</Text>
                  </View>
                  <View style={{flex: 1, flexDirection:'row', paddingLeft: scaleSize(16)}}>
                    <Text>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#E8E8E8" />
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{padding: scaleSize(16), backgroundColor: '#fff', marginBottom: scaleHeight(12)}}>
                <View style={{flexDirection: 'row', paddingBottom: scaleHeight(12)}}>
                  <View style={{color: '#888888', fontSize: setSpText(14)}}>
                    <Text>还款方式</Text>
                  </View>
                  <View style={{flex: 1, paddingLeft: scaleSize(16), color: '#333333'}}>
                    <Text>一次性还本付息</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: scaleHeight(12)}}>
                  <View style={{color: '#888888'}}>
                    <Text>起息时间</Text>
                  </View>
                  <View style={{flex: 1, paddingLeft: scaleSize(16), color: '#333333'}}>
                    <Text>满标放款之日</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{color: '#888888'}}>
                    <Text>安全等级</Text>
                  </View>
                  <View style={{flex: 1, flexDirection:'row', paddingLeft: scaleSize(16)}}>
                    <Text>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#FF9B21" />
                    </Text>
                    <Text style={{ paddingLeft: scaleSize(4)}}>
                      <Ionicons name="md-star" size={20} color="#E8E8E8" />
                    </Text>
                  </View>
                </View>
              </View>
              
              </ScrollView>

              <TabNavigator />

          <View style={{flex: 1,flexDirection: 'row', justifyContent: 'space-between', paddingTop: scaleHeight(8), paddingBottom: scaleHeight(8), paddingLeft: scaleSize(16), paddingRight: scaleSize(16), position: "absolute",left:0, right:0, bottom: 0, borderTopWidth: 1 / PixelRatio.get(),
      borderColor: '#E8E8E8', backgroundColor: '#fff'}} >
            <View style={{width: px2dp(30), alignItems: 'center' , justifyContent: 'center' }} >
              <Text style={{fontSize: px2dp(12), color: '#888888'}} >出借金额</Text>
            </View>
            <TextInput
              style={{height: px2dp(35), width: px2dp(175), borderColor: '#E8E8E8', borderWidth: 1 / PixelRatio.get()}}
              placeholder="起投金额"
              onChangeText={(text) => this.setState({text})}
            />
            <View>
              <TouchableOpacity onPress={this.onPressButton }>
                <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', width: px2dp(120), height: px2dp(35), backgroundColor: "#566FFF", borderRadius: px2dp(5)}} >
                  <Text style={{fontSize: 16, color: "#fff",}} >立即出借</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View> 
        </View>
        
    );
  }
}


const styles = StyleSheet.create({
  conwrap: {
    flex: 1,
    // height: '100%',
    backgroundColor: '#f5f5f7',
    paddingBottom: scaleHeight(45)
  },
  linearcont: {
    flex: 1,
  },
  line: {
    position: "absolute",
    width: 1 / PixelRatio.get(),
    height: scaleHeight(34),
    bottom: scaleHeight(14),
    left: '50%',
    backgroundColor: "#e8e8e8"
  },
  container: {
    flex: 0,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  box: {
    paddingBottom: 8
  },
  tit: {
    fontWeight: 'bold',
    lineHeight: 24
  },
  con: {
    lineHeight: 24
  }
})