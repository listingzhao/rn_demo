import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  ViewPropTypes,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ViewPagerAndroid,
  Platform,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

const Button = ({text, style, onPress}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}

export default class extends Component {

  static propTypes = {
    style: ViewPropTypes.style,
    initialWidth: PropTypes.number,
    index: PropTypes.number,
    onChange: PropTypes.func,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    initialWidth: 0,
  }
  
  constructor(props) {
    super(props);
    this.state = {
      layoutWidth: this.props.initialWidth
    }
  }

  getSafeIndex = (index) => {
    const max = this.props.children.length - 1;
    const min = 0;

    return Math.min(max, Math.max(index, min))
  }

  handlePress = (index) => {
    const safeIndex = this.getSafeIndex(index);
    console.log('safeIndex', safeIndex)
    this.props.onChange(safeIndex)
  }

  handleLayout = ({nativeEvent}) => {
    this.setState({
      layoutWidth: nativeEvent.layout.width
    })
  }

  render() {
    const {children, style, index} = this.props;
    const translateX = - index * this.state.layoutWidth;
    const items = children.map((item, index) => React.cloneElement(
      item,
      {
        key: index,
        style: [
          ...item.props.style,
          {
            width: this.state.layoutWidth,
            transform: [{translateX}],
          }
        ]
      }
    ))
    return (
      <View style={{flex:1, alignItems: 'center'}}>
        <View style={[styles.container, style]}
          onLayout={this.handleLayout}>
          {items}
        </View>
        <View style={{flexDirection: 'row',}}>
          <Button style={[styles.button,{left: 0}]} text={'上一个'} onPress={() => this.handlePress(index - 1)} />
          <Button style={[styles.button,{left: 60}]} text={'下一个'} onPress={() => this.handlePress(index + 1)} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      overflow:'hidden',
  },
  button: {
      position: 'absolute',
      top: 20,
      width: 50,
      height: 20,
      borderWidth: 1,
      borderColor: '#ccc',
  }
})