/*
 * @Author: listing.zhao
 * @Date: 2018-10-11 11:08:56 
 * @Last Modified by: listing.zhao
 * @Last Modified time: 2018-10-12 17:24:20
 */

import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import {screenW,screenH,scaleSize,scaleHeight,setSpText} from '../utils/ScreenUtils'
import RootSiblings from 'react-native-root-siblings';
let sibling;

const Loading = {
  show: () => {
    sibling = new RootSiblings(
      <View style={styles.maskStyle}>
        <View style={styles.backViewStyle}>
          <ActivityIndicator size="large" color="white" />
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: screenW,
    height: screenH,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backViewStyle: {
    backgroundColor: '#111',
    width: 120,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  }
})

export {Loading}

