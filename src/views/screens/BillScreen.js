import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../context/authContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PageTitle from '../components/PageTitle';
import categories from '../../constants/categories';

const ListItem = ({title, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemTitle}>{title}</Text>
      <Icon
        name="chevron-right"
        size={15}
        backgroundColor="white"
        color="black"
      />
    </View>
  </TouchableOpacity>
);

export default function BillScreen({navigation}) {
  const {authData} = useContext(AuthContext);
  const {typeAccount} = authData;

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
        <ListItem
          title="Coupon History"
          onPress={() => navigation.navigate('coupon-history')}
        />
        {typeAccount !== categories[2] && (
          <ListItem
            title="Bill History"
            onPress={() => navigation.navigate('bill-history')}
          />
        )}
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
