import React, {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useQuery, useQueryClient} from 'react-query';
import PageTitle from '../components/PageTitle';
import {PieChart} from 'react-native-chart-kit';
import {AuthContext} from '../../context/authContext';
import {COUPON_LIST} from '../../constants/urls';
import Preloader from '../components/Preloader';
import EmptyList from '../components/EmptyList';
import Error from '../components/Error';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const getData = (coupons) => {
  return [
    {
      name: 'Coupons Used',
      number: coupons.filter((coupon) => coupon.is_spent).length,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Coupons Unused',
      number: coupons.filter((coupon) => !coupon.is_spent).length,
      color: 'orange',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];
};

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
        <PageTitle text="Coupon Stats" showRefresh={false} />
      </View>
      <View style={styles.body}>
        {status == 'loading' && <Preloader />}
        {status == 'error' && <Error />}
        {status == 'success' &&
          (coupons.length ? (
            <>
              <PieChart
                data={getData(coupons)}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={'number'}
                backgroundColor={'transparent'}
                paddingLeft={0}
                avoidFalseZero
              />
              <ListItem
                titleLeft="Total Coupons Purchased"
                titleRight={coupons.length}
              />
              <ListItem
                titleLeft="Total Amount Recieved"
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
