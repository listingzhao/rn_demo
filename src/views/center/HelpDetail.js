/*
 * @Author: listing.zhaopeng 
 * @Date: 2018-09-27 14:42:21 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-28 14:55:27
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
import Fetch from '../../lib/Fetch'

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
      itemList: []
    }
  }

  componentDidMount() {
    const {itemId} = this.props.navigation.state.params;
    console.log('itemId', itemId)
    Fetch.POST("http://192.168.11.16:9007/app/helpDetails", {code: itemId}).then(res => {
      console.log(res)
      if(res.code === 1) {
        this.setState({
          itemList: res.data
        })
      }
    })
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
    return (
      <ScrollView>
        <View style={styles.container}>
          {this._renderList()}
        </View>
    </ScrollView>)
  }
}

function ListItem(props) {
  const {title, content} = props.data;
  console.log('content:',content)
  
  return (
      <View style={{paddingTop: scaleHeight(16)}}>
        <View style={{borderLeftWidth: 3,borderColor: '#5B71F9',marginBottom: scaleHeight(16), paddingLeft: scaleSize(5)}}>
          <Text style={{fontSize: setSpText(16), color: '#333'}}>{title}</Text>
        </View>
        {content.indexOf('<') > -1 ? <HTMLView value={content} stylesheet={styles} addLineBreaks={false} /> : <Text style={{lineHeight: 25}}>{content}</Text>}
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