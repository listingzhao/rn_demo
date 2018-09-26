import React, {Component} from 'react';
import {Image,ScrollView,Platform,Button,TextInput,FlatList,TouchableOpacity, StyleSheet, Text, View, NativeModules,DeviceEventEmitter,ToastAndroid,BVLinearGradient,PixelRatio} from 'react-native';
import { scaleSize, scaleHeight, setSpText,onePixel} from '../../utils/ScreenUtils';
import { hidden } from 'ansi-colors';
import DashLine from '../../components/dashline'


export default class PlanInfo extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '计划介绍'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff'}}>
        <ScrollView>
          <View>
              <Text style={{padding: scaleSize(16), fontSize: setSpText(14), lineHeight: scaleHeight(20)}} >W计划是微金石平台推出的优先自动投标工具，经由出借人授权，并由系统根据对应的出借金额，在可行的范围内为出借人实现自动、分散式投标，匹配标的经由平台多层风控把关、严格筛选，以期尽可能降低出借人的出借风险，同时免去出借时的重复投标操作，提高出借效率。</Text>
            </View>
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <DashLine backgroundColor={'#dde2ff'} len={16} width={132} />
              <Text style={{color: '#5B71F9', fontSize: setSpText(14), paddingLeft: scaleSize(6), paddingRight: scaleSize(6)}}>加入流程</Text>
              <DashLine backgroundColor={'#dde2ff'} len={16} width={132} />
            </View>
            <View>
              <View style={{flex: 1 , paddingTop: scaleHeight(16)}}>
                <View style={styles.ListItem}>
                  <Text>
                    常见问题
                  </Text>
                </View>
                <View style={styles.ListItem}>
                  <Text>
                    服务协议
                  </Text>
                </View>
                <View style={styles.ListItem}>
                  <Text>
                    风险提示
                  </Text>
                </View>
              </View>
            </View>
        </ScrollView>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  ListItem: {
    flex: 0,
    height: scaleHeight(44), 
    paddingLeft: scaleSize(16), 
    fontSize: setSpText(16)
  }
})