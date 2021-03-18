import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import { consumerFabItems, catererFabItems, Fab} from '../components/Fab';
import categories from '../../constants/categories';
import {AuthContext} from '../../context/authContext';


export default function DashboardScreen({navigation}) {
    const {authData} = useContext(AuthContext);
    const {name, typeAccount} = authData;
    const fabItems = typeAccount == categories[1] ? catererFabItems : consumerFabItems;

    const handlePress = (screen) => {
        navigation.navigate(screen);
    }

    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                    <Icon.Button onPress={navigation.openDrawer} name='bars' size={20} backgroundColor='white' color='black'/>
                    <Icon.Button onPress={() => handlePress('profile')} name='cog' size={20} backgroundColor='white' color='black'/>
                </View>
                <Text style={styles.welcomeText}>Welcome,</Text>
                <Text style={styles.welcomeText}>{name} 👋️</Text>
            </View>
            <View style={styles.body}> 
                <View style={styles.carasoulContainer}>
                    <Text style={styles.labelText}>What do you want to do?</Text>
                    <ScrollView 
                        nestedScrollEnabled
                        horizontal
                        alwaysBounceHorizontal
                        disableIntervalMomentum
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.carasoul}>
                            {fabItems.map((item, index) => (
                                            <TouchableOpacity 
                                                onPress={() => handlePress(item.screen)}
                                                key={index}
                                                style={styles.fabContainer}>
                                                    {Fab(item)}
                                            </TouchableOpacity>))}
                    </ScrollView>
                </View>
                <View style={[styles.cardContainer]}>
                    <Text style={styles.labelText}>See what's happening!</Text>
                    <View style={[styles.cardBase, styles.card]}>
                        <Text>Mess Manager Changed</Text>
                    </View>
                    <View style={[styles.cardBase, styles.card]}>

                    </View>
                    <View style={[styles.cardBase, styles.card]}>

                    </View>
                </View>
            </View>
        </ScrollView>
    );
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
    body: {
        flex: 3,
        paddingTop: 20
    },
    welcomeText: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    labelText: {
        color: '#aaa'
    },
    carasoulContainer: {
        flex: 1
    },
    carasoul: {
        paddingVertical: 10,
    },
    cardBase: {
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
    },
    carasoulCard: {
        height: '100%',
        minHeight: 100,
        backgroundColor: 'lightblue',
        width: 250,
        marginRight: 10,
    },
    cardContainer: {
        flex: 2,
        paddingTop: 10
    },
    card: {
       backgroundColor: '#efefef' ,
       borderRadius: 10,
       minHeight: 200,
       marginTop: 10,
       elevation: 0
    }
});