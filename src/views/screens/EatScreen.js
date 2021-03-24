import React, {useState} from 'react';
import { View, Text,
         StyleSheet, ScrollView,
         Modal, TextInput,
         Pressable, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {logoImage} from '../../constants/images';
import QRCode from './QRCode';
import RazorpayCheckout from 'react-native-razorpay';
import { REQUEST_COUPON, CONFIRM_COUPON_PAYMENT } from '../../constants/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyList from '../components/EmptyList';
import PageTitle from '../components/PageTitle';


export default function EatScreen({navigation}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isQRVisible, setQRVisible] = useState(false);
    const [couponUUID, setCouponUUID] = useState(0);
    const [numCoupons, setNumCoupons] = useState(0);
    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleTextChange = (text) => {
        if(isNaN(text)) return;
        if(text > 3) return;
        if(text < 0) return;
        setNumCoupons(text);
    }

    const handlePress = async() => {
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

        setLoading(true);

        try{
            var authData = await AsyncStorage.getItem('auth-data')
            authData = JSON.parse(authData);
            const res = await fetch(REQUEST_COUPON, {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token ' + authData['key'],
                }
            });

            if(res.status == 500){
                console.log('Some error occured at the server, please retry.');
                setLoading(false);
                return;
            }
            
            if(res.status == 200){
                const res_json = await res.json();
                var order_id = res_json['order_id'];
            } else {
                console.log('Some error occured, please retry.');
                setLoading(false);
                return;
            }

        } catch(error) {
            console.log('Some error occured while requesting payment, please retry.');
            setLoading(false);
        }

        var options = {
            description: 'Payment for coupon',
            image: {logoImage}, //FIXME: Image not displaying, but http links work.
            key: 'rzp_test_MtjornKoJ2KiHj', // Test Merchant ID
            name: 'IIITG Mess',
            order_id: order_id,
            prefill: {
              email: authData['email'],
              name: authData['name'],
            },
            theme: {color: 'blue'}
          }
          RazorpayCheckout.open(options).then(async (data) => {
            // handle success
            //alert(`Success: ${data.razorpay_payment_id} | ${data.razorpay_signature}`);

            let postData = {}
            postData['payment_id'] = data.razorpay_payment_id;
            postData['signature'] = data.razorpay_signature

            try{
                const res = await fetch(CONFIRM_COUPON_PAYMENT, {
                    method: 'POST',
                    body: JSON.stringify(postData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Token ' + authData['key'],
                    }
                });
    
                if(res.status == 500){
                    console.log('Some error occured, please retry.');
                    setLoading(false);
                    return;
                }
                
                if(res.status == 200){
                    const res_json = await res.json();
                    console.log(res_json);
                    if(res_json['success'] == 1) {
                        alert(`Success: Payment completed succesfully!`); //TODO: Do some UI magic
                        //TODO: Refresh coupons here

                    } else if (res_json['success'] == 0){
                        alert(`Failure: Payment did not completed succesfully!`); //TODO: Do some UI magic
                    } else {
                        alert(`Failure: Payment did not completed succesfully!`); //TODO: Do some UI magic
                        console.log("Invalid success message. Contact the idiot. He messed up the server. Again.")
                    }
                }
    
            } catch(error) {
                console.log('Some error occured, please retry.');
                setLoading(false);
            }
            
          }).catch((error) => {
            // handle failure
            if(error.code == 0) {
                alert(`Payment cancelled!`);
            } else {
                alert(`Error: ${error.code} | ${error.description}`);
            }
          });
        setLoading(false);
        toggleModal();
    }

    const setQR = (uuid) => {
        setCouponUUID(uuid);
        toggleQR();
    }

    const toggleQR = () => {
        setQRVisible(!isQRVisible);
    }

    const refresh = async() => {
        //setRefreshing(true);
    }



    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
            <View style={styles.header}>
            <Modal 
                animationType='slide'
	            onRequestClose={toggleModal}
                hardwareAccelerated
                visible={isModalVisible}>
                    <View style={{ backgroundColor:'white', padding: 10 }}>
                        <Text style={styles.labelText}>Number of coupons? (max:3)</Text>
                        <TextInput
                            value={numCoupons.toString()}
                            onChangeText={handleTextChange}
                            style={{padding: 5, borderRadius: 5, borderWidth: 1, maxHeight: 600, overflow: 'scroll'}}
                        />
                        <Pressable
                            onPress={handlePress}
                            style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                                {loading ? <ActivityIndicator color='white'/> : <Text style={styles.buttonText}>BUY COUPONS</Text>}
                            </Pressable>
                    </View>
            </Modal>
                <View style={styles.headerButtons}>
                    <Icon.Button onPress={navigation.goBack} name='arrow-left' size={20} backgroundColor='white' color='black'/>
                    <Icon.Button onPress={toggleModal} name='plus' size={20} backgroundColor='white' color='black'/>
                </View>
                <PageTitle
                    text='Your Coupons'
                    handleRefresh={refresh}
                />
            </View>
            <View style={styles.body}> 
            <Modal 
                animationType='slide'
	            onRequestClose={toggleQR}
                visible={isQRVisible}>
                <View style={{ backgroundColor:'white', padding: 10, flex: 1 }}>
                    <QRCode
                      uuid={couponUUID}
                    />
                </View>
            </Modal>
                {numCoupons == 0? (
                <EmptyList
                    text='No coupons available'
                />) : (
                <View>
                    <Card
                        title='Coupon'
                        date='19/1/10'
                        id={10}
                        active={false}
                        status='Unused'
                        onPress={()=>setQR(10)}
                    />
                    </View>)}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fff'
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 10
    },
    headerText: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    labelText: {
        color: '#aaa'
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        width: dimensions.WIDTH - 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    body: {
        flex: 1,
        paddingTop: 20
    },
});
