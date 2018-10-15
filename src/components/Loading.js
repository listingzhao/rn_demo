/*
 * @Author: listing.zhao
 * @Date: 2018-10-11 11:08:56 
 * @Last Modified by: listing.zhao
 * @Last Modified time: 2018-10-15 21:58:41
 */

import React, {Component} from 'react';
import {View, StyleSheet, Platform, ActivityIndicator} from 'react-native'
import {screenW,screenH,scaleSize,scaleHeight,setSpText} from '../utils/ScreenUtils'
import RootSiblings from 'react-native-root-siblings';
let sibling;

const Loading = {
  show: () => {
    let size = Platform.OS === 'ios' ? "large" : 50;
    let backView = {
      ...Platform.select({
        ios: {
          backgroundColor: '#111',
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        },
        android: {

        },
      }),
    }
    sibling = new RootSiblings(
      <View style={styles.maskStyle}>
        <View style={backView}>
          <ActivityIndicator size={size} color="#5b71f9" />
        </View>
      </View>
    )
  },
  hidden: () => {
    if(sibling instanceof RootSiblings) {
      sibling.destroy()
    }
  }
}

const styles = StyleSheet.create({
  maskStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: screenW,
    height: screenH,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export {Loading}

