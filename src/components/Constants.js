import React, {Component} from 'react';
let Dimensions = require('Dimensions');

import {
    Text,
} from 'react-native';

const object = {
  DEBUG: true, //是否开启日志
  nightMode:false,  // 夜间模式
  nightModeGrayLight:'#484848', // 浅灰
  nightModeGrayDark:'#272727', // 深灰
  nightModeTextColor:'white', //夜间模式文字颜色
  normalTextColor: '#666666', // 正常文字颜色
  bottomDivideColor:'#dddddd', //底部分割线
  labelBgColor: '#f8f8f8', // 标签项背景色
  normalTextLightColor: '#8B8B8B', // 正常文字亮颜色
  itemDividerColor: '#EEEEEE', // one分页分割线的颜色
  ScreenWH: Dimensions.get('window'), // 窗口宽高获取
}

export default object