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

import LoadMoreState from '../components/pull/LoadMoreState'
import PullScrollView from '../components/pull/PullScrollView'
import Card from '../components/Card'
import Fetch from '../lib/Fetch';
import constants from '../components/Constants'
let {width, height} = constants.ScreenWH



export default class PullScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingState: LoadMoreState.state.hide,//加载更多状态
      isEnd: false ,//是否到末尾标记
      itemArr2: []
    }
    this.itemArr = []
    this.key = 0
    this.pageNum = 1
    this.loadNum = 0
    this.dataList = []
  }

  componentDidMount() {
    this.isMount = true
    this.loadData()
  }

  componentWillUnmount() {
    this.isMount = false
  }

  loadData = () => {
    console.log('加载页数' + this.pageNum)
    let REQUEST_URL = "http://twjs.weijinshi.com/app/showInformation";
    Fetch.POST(REQUEST_URL, {columnKey: 'info_app_company', pageSize: 5, currPage: this.pageNum}).then(res => {
      console.log('loadMore:',res)
      if(this.isMount) {
        this.dataList = res.data.page
        this.loadViewData()
        this.setState({
          loadingState: LoadMoreState.state.tip,
        })

        if(res.data.page.length < 5) {
          this.setState({
            isEnd: true,
          })
        }
      }
    })
  }

  loadViewData = () => {
    if(this.dataList.length !== 0) {
      this.dataList.map((item) => {
        this.key++;
        this.itemArr.push(<Card key={this.key} data={item}></Card>)
      })
      // for (let i = 0; i < this.dataList.length; i++) {
      //   let data = this.dataList[i]
      //   this.itemArr.push(<Card key={this.key} data={data}></Card>)
      //   this.key++;
      // }
      console.log('itemArr:', this.itemArr)
    }
  }

  onPullRelease = (resolve) => {
    this.loadData()
    setTimeout(() => {
        resolve()
    }, 3000)
  }

  onLoadMore = () => {
    if(!this.state.isEnd) {
      this.pageNum++;
      if(this.isMount) {
        this.setState({
          loadingState: LoadMoreState.state.loading,
        })
      }
      this.loadData()
    }else {
      if(this.isMount) {
        this.setState({
          loadingState: LoadMoreState.state.noMore
        })
      }
    }
  }

  renderNormal() {
    console.log('renderNormal')
    console.log('this.state.loadingState:', this.state.loadingState)
    return (
      <PullScrollView onPullRelease={this.onPullRelease}
      loadMoreState={this.state.loadingState}
      onLoadMore={this.onLoadMore}
      style={{width: width}}>
        <View>
        {
          this.itemArr
        }
        </View>
      </PullScrollView>
    )
  }

  render() {
    console.log('render')
    return (
      <View style={[styles.container, {backgroundColor: constants.nightMode ? constants.nightModeGrayLight : 'white'}]}>
        {this.renderNormal()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
  },

  title: {
      fontSize: width * 0.04,
      fontWeight: 'bold'
  },
})