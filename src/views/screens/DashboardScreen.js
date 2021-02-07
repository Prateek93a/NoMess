import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

const Stack = createStackNavigator();

export default function DashboardScreen() {
    return (
        <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='home' component={Home} />
        </Stack.Navigator>
    )
}



function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                    <Icon name='bars' size={30} color='black'/>
                </View>
                <Text style={styles.welcomeText}>Welcome,</Text>
                <Text style={styles.welcomeText}>Prateek Jain 👋️</Text>
            </View>
            <View style={styles.body}> 
                <View style={styles.carasoulContainer}>
                    <Text style={styles.labelText}>See what's happening!</Text>
                    <ScrollView 
                        horizontal
                        alwaysBounceHorizontal
                        disableIntervalMomentum
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.carasoul}>
                            <View style={styles.carasoulCard}>
                                <Text>Mess Manager Changed</Text>
                            </View>
                            <View style={styles.carasoulCard}>

                            </View>
                            <View style={styles.carasoulCard}>

                            </View>
                    </ScrollView>
                </View>
                <View style={[styles.cardContainer]}>
                    <Text style={styles.labelText}>What do you want to do?</Text>
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.carasoul}>
                            <View style={styles.carasoulCard}>
                                <Text>Mess Manager Changed</Text>
                            </View>
                            <View style={styles.carasoulCard}>

                            </View>
                            <View style={styles.carasoulCard}>

                            </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff'
    },
    header: {
        flex: 1
    },
    body: {
        flex: 3,
        padding: 5
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
    carasoulCard: {
        height: '100%',
        minHeight: 100,
        backgroundColor: 'lightblue',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
        width: 250,
        marginRight: 10,
    },
    cardContainer: {
        flex: 2,
        paddingTop: 10
    },
    cardBase: {
       backgroundColor: 'purple' ,
       borderRadius: 10,
       height: 100,

    }
});