/*
 * @Author: listing.zhaopeng 
 * @Date: 2018-09-27 14:42:21 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-10-10 10:17:56
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
  Dimensions,
  Animated,
  Easing
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

import {screenW, screenH, scaleSize,scaleHeight, setSpText} from '../../utils/ScreenUtils'

import Icon from 'react-native-vector-icons/SimpleLineIcons'
const myIcon = (<Icon name="arrow-down" size={14} color="#B2B2B2" />)

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

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0),
      show: false
    }
  }

  onShow = () => {
    const isShow = this.state.show
    console.log('onShow.')
    const { anim } = this.state;
    anim.stopAnimation(value => {
        Animated.spring(anim, {
            toValue: Math.round(value) + 1,
            duration: 500
        }).start();
    });
    this.setState({
      show: !isShow
    })
  }

  render () {
    const {title, content} = this.props.data;
    console.log('content:', content)
    const rotateZ = this.state.anim.interpolate({
      inputRange: [0, 2],
      outputRange: ['0deg', '360deg']
    });
    let rato = {transform: [{rotate: rotateZ}]}
    if(this.state.show) {
      rato = {transform: [{rotate: rotateZ}]}
    }
    return (
        <View style={{paddingTop: scaleHeight(16), borderBottomWidth: 1, borderColor: '#e8e8e8',}}>
          <TouchableOpacity activeOpacity={1} onPress={() => {
              this.onShow()
          }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: scaleHeight(16), paddingRight: scaleSize(16)}}>
                <Text style={{fontSize: setSpText(14), color: '#333'}}>{title}</Text>
                <Animated.Text note style={[{marginLeft:scaleSize(15),color: this.props.textColor }, rato]}>{myIcon}</Animated.Text>
            </View>
          </TouchableOpacity>
          <ItemContent
          {...this.props}
          isShow={this.state.show}
          ></ItemContent>
        </View>
    )
  }
}

class ItemContent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {title, content} = this.props.data;
    console.log('ItemContent content:', content)
    if(this.props.isShow) {
      return (
        <View style={{paddingRight: scaleSize(16), marginBottom: scaleHeight(15)}}>
          {content.indexOf('<') > -1 ? <HTMLView value={content} stylesheet={styles} addLineBreaks={false} /> : <Text style={{lineHeight: 25, fontSize: setSpText(14)}}>{content}</Text>}
        </View>
      )
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingTop: 16,
    paddingLeft: 16
  },
  p: {
    marginTop: 3,
    marginBottom: 3,
    lineHeight: 25
  }
});