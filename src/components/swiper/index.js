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
  ActivityIndicator
} from 'react-native'

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
            transform: [{translateX,}],
          }
        ]
      }
    ))
    return (
      <View style={styles.container}>
        
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
      top: 120,
      width: 50,
      height: 20,
      borderWidth: 1,
      borderColor: '#ccc',
  }
})