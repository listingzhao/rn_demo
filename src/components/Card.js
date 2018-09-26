import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import { scaleSize, scaleHeight, setSpText,onePixel,screenH} from '../utils/ScreenUtils';

export default class Card extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Text>{this.props.data.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: '#CCC',
    marginTop: 20,
    height: 120,
  },
  image: {
    height: 200,
    alignSelf: 'stretch',
  },
});