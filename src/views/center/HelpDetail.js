/*
 * @Author: listing.zhaopeng 
 * @Date: 2018-09-27 14:42:21 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-27 17:29:14
 */

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
  View,
  Linking,
  WebView,
  Dimensions
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  NavigationActions,
  StackActions
} from 'react-navigation';
import HTMLView from 'react-native-htmlview';

import {screenW, screenH, scaleSize,scaleHeight,setSpText} from '../../utils/ScreenUtils'


export default class extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerStyle: {
        elevation: 0,
        // backgroundColor: '#5B71F9'
      },
      headerTitle: (
        <Text style={{ flex: 1, alignSelf: 'center', textAlign: 'center',fontWeight: 'bold', fontSize: setSpText(18) }}>{params.title}</Text>
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
              source={require('../../../assets/icons/gray_back.png')}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <View />
      )
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      itemList: [{
        title: '注册手机号一定要是银行的预留手机号码吗？',
        context: '<p>注册的手机号可以不是银行预留手机号，但是在开通银行存管账户、绑定银行卡时，必须填写银行预留手机号。</p><p><span style="color:#E56600;">注意：</span>如果银行卡预留手机号码有变更，可以登录pc端，安全中心-开户“登录支付账户”，新浪支付-安全中心进行更改。</p>'
      }]
    }
  }

  _renderList = () => {
    const listItem = this.state.itemList.map((item, index) => <ListItem key={index} data={item} />)
    return (
      <View>
        {listItem}
      </View>
    )
  }

  render() {
    return (<View style={styles.container}>
      {this._renderList()}
      {/* <WebView source={{html: '<h1>Hello world</h1>'}}/> */}
      {/* <HTMLView value={'<h1>Hello world</h1>'} /> */}
    </View>)
  }
}

function ListItem(props) {
  const {title, context} = props.data;
  console.log('context:',context)
  return (
    <View style={{paddingTop: scaleHeight(16)}}>
      <View style={{borderLeftWidth: 3,borderColor: '#5B71F9',marginBottom: scaleHeight(16), paddingLeft: scaleSize(5)}}>
        <Text style={{fontSize: setSpText(16), color: '#333'}}>{title}</Text>
      </View>
      <HTMLView value={context} stylesheet={styles} addLineBreaks={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingTop: 16,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
  },
  p: {
    marginTop: 3,
    marginBottom: 3,
    lineHeight: 25
  }
});