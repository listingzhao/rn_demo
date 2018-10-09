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
  Linking
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  NavigationActions,
  StackActions
} from 'react-navigation';
import Fetch from '../../lib/Fetch'
import {scaleSize,scaleHeight,setSpText} from '../../utils/ScreenUtils'
import {baseUrl} from '../../api/baseUrl'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
const myIcon = (<Icon name="arrow-right" size={14} color="#B2B2B2" />)


class Cell extends Component {
  render () {
    return (
      <View style={{backgroundColor: '#ffffff', paddingLeft: scaleSize(16),}}>
        <View style={styles.container}>
          <Text style={{fontSize: setSpText(16)}}>{this.props.data.value}</Text>
          <Text note style={{marginLeft:scaleSize(15),color: this.props.textColor}}>{myIcon}</Text> 
        </View>
      </View>
    )
  }
}

export default class extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={{ flex: 1, alignSelf: 'center', textAlign: 'center',fontWeight: 'bold', fontSize: 18 }}>帮助中心</Text>
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
    super(props)
    this.state = {
      dataList: []
    }
  }

  componentDidMount() {
    console.log(baseUrl)
    Fetch.POST(baseUrl+"/app/help").then(res => {
      console.log(res)
      if(res.code === 1) {
        this.setState({
          dataList: res.data
        })
      }
    })
  }

  _renderList = () => {
    const { navigate } = this.props.navigation
    const listItems = this.state.dataList.map((item, index) => <TouchableOpacity key={index} activeOpacity={0.5} onPress={() => {navigate('helpdetail', {itemId: item.code,title: item.value})}}><Cell key={index} data={item}></Cell></TouchableOpacity>)
    return (
      <View style={{borderTopWidth: 1, borderColor: '#e8e8e8'}}>
        {listItems}
      </View>
    )
  }

  linking = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if(!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <View style={{flex: 1,height: '100%'}}>
        <ScrollView>
          <View style={{flex: 1,height: '100%', backgroundColor: '#f5f5f5', paddingTop: scaleHeight(16)}}>
            <View>
              <Text style={{paddingLeft: 16, paddingBottom: 16, color: '#333333', fontSize: setSpText(14)}}>常见问题</Text>
            </View>
            {this._renderList()}
          </View>
        </ScrollView>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: scaleHeight(11), paddingBottom: scaleHeight(11), alignItems: 'center', position: "absolute",left:0, right:0, bottom: 0, backgroundColor: '#fff'}}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.linking('tel:4008-690-611') }>
              <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                <Text note style={{marginRight:scaleSize(5)}}><Icon name="phone" size={16} color="#5B71F9" /></Text>
                <Text style={{fontSize: setSpText(16),fontWeight: 'bold', color: '#5B71F9'}}>联系客服</Text>
              </View>
            </TouchableOpacity>
            <Text style={{color: '#5B71F9'}}> 09:00-18:00</Text>
        </View>
      </View>
      
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
    paddingRight: 16,
    
  },
  image: {
    height: 200,
    alignSelf: 'stretch',
  },
});