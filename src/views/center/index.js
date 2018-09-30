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
const myIcon = (<Icon name="arrow-right" size={24} color="#e8e8e8" />)


class Cell extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: setSpText(18)}}>{this.props.data.value}</Text>
        <Text note style={{marginLeft:scaleSize(15),color: this.props.textColor}}>{myIcon}</Text> 
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
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#f5f5f5', paddingTop: scaleHeight(16)}}>
          <View>
            <Text style={{paddingLeft: 16, paddingBottom: 16, color: '#333333', fontSize: setSpText(16)}}>常见问题</Text>
          </View>
          {this._renderList()}
          <View style={{marginTop: 40,alignItems: 'center', marginBottom: 40}}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.linking('tel:4008-690-611') }>
              <Text style={{fontSize: setSpText(18),fontWeight: 'bold'}}>4008-690-611</Text>
            </TouchableOpacity>
            <Text>工作时间：09：00-18：00</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
    paddingLeft: 16,
    paddingRight: 16,
    
  },
  image: {
    height: 200,
    alignSelf: 'stretch',
  },
});