import React, {Component} from 'react';
import {
    Image,
    ScrollView,
    Platform,
    Button,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    InteractionManager,
    NativeModules,
    DeviceEventEmitter,
    ToastAndroid,
    BVLinearGradient,
    PixelRatio
} from 'react-native';

import PullView from './PullView'
import PullLayout from './PullLayout'
import PullListView from './PullList'

import LoadingSpinner from './LoadingSpinner';
import {
    scaleSize,
    scaleHeight,
    setSpText,
    onePixel,
    screenH,
    screenW
  } from '../../utils/ScreenUtils';
const LoadingState      = 1;    //初始loading页面
const EmptyState        = 2;    //空页面
const ErrorState        = 3;    //加载数据错误
const ListState         = 4;    //正常加载
const MoreState         = 5;    //正在加载更多
const NoMoreState       = 6;    //没有更多了
const NoMoreErrorState  = 7;    //加载更多出错

/**
 * 下拉列表
 */
class PullList extends Component {
    constructor() {
        super();
        this.state = {
            data:[],

        };
        this.currentState = LoadingState;
        this.page = 0;
        this.type='List';
    }

    refreshReleased = () => {
        this.refresh();
    }

    componentDidMount() {
        if(Platform.OS=='android'&&this.props.Android_Native){
            this.subscription = DeviceEventEmitter.addListener(this.props.Key+"onRefreshReleased",this.refreshReleased);
            InteractionManager.runAfterInteractions(()=>{
                this.loadMore()
            })
        }
    }

    componentWillUnmount() {
        if(Platform.OS=='android'&&this.props.Android_Native){
            this.pullLayout&&this.pullLayout.finishRefresh(this.props.Key);
            this.subscription&&this.subscription.remove();
        }

    }

    setPage = (page) => {
        this.page = page;
    }

    getPage = () => {
        return this.page;
    }

    renderSeparatorView = () => {
        if(this.props.ItemSeparatorComponent){
            return this.props.ItemSeparatorComponent();
        }
        return (
            <View style={{width: screenW, height: scaleHeight(20), backgroundColor: '#f5f5f5'}}>
            </View>
        )
    }

    refresh = () => {
        if(Platform.OS=='ios' || !this.props.Android_Native){
             this.PullListView && this.PullListView.refresh();
             return;
        }
        this.setPage(1);
        this.props.onPullRelease && this.props.onPullRelease(this.resolveHandler);
    }

    resolveHandler = () => {
        this.pullLayout && this.pullLayout.finishRefresh(this.props.Key);
    }

