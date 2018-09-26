import React, { Component } from 'react';
import {
    InteractionManager,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Platform,
    ScrollView,
    StyleSheet,
    View,
    Text
} from 'react-native';
import Pullable from './Pullable';
import LoadingSpinner from './LoadingSpinner';
import { scaleSize, scaleHeight, setSpText, onePixel, screenH, screenW} from '../../utils/ScreenUtils';

const LoadingState      = 1;    //初始loading页面
const EmptyState        = 2;    //空页面
const ErrorState        = 3;    //加载数据错误
const ListState         = 4;    //正常加载
const MoreState         = 5;    //正在加载更多
const NoMoreState       = 6;    //没有更多了
const NoMoreErrorState  = 7;    //加载更多出错

export default class PullList extends Pullable {
  constructor(props) {
    super(props);
    this.state = {
      ...this.BaseState,
      data: []
    }
    this.currentState = LoadingState;
    this.page = 0;
    this.type = 'List';
  }

  componentDidMount() {
    this.mounted = true;
    InteractionManager.runAfterInteractions(()=> {
      this.loadMore()
    })
  }

  componentWillMount() {
    this.mounted = false;
  }

  getPage = () => {
    return this.page;
  }

  setPage = (page) => {
    this.page = page;
  }

  /**
   * 加载更多
   */
  loadMore = () => {
    if(this.currentState === NoMoreState) return;
    this.page++;
    this.props.onEndReached && this.props.onEndReached(this.getPage())
  }

  renderSeparatorView = () => {
    if(this.props.ItemSeparatorComponent) {
      return this.props.ItemSeparatorComponent();
    }
    return (<View style={{width: screenW, height: scaleHeight(20), backgroundColor: '#f5f5f5'}}></View>)
  }

  _renderList = () => {
    console.log('_renderList')
    return (
      <FlatList
          style={{flex:1}}
          ref={(c) => {this.scroll = c;}}
          onScroll={this.onScroll}
          scrollEnabled={this.state.scrollEnabled}
          refreshing={false}
          keyExtractor={(item, index) => {return index.toString()}}
          onEndReachedThreshold={0.1}
          data={this.state.data}
          ListFooterComponent={this._renderFoot}
          windowSize={10}
          updateCellsBatchingPeriod={1}
          maxToRenderPerBatch={10}
          disableVirtualization={false}
          {...this.props}
          ItemSeparatorComponent={this.renderSeparatorView}
          onEndReached = {this.loadMore}>
      </FlatList>
    )
  }

  _renderFoot = () => {
    if (this.currentState === NoMoreState) {
      return this.props.renderNoMore ? this.props.renderNoMore() : this.renderNoMore();
    } else if (this.currentState === NoMoreErrorState) {
      return this.props.renderNoMoreError ? this.props.renderNoMoreError() : this.renderNoMoreError() 
    } else if (this.currentState >= ListState) {
      return this.props.renderMore ? this.props.renderMore() : this.renderMore()
    } else {
      return null;
    }
  }

  getScrollable = () => {
    console.log('getScrollable',this.currentState)
    console.log(this.currentState === LoadingState)
    if (this.currentState === LoadingState) {
      return this.props.renderLoading ? this.props.renderLoading() : this._renderLoading();
    } else if (this.currentState === EmptyState) {
      if (this.props.renderEmpty) {
        return this.props.renderEmpty(this.reloadData)
      } else {
        return this._renderEmpty();
      }
    } else {
      this.type = 'List';
      return this._renderList();
    }
  }
  
  _renderLoading = () => {
    return (
      <View style={styles.contain}>
        <LoadingSpinner type="normal"/>
      </View>
    )
  }

  _renderEmpty = () => {
    console.log('没有数据')
    return (
      <View style={[styles.contain, {justifyContent: 'center'}]}>
        <TouchableOpacity onPress={this.reloadData}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
            {/* <Image style={{width: scaleSize(365),height:scaleHeight(238)}} source={AppImages.Common.nodata}/> */}
            <Text style={{fontSize: setSpText(15),color: '#C666666'}}>暂无数据</Text>
            </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderNoMore = () => {
    return (
      <View style={{height:scaleHeight(120),justifyContent:'center', alignItems:'center'}}>
        <Text>没有更多数据</Text>
      </View>
    )
  }

  renderNoMoreError = () => {
    return (
      <TouchableHighlight
            style={styles.footer}
            underlayColor="rgba(34, 26, 38, 0.1)"
            onPress={()=> {this.resumeMoreDataFromError()}}>
        <Text>网络错误, 点击重新加载</Text>
      </TouchableHighlight>
    )
  }

  renderMore = ()=>{
    return (<View
            style={{
                paddingVertical: 10,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
            }}>
            <ActivityIndicator animating size="large"/>
        </View>);
  };

  resumeMoreDataFromError = () => {
    this.currentState = MoreState;
    this.page++;
    this.props.onEndReached && this.props.onEndReached(this.getPage())

    console.log('this.page', this.page)
  }

  /**
   * 刷新
   */
  refresh = () => {
    console.log('refresh')
    if(this.mounted) {
      this.setPage(1)
      this.props.onPullRelease && this.props.onPullRelease(this.resolveHandler);
    }
  }

  getMetrics = (args)=> {
    this.scroll&&this.scroll.getMetrics(args);
  };

  scrollToOffset = (...args)=> {
      this.scroll&&this.scroll.scrollToOffset(...args);
  };

  scrollToEnd = (args)=> {
      this.scroll&&this.scroll.scrollToEnd(args);
  };

  setData = (_data) => {
    this.setPage(1)
    console.log('下拉刷新设置 setData')
    if(_data.length === 0) {
      this.currentState = EmptyState;
    } else {
      this.currentState = ListState;
    }
    this.setState({
      data: _data
    })
  }

  addData = (_data) => {
    console.log('PullList: addData')
    if(_data.length === 0) {
      this.currentState = NoMoreState;
    } else {
      this.currentState = MoreState;
    }
    this.setState({
      data: _data
    })
  }

  reloadData = () => {
    this.currentState = LoadingState;
    this.props.onPullRelease && this.props.onPullRelease(this.resolveHandler);
  }

}

const styles = StyleSheet.create({
  contain:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f3f3'
  },
  footer:{
      height: 50,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,
      borderColor: "#CED0CE"
  }
});