import React, {
  Component,
} from 'react'
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text
} from 'react-native'
import PropTypes from 'prop-types';


export const FlatListState = {
  IDLE: 0,
  LoadMore: 1,
  Refreshing: 2
};

export default class FLList extends Component {
  static propTypes = {
    refreshing: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  }
  state = {
    listHeight: 0,
  }
  renderFooter = () => {
    let footer = null;
    let prefreshing = this.props.refreshing;
    if(typeof prefreshing !== 'boolean' && prefreshing === FlatListState.LoadMore) {
      footer = (
        <View style={styles.footerStyle}>
          <ActivityIndicator size="small" color="#888888" />
          <Text style={styles.footerStyle}>数据加载中...</Text>
        </View>
      )
    }
    return footer;
  }
  onRefresh = () => {
    console.log('FlatList: onRefresh')
    let prefreshing = this.props.refreshing;
    if((typeof prefreshing === 'boolean' && !prefreshing) || typeof prefreshing === 'number' && prefreshing !== FlatListState.LoadMore && prefreshing !== FlatListState.Refreshing) {
      this.props.onRefresh && this.props.onRefresh()
    }
  }

  onEndReached = () => {
    console.log('FlatList: onEndReached')
    let prefreshing = this.props.refreshing;
    if(typeof prefreshing === 'boolean' || this.props.data.length === 0) return;
    if(!this.props.pageSize) {
      console.warn('pageSize must be set')
    }
    if(this.props.data.length && this.props.pageSize !== 0) return;
    if(this.props.refreshing === FlatListState.IDLE) {
      this.props.onEndReached && this.props.onEndReached()
    }
  }

  render() {
    let { ListEmptyComponent, ItemSeparatorComponent } = this.props;
    let refreshing = false;
    let emptyContent = null;
    let separatorComponent = null;
    if(ListEmptyComponent) {
      emptyContent = React.isValidElement(ListEmptyComponent) ? ListEmptyComponent : <ListEmptyComponent />
    } else {
      emptyContent = <Text style={styles.emptyText}>暂无数据下拉刷新</Text>
    }
    if(ItemSeparatorComponent) {
      separatorComponent = React.isValidElement(ItemSeparatorComponent) ? ItemSeparatorComponent : <ItemSeparatorComponent />
    } else {
      separatorComponent = <View style={{height: 1, backgroundColor: '#D6D6D6'}}/>;
    }
    let prefreshing = this.props.prefreshing
    if(typeof refreshing === 'number') {
      if(prefreshing === FlatListState.Refreshing) {
        refreshing = true
      }
    } else if (typeof prefreshing === 'boolean') {
      refreshing = prefreshing
    } else if (typeof prefreshing !== 'undefined') {
      refreshing = false
    }

    return <FlatList
      {...this.props}
      onLayout={
        (e) => {
          let height = e.nativeEvent.layout.height
          if(this.state.listHeight < height) {
            this.setState({
              listHeight: height
            })
          }
        }
      }

      ListFooterComponent={this.renderFooter}
      onRefresh={this.onRefresh}
      onEndReached={this.onEndReached}
      refreshing={refreshing}
      onEndReachedThreshold={this.props.onEndReachedThreshold || 0.1}
      ItemSeparatorComponent={() => separatorComponent}
      keyExtractor={(item, index) => index}
      ListEmptyComponent={() => <View style={{height: this.state.listHeight, 
      width: '100%',
      alignContent: 'center', 
      alignItems: 'center'}}>
      {emptyContent}
      </View>}
      >

    </FlatList>
  }
}

const styles = StyleSheet.create({
  footerStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      height: 44,
  },
  footerText: {
      fontSize: 14,
      color: '#555555',
      marginLeft: 7
  },
  emptyText: {
      fontSize: 17,
      color: '#666666'
  }
})