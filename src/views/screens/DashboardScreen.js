import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../../context/authContext';

const Stack = createStackNavigator();

export default function DashboardScreen() {
    return (
        <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='home' component={Home} />
        </Stack.Navigator>
    )
}

const fabItems = [{type: 'utensils', title: 'Go Eating', screen: 'eat'}, 
                {type: 'sign-out-alt', title: 'Take Leave', screen: 'leave'},
                {type: 'file-medical', title: 'Complaint', screen: 'complain'},
                {type: 'wallet', title: 'Handle Bills', screen: 'bill'}];

function Fab({type, title}){
    return (
        <View style={styles.fabView}>
            <Icon name={type} size={30}/>
            <Text style={styles.fabText}>
                    {title}
                </Text>
        </View>
    );
}


function Home({navigation}) {
    //useEffect(() => {
    //    (async function (){
    //      const authData = await AsyncStorage.getItem('auth-data');
    //      if(authData === null){
    //        setAuthenticated(false);
    //      }else{
    //        setAuthData(authData);
    //        setAuthenticated(true);
    //      }
    //      setLoading(false);
    //    })();
    //}, []);

    const handlePress = (screen) => {
        navigation.navigate(screen);
    }

    const {authData} = useContext(AuthContext);
    const {name} = JSON.parse(authData);

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
                            {fabItems.map((item, index) => (<TouchableOpacity 
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
    },
    fabContainer: {
        marginRight: 10,
    },
    fabView: {
        backgroundColor: '#efefef',
        borderRadius: 50,
        justifyContent:'center',
        alignItems: 'center',
        height: 100,
        width: 100
    },
    fabText: {
        paddingTop: 5,
        fontSize: 10
    }
});