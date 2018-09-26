import React, {Component} from 'react';
import {Image,ScrollView,Platform,Button,FlatList,TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import Card from '../components/Card';
import {PullScroll} from '../components/pull';
import Fetch from '../lib/Fetch';

export default class PullScrollView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={{ flex: 1, alignSelf: 'center', textAlign: 'center',fontWeight: 'bold', fontSize: 18 }}>PullScrollView</Text>
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
    
    try{
      let REQUEST_URL = "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
      let res = await Fetch.GET(REQUEST_URL).then(res => {return res})
      console.log('data.movies:',res)
      this.setState({
        data: this.state.data.concat(res.movies)
      });
      resolve && resolve();
    } catch (err) {
      resolve && resolve();
      console.log(err)
    }
  }
  renderView = () => {
    let views = []
    for(let i=0;i<this.state.data.length;i++){
      views.push( <Card key={i} data={this.state.data[i]} />)
    }
    if(views.length<=0){
      for(let i=0;i<10;i++){
          views.push( <View key={i} style={{height:230,backgroundColor:'blue',marginBottom:20}}/>)
      }
    }
    console.log('renderView views.length',views.length)
    return views;
  }
  render() {
    return (
    <PullScroll Key={'PullScroll'}
    Android_Native={true}//是否使用原生下拉刷新
    onPullRelease={this.onPullRelease}
    style={{flex:1,backgroundColor: '#f5f5f7'}}>
      {this.renderView()}
    </PullScroll>)
  }
}