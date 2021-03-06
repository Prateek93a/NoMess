import React, {useState} from 'react';
import { View, Text, Image,
         StyleSheet, ScrollView,
         Modal, TextInput,
         Pressable, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {emptyImage} from '../../constants/images';
import QRCode from './QRCode';


export default function EatScreen({navigation}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isQRVisible, setQRVisible] = useState(false);
    const [couponUUID, setCouponUUID] = useState(0);
    const [numCoupons, setNumCoupons] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleTextChange = (text) => {
        if(isNaN(text)) return;
        if(text > 3) return;
        if(text < 0) return;
        setNumCoupons(text);
    }

    const handlePress = () => {
        setLoading(true);

        // make requests
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

    const refresh = () => {
        setRefreshing(true);
    }

    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
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
                    <Icon.Button onPress={navigation.openDrawer} name='bars' size={20} backgroundColor='white' color='black'/>
                    <Icon.Button onPress={toggleModal} name='plus' size={20} backgroundColor='white' color='black'/>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.headerText}>Your Coupons</Text>
                <View style={{justifyContent: 'center', alignItems:'center', flex: 1, flexDirection:'row-reverse'}}>
                    {refreshing ? <ActivityIndicator size={20} color='black'/> : <Icon.Button onPress={refresh} name='sync-alt' size={20} backgroundColor='white' color='black'/>}
                </View>
                </View>
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
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                    <Image style={{ height: 150, width: 200, resizeMode: 'contain', marginBottom: 30 }} source={emptyImage} />
                    <Text style={{color: '#555'}}>No coupons available</Text>
                </View>) : ( <View>
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
    header: {
        flex: 2
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
        flex: 3,
        paddingTop: 20
    },
});
