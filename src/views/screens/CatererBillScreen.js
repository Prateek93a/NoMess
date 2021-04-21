import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../../context/authContext';
import PageTitle from '../components/PageTitle';
import {BILL_GENERATE} from '../../constants/urls';
import MainButton from '../components/MainButton';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const generateBill = async (key) => {
  const res = await fetch(BILL_GENERATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + key,
    },
  });

  const res_json = await res.json();
  console.log(res_json);
  if (res_json.success) {
    Alert.alert(
      '',
      `Bill generated for ${res_json.months
        .map((month) => monthNames[month - 1])
        .join(',')}`,
    );
  } else {
    Alert.alert('', 'No pending bills to generate!');
  }
};

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

export default function CatererBillScreen({navigation}) {
  const {authData} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handlePress = async () => {
    try {
      setLoading(true);
      await generateBill(authData.key);
    } catch (e) {
      console.log(e);
      Alert.alert('', 'Some error occured. \n Please try again later.');
    }
    setLoading(false);
  };
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
        <PageTitle text="Transactions & Stats" showRefresh={false} />
      </View>
      <View style={styles.body}>
        <ListItem
          title="Bill Transaction Stats"
          onPress={() => navigation.navigate('bill-stats')}
        />
        <ListItem
          title="Coupon Transaction Stats"
          onPress={() => navigation.navigate('coupon-stats')}
        />
        <View style={{alignItems: 'center', paddingTop: 30}}>
          <MainButton
            onPress={handlePress}
            title="GENERATE BILL"
            loading={loading}
          />
        </View>
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