    getMetrics = (args)=> {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.getMetrics();
            return;
        }
        this.scroll&&this.scroll.getMetrics(args);
    };

    scrollToOffset = (...args)=> {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.scrollToOffset(...args);
            return;
        }
        this.scroll&&this.scroll.scrollToOffset(...args);
    };

    scrollToEnd = (args)=> {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.scrollToEnd(args);
            return;
        }
        this.scroll&&this.scroll.scrollToEnd(args);
    };

    setData = (_data) => {
        this.setPage(1);
        console.log('setData')
        if(_data.length === 0) {
            this.currentState = EmptyState;
            this.setState({
                data: ['EmptyState']
            })
        } else {
            this.currentState = ListState;
            this.setState({
                data: _data
            })
        }
    }

    addData = (_data) => {
        console.log('addData:',_data)
        let data = this.state.data;
        if (data[data.length -1] == 'EmptyState') {
            data.pop();
        }
        if(_data.length == 0) {
            this.currentState = NoMoreState;
            this.setState({
                data: data.concat(_data)
            })
        } else {
            this.currentState = MoreState;
            this.setState({
                data: data.concat(_data)
            })
            // this.PullListView&&this.PullListView.addData(_data)
        }
    }

    reloadData = () => {
        this.currentState = LoadingState;
        this.props.onPullRelease&&this.props.onPullRelease(this.resolveHandler);
    }

    loadMore = () => {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.loadMore()
            return;
        }
        if(this.currentState == NoMoreState) return;
        this.page++;
        this.props.onEndReached&&this.props.onEndReached(this.getPage());
    }

    resumeMoreDataFromError = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            this.PullListView&&this.PullListView.resumeMoreDataFromError()
            return;
        }
        this.currentState=MoreState;
        this.page++;
        Log('this.page',this.page)
        this.props.onEndReached&&this.props.onEndReached(this.getPage());
    };


    _renderLoading = ()=> {
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView._renderLoading()
        }
        return (<View style={styles.contain}>
            <LoadingSpinner type="normal"/></View>)
        // return (
        //     <View
        //         style={styles.contain}>
        //         <ActivityIndicator animating size="large"/>
        //     </View>
        // );
    };

    _renderEmpty = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView._renderEmpty()
        }
        console.log('没有数据');
        return (
            <ScrollView style={{flex:1}}>
            <View style={[styles.contain,{justifyContent:'center'}]}>
                <TouchableOpacity onPress={this.reloadData}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        {/* <Image style={{width:SCALE(365),height:SCALE(238)}} source={AppImages.Common.nodata}/> */}
                        <Text style={{fontSize:FONT(15),color:Color.C666666}}>暂无数据</Text>
                    </View>
                </TouchableOpacity>

            </View>
            </ScrollView>)
    };

    _renderError = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView._renderError()
        }
        return (
            <View style={[styles.contain,{justifyContent:'flex-start',marginTop:scaleHeight(242)}]}>
                <TouchableOpacity onPress={this.reloadData}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        {/* <Image style={{width:scaleSize(323),height:scaleHeight(271)}} source={AppImages.List.nonetwork}/> */}
                        <Text style={{fontSize:setSpText(15),color: '#666666'}}>网络无法连接，点击屏幕重试</Text>
                    </View>
                </TouchableOpacity>

            </View>)
    };

    renderNoMore = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView.renderNoMore()
        }
        return (<View style={{height:scaleHeight(50),justifyContent:'center', alignItems:'center'}}>
            <Text>没有更多数据了</Text>
        </View>)
    };

    renderMoreError = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView.renderMoreError()
        }
        return (
            <TouchableHighlight
                style={styles.footer}
                underlayColor="rgba(34, 26, 38, 0.1)"
                onPress={()=> {this.resumeMoreDataFromError()}}>
                <Text>网络错误, 点击重新加载</Text>
            </TouchableHighlight>
        );
    };

    renderRowView = ({item, index, separators})=>{
        if (item === 'LoadingState'){
            return this._renderLoading();
        }else if(item === 'EmptyState'){
            if(this.props.renderEmpty){
                return this.props.renderEmpty(this.reloadData)
            }else{
                return this._renderEmpty();
            }
        }else{
            return this.props.renderItem && this.props.renderItem({item, index, separators})
        }
    }

    renderMore = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView.renderMore()
        }
        return (<View
            style={{
                paddingVertical: 10,
                borderTopWidth: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: "#CED0CE"
            }}>
            <ActivityIndicator animating size="small"/>
            <Text note style={{marginLeft:scaleSize(15),color: this.props.textColor}}>努力加载中</Text>
        </View>);
    };

    _renderFoot = ()=>{
        if(Platform.OS=='ios'||!this.props.Android_Native){
            return this.PullListView&&this.PullListView._renderFoot()
        }
        console.log('执行了ListFooterComponent')
        console.log('this.currentState:',this.currentState)
        if (this.currentState === NoMoreState){
            return this.props.renderNoMore?this.props.renderNoMore():this.renderNoMore();
        }else if(this.currentState === NoMoreErrorState){
            return this.props.renderMoreError?this.props.renderMoreError():this.renderMoreError();
        }else if(this.currentState >= ListState){
            return this.props.renderMore?this.props.renderMore():this.renderMore();
        }else{
            return null;
        }
    };

    render() {
        if (Platform.OS == 'android' && this.props.Android_Native) {
            return (<PullLayout
                Key={this.props.Key}
                ref={(pull) => {
                    this.pullLayout = pull
                }}
                style={{flex: 1, backgroundColor: 'white'}}>
                <FlatList
                    style={{flex: 1}}
                    ref={(c) => {
                        this.scroll = c;
                    }}
                    refreshing={false}
                    keyExtractor={(item, index) => {
                        return index.toString()
                    }}
                    // onEndReachedThreshold={0.1}
                    data={this.state.data}
                    // windowSize={10}
                    // initialNumToRender={5}
                    // updateCellsBatchingPeriod={10}
                    // maxToRenderPerBatch={10}
                    {...this.props}
                    renderItem={this.renderRowView}
                    onEndReached={this.loadMore}
                    ListFooterComponent={this._renderFoot}
                />
            </PullLayout>)
        }
        return (<PullListView
            {...this.props}
            ref={(pull) => {
                this.PullListView = pull
            }}>
        </PullListView>)
    }
}


/**
 * 下拉刷新
 */
class PullScroll extends Component {

  componentDidMount() {
      if(Platform.OS=='android'){
          this.subscription = DeviceEventEmitter.addListener(this.props.Key+"onRefreshReleased",this.refreshReleased);
      }
  }

  refreshReleased = ()=>{
      this.refresh();
  }

  /**
   * 刷新
   */
  refresh = () => {
      this.props.onPullRelease && this.props.onPullRelease(this.resolveHandler);
  };

  resolveHandler = ()=>{
      this.pullLayout && this.pullLayout.finishRefresh(this.props.Key);
  }

  componentWillUnmount() {
      if(Platform.OS=='android'){
          this.pullLayout && this.pullLayout.finishRefresh(this.props.Key);
      }
      this.subscription && this.subscription.remove();
  }

  render(){
      if (Platform.OS == 'android' && this.props.Android_Native) {
          return (<PullLayout
              Key={this.props.Key}
              ref={(pull) => {
                  this.pullLayout = pull
              }}
              style={{flex: 1, backgroundColor: 'white',}}>
              <ScrollView style = {{flex:1}}>
                  {this.props.children}
              </ScrollView>

          </PullLayout>)
      }
      return (<PullView
          {...this.props}>
          {this.props.children}
      </PullView>)
  }

}

export {
  PullList,
  PullScroll
}