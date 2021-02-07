import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
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



function Home({navigation}) {
    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                    <Icon.Button onPress={navigation.openDrawer} name='bars' size={30} backgroundColor='white' color='black'/>
                    <Icon.Button onPress={navigation.openDrawer} name='home' size={30} backgroundColor='white' color='black'/>
                </View>
                <Text style={styles.welcomeText}>Welcome,</Text>
                <Text style={styles.welcomeText}>Prateek Jain 👋️</Text>
            </View>
            <View style={styles.body}> 
                <View style={styles.carasoulContainer}>
                    <Text style={styles.labelText}>See what's happening!</Text>
                    <ScrollView 
                        nestedScrollEnabled
                        horizontal
                        alwaysBounceHorizontal
                        disableIntervalMomentum
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.carasoul}>
                            <View style={[styles.cardBase, styles.carasoulCard]}>
                                <Text>Mess Manager Changed</Text>
                            </View>
                            <View style={[styles.cardBase, styles.carasoulCard]}>

                            </View>
                            <View style={[styles.cardBase, styles.carasoulCard]}>

                            </View>
                    </ScrollView>
                </View>
                <View style={[styles.cardContainer]}>
                    <Text style={styles.labelText}>What do you want to do?</Text>
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
        paddingHorizontal: 5
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