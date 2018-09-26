import React, { Component } from 'react';
import {StyleSheet,Dimensions, ActivityIndicator,View, Text} from "react-native";
import {scaleSize, scaleHeight, setSpText, onePixel, screenH, screenW} from '../../utils/ScreenUtils';

export default class LoadingSpinner extends Component {
  static defaultProps = {
    width: screenW,
    height: screenH,
    spinnerColor: 'white',
    textColor: 'white',
    text: '努力加载中...',
    backgroundColor: 'transparent'
  }

  render() {
    let type = this.props.type;
    if(type === 'normal') {
      return (
        <View style={{width: screenW, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: scaleSize(280), height: scaleHeight(100), borderRadius: 10, backgroundColor: 'black', opacity: 0.75,flexDirection:'row',justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={this.props.spinnerColor}/>
            <Text note style={{color: this.props.textColor}}>{this.props.text}</Text>
          </View>
        </View>
      )
    } else if (type === 'bottom') {
      return (
        <View style={{width: screenW, height:scaleHeight(100), borderRadius:10, backgroundColor: '#f5f5f5', flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={this.props.spinnerColor}/>
          <Text note style={{color: this.props.textColor}}>{this.props.text}</Text>
        </View>
      )
    } else if (type === 'allLoaded') {
      return (
        <View style={styles.allLoaded}><Text style={styles.statusText}>没有更多数据了</Text></View>
      )
    } else if (type === 'home') {
      return (
        <ActivityIndicator color={'#FF6347'}/>
      )
    } else {
      return (
        <View style={{
          position:'absolute',
          top:0,
          left:0,
          right:0,
          bottom: 0,
          width: this.props.width,
          height: this.props.height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:this.props.backgroundColor}}>
          <View style={{width:scaleSize(280),height:scaleHeight(100),borderRadius:10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.75,
              backgroundColor:'black'}}>
              <ActivityIndicator color={this.props.spinnerColor}/>
              <Text note style={{marginLeft:scaleSize(15),color: this.props.textColor}}>{this.props.text}</Text>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  allLoaded:{
    marginLeft: scaleSize(20),
    marginRight: scaleSize(20),
    justifyContent:'center',
    alignItems:'center',
    height:scaleHeight(100),
    backgroundColor: '#f3f3f3',
  },
  statusText:{
      backgroundColor:'transparent',
      fontSize: setSpText(13),
      color: '#333333',
  }
});