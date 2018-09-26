import React, { Component } from 'react';
import {
    Platform,
    ScrollView,
} from 'react-native';
import Pullable from './Pullable';
import { scaleSize, scaleHeight, setSpText, onePixel, screenH} from '../../utils/ScreenUtils';

export default class extends Pullable {
  constructor(props) {
      super(props);
      this.state = {
          ...this.BaseState,
      };
      const defaultFlag = {pulling: false, pullok: false, pullrelease: false};
      this.setFlag(defaultFlag);
      this.scrollTo = this.scrollTo.bind(this);
      this.scrollToEnd = this.scrollToEnd.bind(this);
      this.type = 'View';
  }

  scrollTo(...args) {
      this.scroll && this.scroll.scrollTo(...args);
  }

  scrollToEnd(args) {
      this.scroll && this.scroll.scrollTo(args);
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
      this.type='View';
      console.log('screenH:', screenH)
      if(contentHeight < screenH){
          this.OverScreen = false;
      }else {
          this.OverScreen = true;
      }
  };

  getScrollable(refreshControl) {
      return (
          <ScrollView
              ref={(c) => {this.scroll = c;}}
              refreshControl={refreshControl}
              onScroll={this.onScroll}
              scrollEnabled={Platform.OS==='android'?this.state.scrollEnabled:true}
              scrollEventThrottle={16}
              onContentSizeChange = {this.onContentSizeChange}
              {...this.props}
          >
              {this.props.children}
          </ScrollView>
      );
  }

}