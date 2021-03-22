import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import {AuthContext} from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {LOGOUT_URL} from '../../constants/urls';
import {profileStudentImage, profileCatererImage, avatarImage} from '../../constants/images';
import categories from '../../constants/categories';
import PageTitle from '../components/PageTitle';
import MainButton from '../components/MainButton';

export default function ProfileScreen({navigation}) {
    const [loading, setLoading] = useState(false);
    const {setAuthData, authData} = useContext(AuthContext);
    const {name, email, typeAccount, specialRole} = authData;

    const profileImage = typeAccount === categories[1] ? profileCatererImage : profileStudentImage;

    const handleLogout = async() => {
        setLoading(true);
        await fetch(LOGOUT_URL, {
            headers: {
                'Authorization': 'Bearer ' + authData.key,
            }
        });
        await AsyncStorage.removeItem('auth-data');
        setLoading(false);  
        setAuthData(null);
    }

    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
            <View style={styles.headerButtons}>
                <Icon.Button 
                    onPress={navigation.goBack} 
                    name='arrow-left' 
                    size={20} 
                    backgroundColor='white' 
                    color='black'/>
            </View>
            <PageTitle text='Your Profile' showRefresh={false}/>
            <View style={styles.body}>
                <View style={styles.imgContainer}>
                    <View style={styles.imgBackground}>
                        <Image source={avatarImage} style={styles.img}/>
                    </View>
                </View>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>{name}</Text>
                </View>
                <View style={styles.ticketContainer}>
                    <View style={[styles.ticket, {backgroundColor: '#F98B26'}]}>
                        <Text style={styles.ticketText}>
                            {typeAccount == categories[1] ? 'Caterer' : typeAccount == categories[0] ? 'Student' : 'Guest'}
                        </Text>
                    </View>
                    <View style={[styles.ticket, {backgroundColor:'purple'}]}>
                        <Text style={styles.ticketText}>
                        {specialRole == 'string' ? 'No Special Role' : specialRole}
                        </Text>
                    </View>
                </View>
                <View style={styles.contactContainer}>
                    <Text style={styles.labelText}>Contact Details</Text>
                    <View style={styles.contact}>
                        <Icon
                        name='inbox'
                        size={20}
                        />
                        <Text style={styles.contactText}>
                            {email}
                        </Text>
                    </View>
                    <View style={styles.contact}>
                        <Icon
                        name='phone-alt'
                        size={20}
                        />
                        <Text style={styles.contactText}>
                            +91-999-999-1000
                        </Text>
                    </View>
                </View>
                {typeAccount != categories[1] && (
                    <View style={styles.contactContainer}>
                        <Text style={styles.labelText}>Billing Mode</Text>

                    </View>
                )}
            </View>
            <View style={styles.buttonContainer}>
                <MainButton
                    loading={loading}
                    onPress={handleLogout}
                    title='LOGOUT'
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 10
    },
    body: {
        paddingHorizontal: 10,
        flex: 1
    },
    imgContainer: {
        paddingTop: 40,
        alignItems: 'center'
    },
    imgBackground: {
        borderRadius: 60,
        height: 120,
        width: 120,
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    img: {
        resizeMode: 'cover',
        borderRadius: 60,
        height: '100%',
        width: '100%',
    },
    heading: {
        paddingTop: 20,
        alignItems: 'center'
    },
    headingText: {
        fontSize: 20, 
        fontWeight: 'bold'
    },
    ticketContainer: {
        flexDirection: 'row',
        paddingTop: 30,
        justifyContent: 'center',
    },
    ticket: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ticketText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff'
    },
    labelText: {
        color: '#aaa'
    },
    contactContainer: {
        paddingTop: 50,
        paddingLeft: 15
    },  
    contact: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingTop: 12,
    },
    contactText: {
        fontSize: 15,
        marginLeft: 10,
        color: '#555'
    },
    buttonContainer: {
        alignItems: 'center',
        paddingBottom: 15
    }
})