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

import Fetch from '../lib/Fetch';

import FlatListView from '../components/pull/FlatListView'

export default class FlatListCom extends Component {

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
    super(props)
    this.state = {
      dataList: [],
      isRefreshing: false,
      fHeight: 0
    }
  }

  componentDidMount = () => {
    this._onRefresh();
  }

  _onRefresh = async() => {
    console.log('_onRefresh')
    try {
      let REQUEST_URL = "http://twjs.weijinshi.com/app/showInformation";
      let res = await Fetch.POST(REQUEST_URL,{columnKey: 'info_app_company', pageSize: 5, currPage: 1}).then(res => {return res})
      console.log('loadMore:',res)
      this.setState({
        dataList: res.data.page,
      })
    }catch (err) {
      console.log(err);
    }
  }

  _onEndReached = async() => {
    console.log('_onEndReached')
    try {
      let REQUEST_URL = "http://twjs.weijinshi.com/app/showInformation";
      let res = await Fetch.POST(REQUEST_URL,{columnKey: 'info_app_company', pageSize: 5, currPage: 2}).then(res => {return res})
      console.log('loadMore:',res)
      this.setState({
        dataList: this.state.dataList.concat(res.data.page)
      })
    }catch (err) {
      console.log(err);
    }
  }

  _renderItem = (item) => {
    // console.log(item.item)
    return <View style={{padding: 16, paddingTop: 60, paddingBottom: 60}}>
      <Text style={{
      fontSize: 16
    }}>{item.item.id} - {item.item.content}</Text>
    </View>
  }

  _emptyComponent = () => {
    return <View style={{
      height: this.state.fHeight,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text style={{
        fontSize: 16
      }}>暂无数据下拉刷新</Text>
    </View>
  }

  render() {
    return (
      <FlatList
      data={this.state.dataList} extraData={this.state}
      refreshing={this.state.isRefreshing}
      onRefresh={() => this._onRefresh()}
      keyExtractor={(item, index) => item.id.toString()}
      ItemSeparatorComponent={()=> <View style={{height:1,backgroundColor: '#D6D6D6'}} />}
      renderItem={this._renderItem}
      onLayout={e => {
        let height = e.nativeEvent.layout.height;
        if(this.state.fHeight < height) {
          this.setState({fHeight: height})
        }
      }}
      ListEmptyComponent={this._emptyComponent}
      onEndReached={()=> this._onEndReached()}
      onEndReachedThreshold={0.1}
      >

      </FlatList>

      // <FlatListView>
        
      // </FlatListView>
    )
  }
}