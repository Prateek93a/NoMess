import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PageTitle from '../components/PageTitle';

const ListItem = ({titleLeft, titleRight}) => (
  <View style={styles.listItemContainer}>
    <Text style={styles.listItemTitle}>{titleLeft}</Text>
    <Text style={styles.listItemTitle}>{titleRight + ''}</Text>
  </View>
);

export default function CouponHistoryScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <Icon.Button
            onPress={navigation.goBack}
            name="arrow-left"
            size={20}
            backgroundColor="white"
            color="black"
          />
        </View>
        <PageTitle text="Your Bills" showRefresh={false} />
      </View>
      <View style={styles.body}>
        <ListItem titleLeft="Total Coupons Purchased" titleRight="100" />
        <ListItem titleLeft="Total Coupons Used" titleRight="100" />
        <ListItem titleLeft="Total Coupons Unused" titleRight="100" />
        <ListItem titleLeft="Total Amount Spent" titleRight="100" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  body: {
    paddingTop: 40,
    flex: 1,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#efefef',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#cdcdcd',
  },
  listHeaderText: {
    color: '#333',
    fontSize: 14,
  },
  listItemContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
