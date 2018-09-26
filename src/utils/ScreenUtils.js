import {Dimensions, Platform, PixelRatio} from 'react-native'

export default {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  onePixel: 1 / PixelRatio.get(),
  STATUSBAR_HEIGHT: (Platform.OS === 'ios' ? 20 : 0),
  APPBAR_HEIGHT: (Platform.OS === 'ios' ? 44 : 56),
}

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();

//像素密度
export const DEFAULT_DENSITY = 2;

//px转换为dp
//以iphone6为基准
const defaultWidth = 375;
const defaultHeight = 667;
const w2 = defaultWidth / DEFAULT_DENSITY;
//px转换成dp
const h2 = defaultHeight / DEFAULT_DENSITY;

//缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH /defaultHeight;

/**
 * 默认根据宽度适配
 * 屏幕横向尺寸缩放
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param {*} size 
 */
export function scaleSize(size: Number) {
  return size * _scaleWidth;
}

/**
 * 屏幕适配纵向的尺寸
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param {*} size 
 */
export function scaleHeight(size: Number) {
  return size * _scaleHeight;
}

/**
 * 设置字体的size
 * @param {*} size 设计稿上的size
 * 返回实际sp大小,会随系统缩放比例改变
 */
export function setSpText(size: Number) {
  const scale = Math.min(_scaleWidth,_scaleHeight);
  return size * scale * fontScale;
}