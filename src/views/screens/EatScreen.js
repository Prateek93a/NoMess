/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {logoImage} from '../../constants/images';
import {useQuery, useQueryClient} from 'react-query';
import QRCode from './QRCode';
import RazorpayCheckout from 'react-native-razorpay';
import {REQUEST_COUPON, CONFIRM_COUPON_PAYMENT} from '../../constants/urls';
import {AuthContext} from '../../context/authContext';
import EmptyList from '../components/EmptyList';
import PageTitle from '../components/PageTitle';
import {COUPON_LIST} from '../../constants/urls';
import CouponPass from '../components/CouponPass';
import Preloader from '../components/Preloader';
import Error from '../components/Error';

const fetchCoupons = async (key) => {
  const res = await fetch(COUPON_LIST, {
    headers: {
      Authorization: 'Token ' + key,
    },
  });
  return res.json();
};

export default function EatScreen({navigation}) {
  const queryClient = useQueryClient();
  const {authData} = useContext(AuthContext);
  const {data: coupons, status} = useQuery('coupons', () =>
    fetchCoupons(authData.key),
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [isQRVisible, setQRVisible] = useState(false);
  const [couponUUID, setCouponUUID] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePress = async () => {
    /* The whole payment process proceeds in the following way:
     * 1. A POST request to REQUEST_COUPON endpoint for which currently no body field is required.
     * 2. The request returns an 'order_id' which would be used to process the payment.
     * 3. The order_id takes care of the amount and currency of the order.
     * 4. The payment gateway's module is then called with the 'options' variable which opens up
     *    the payment page.
     * 5. After making the payment the gateway returns a payment_id and a signature.
     * 6. The payment_id and signature are sent to CONFIRM_COUPON_PAYMENT endpoint.
     * 7. The server runs the signature verification by generating a signature using order_id,
     *    payment_id and Merchant's private key and compares it with the signature received from
     *    the client.
     * 8. The server return a JSON with 'success' either 1 or 0.
     */
    try {
      const res = await fetch(REQUEST_COUPON, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + authData.key,
        },
      });

      if (res.status == 500) {
        console.log('Some error occured at the server, please retry.');
        return;
      }

      if (res.status == 200) {
        const res_json = await res.json();
        var order_id = res_json.order_id;
      } else {
        console.log('Some error occured, please retry.');
        return;
      }
    } catch (error) {
      console.log('Some error occured while requesting payment, please retry.');
    }

    var options = {
      description: 'Payment for coupon',
      image: {logoImage}, //FIXME: Image not displaying, but http links work.
      key: 'rzp_test_MtjornKoJ2KiHj', // Test Merchant ID
      name: 'IIITG Mess',
      order_id: order_id,
      prefill: {
        email: authData.email,
        name: authData.name,
      },
      theme: {color: 'blue'},
    };
    RazorpayCheckout.open(options)
      .then(async (data) => {
        // handle success
        //alert(`Success: ${data.razorpay_payment_id} | ${data.razorpay_signature}`);

        let postData = {};
        postData.payment_id = data.razorpay_payment_id;
        postData.signature = data.razorpay_signature;

        try {
          const res = await fetch(CONFIRM_COUPON_PAYMENT, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: 'Token ' + authData.key,
            },
          });

          if (res.status == 500) {
            console.log('Some error occured, please retry.');
            return;
          }

          if (res.status == 200) {
            const res_json = await res.json();
            console.log(res_json);
            if (res_json.success == 1) {
              alert('Success: Payment completed succesfully!'); //TODO: Do some UI magic
              queryClient.invalidateQueries('coupons');
              //TODO: Refresh coupons here
            } else if (res_json.success == 0) {
              alert('Failure: Payment did not completed succesfully!'); //TODO: Do some UI magic
            } else {
              alert('Failure: Payment did not completed succesfully!'); //TODO: Do some UI magic
              console.log(
                'Invalid success message. Contact the idiot. He messed up the server. Again.',
              );
            }
          }
        } catch (error) {
          console.log('Some error occured, please retry.');
        }
      })
      .catch((error) => {
        // handle failure
        if (error.code == 0) {
          alert('Payment cancelled!');
        } else {
          alert(`Error: ${error.code} | ${error.description}`);
        }
      });
    queryClient.invalidateQueries('coupons');
    toggleModal();
  };

  const setQR = (uuid) => {
    setCouponUUID(uuid);
    toggleQR();
  };

  const toggleQR = () => {
    setQRVisible(!isQRVisible);
  };

  const refresh = async () => {
    //setRefreshing(true);
    queryClient.invalidateQueries('coupons');
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <Icon.Button
            onPress={navigation.goBack}
            name="arrow-left"
            size={20}
            backgroundColor="white"
            color="black"
          />
          <Icon.Button
            onPress={handlePress}
            name="plus"
            size={20}
            backgroundColor="white"
            color="black"
          />
        </View>
        <PageTitle text="Your Coupons" handleRefresh={refresh} />
      </View>
      <View style={styles.body}>
        <Modal
          animationType="slide"
          onRequestClose={toggleQR}
          visible={isQRVisible}>
          <View style={{backgroundColor: 'white', padding: 10, flex: 1}}>
            <QRCode uuid={couponUUID} />
          </View>
        </Modal>
        {status == 'loading' && <Preloader />}
        {status == 'error' && <Error />}
        {status == 'success' &&
          (coupons.length ? (
            coupons.map((coupon, index) => (
              <CouponPass
                key={index}
                timestamp={coupon.timestamp}
                is_spent={coupon.is_spent}
                buyer={coupon.buyer_name}
                onPress={() => setQR(coupon.uuid)}
                isCoupon={true}
              />
            ))
          ) : (
            <EmptyList text="No Coupons Available" />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  labelText: {
    color: '#aaa',
  },
  body: {
    flex: 1,
    paddingTop: 20,
  },
});
