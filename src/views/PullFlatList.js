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
import Card from '../components/Card';
import {
  PullList
} from '../components/pull';
import Fetch from '../lib/Fetch';

export default class PullFlatList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={{ flex: 1, alignSelf: 'center', textAlign: 'center',fontWeight: 'bold', fontSize: 18 }}>PullFlatList</Text>
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

  constructor(props) {
    super(props);
    this.state = {
      data:[],
    };
  }

  onPullRelease = async(resolve) => {
    console.log('PullFlatList:-onPullRelease')
    try {
      let REQUEST_URL = "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
      let res = await Fetch.GET(REQUEST_URL).then(res => {return res})
      console.log('onPullRelease data.movies:',res)
      this.pullList && this.pullList.setData(res.movies)
      resolve && resolve();
    }catch (err) {
      resolve && resolve();
      console.log(err);
    }
  }

  loadMore = async(page) => {
    setTimeout(async() => {
      console.log(page)
      try {
        let REQUEST_URL = "http://twjs.weijinshi.com/app/showInformation";
        let res = await Fetch.POST(REQUEST_URL,{columnKey: 'info_app_company', pageSize: 5, currPage: page}).then(res => {return res})
        console.log('loadMore:',res)
        this.pullList && this.pullList.addData(res.data.page)
      }catch (err) {
        console.log(err);
      }
    }, 1000)
  }

  renderRowView = ({item, index, separators}) => {
    return (<Card data={item}></Card>)
  }

  render() {
    return (
      <PullList
        Android_Native={true}
        Key={'list'} //每一个实例不能重复
        ref={(list) => this.pullList = list}
        onEndReachedThreshold={0.1}
        onPullRelease={this.onPullRelease}
        onEndReached={this.loadMore}
        renderItem={this.renderRowView}
        getItemLayout={(data, index) => ({length: 140, offset:140 * index, index})}
        numColumns={1}
        ItemSeparatorComponent={() => {
          return null;
        }}
        initialNumToRender={5}
        renderLoading = {()=>{return null;}}
      ></PullList>
    )
  }
}