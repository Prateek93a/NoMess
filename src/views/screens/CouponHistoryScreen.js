import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useQuery, useQueryClient} from 'react-query';
import PageTitle from '../components/PageTitle';
import {AuthContext} from '../../context/authContext';
import {COUPON_LIST} from '../../constants/urls';
import Preloader from '../components/Preloader';
import EmptyList from '../components/EmptyList';
import Error from '../components/Error';

const fetchCoupons = async (key) => {
  const res = await fetch(COUPON_LIST, {
    headers: {
      Authorization: 'Token ' + key,
    },
  });
  return res.json();
};

const ListItem = ({titleLeft, titleRight}) => (
  <View style={styles.listItemContainer}>
    <Text style={styles.listItemTitle}>{titleLeft}</Text>
    <Text style={styles.listItemTitle}>{titleRight + ''}</Text>
  </View>
);

export default function CouponHistoryScreen({navigation}) {
  const queryClient = useQueryClient();
  const {authData} = useContext(AuthContext);
  const {data: coupons, status} = useQuery('coupons', () =>
    fetchCoupons(authData.key),
  );
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
        <PageTitle text="Your Coupon History" showRefresh={false} />
      </View>
      <View style={styles.body}>
        {status == 'loading' && <Preloader />}
        {status == 'error' && <Error />}
        {status == 'success' &&
          (coupons.length ? (
            <>
              <ListItem
                titleLeft="Total Coupons Purchased"
                titleRight={coupons.length}
              />
              <ListItem
                titleLeft="Total Coupons Used"
                titleRight={coupons.filter((coupon) => coupon.is_spent).length}
              />
              <ListItem
                titleLeft="Total Coupons Unused"
                titleRight={
                  coupons.length -
                  coupons.filter((coupon) => coupon.is_spent).length
                }
              />
              <ListItem
                titleLeft="Total Amount Spent"
                titleRight={'Rs ' + coupons.length * 126}
              />
            </>
          ) : (
            <EmptyList text="No Coupons Purchased" />
          ))}
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
