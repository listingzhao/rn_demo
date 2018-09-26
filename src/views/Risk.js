import React, {Component} from 'react';
import {Image,ScrollView,Platform,Button,FlatList,TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';

import {scaleSize,scaleHeight,setSpText} from '../utils/ScreenUtils'

export default class RiskScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text style={{ flex: 1, alignSelf: 'center', textAlign: 'center',fontWeight: 'bold', fontSize: 18 }}>风险提示</Text>
      ),
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
              style={{
                marginLeft:16,
                  height:18,
                  width:11,
              }}
              source={require('../../assets/icons/gray_back.png')}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <View />
      )
    }
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <ScrollView>
        <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.tit}>信用风险</Text>
          <Text style={styles.con}>微金石作为网络借贷信息中介机构，不提供增信服务，不承担借贷违约风险。如借款方因经营不善、资金周转不灵或主观故意而出现无法或未能正常还款的情况，出借方需自行承担借贷风险，接受本息损失。</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.tit}>延期风险</Text>
          <Text style={styles.con}>当借款方未按期足额还款时，微金石将根据出借方的授权采用适当的方式代表出借方对借款方进行追索（包括但不限于仲裁和诉讼），无论采取哪种方式，在此过程中，出借方均有可能延期收到出借本金和利息。</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.tit}>操作风险</Text>
          <Text style={styles.con}>不可预测或无法控制的系统故障、设备故障、通讯故障、停电等突发事故将有可能给出借方造成一定损失。因上述事故造成交易或交易数据中断，恢复交易时以事故发生前系统最终记录的交易数据为有效数据。</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.tit}>经营风险</Text>
          <Text style={styles.con}>微金石所发布的出借产品是针对当前的相关法规和政策设计的。如国家政策、市场、法律及其他因素等发生变化，可能影响出借产品的受理、出借、偿还等的正常进行，则可能会对出借方产生不利影响。</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.tit}>特别提示</Text>
          <Text style={styles.con}>前述风险提示不能穷尽全部风险及市场的全部情形。</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.tit}>特别提示</Text>
          <Text style={styles.con}>前述风险提示不能穷尽全部风险及市场的全部情形。</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.tit}>特别提示</Text>
          <Text style={styles.con}>前述风险提示不能穷尽全部风险及市场的全部情形。</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.tit}>特别提示</Text>
          <Text style={styles.con}>前述风险提示不能穷尽全部风险及市场的全部情形。</Text>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: scaleSize(16)
  },
  box: {
    paddingBottom: scaleHeight(8)
  },
  tit: {
    fontSize: setSpText(14),
    fontWeight: 'bold',
    lineHeight: scaleHeight(24)
  },
  con: {
    fontSize: setSpText(14),
    lineHeight: scaleHeight(24)
  }
})