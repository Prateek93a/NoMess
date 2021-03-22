import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {foodImage, food2Image} from '../../constants/images';
import { consumerFabItems, catererFabItems, Fab} from '../components/Fab';
import categories from '../../constants/categories';
import {AuthContext} from '../../context/authContext';
import PostCard from '../components/PostCard';

const postCardContent = [{title: 'Mess Manager Changed', date: '19/10/2021', img: foodImage},
                         {title: 'Dinner Time Extended', date: '10/2/2021', img: food2Image}]


export default function DashboardScreen({navigation}) {
    const {authData} = useContext(AuthContext);
    const {name, typeAccount} = authData;
    const fabItems = typeAccount === categories[1] ? catererFabItems : consumerFabItems;

    const handlePress = (screen) => {
        navigation.navigate(screen);
    }

    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                    <Icon.Button onPress={navigation.openDrawer} name='bars' size={20} backgroundColor='white' color='black'/>
                    <Icon.Button onPress={() => handlePress('profile')} name='cog' size={20} backgroundColor='white' color='black'/>
                </View>
                <Text style={styles.welcomeText}>👋️ Welcome,</Text>
                <Text style={styles.welcomeText}>{name+' Singh Tomar'}</Text>
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
                                <Fab 
                                    key={index}
                                    onPress={() => handlePress(item.screen)} 
                                    item={item}
                                />)
                            )}
                    </ScrollView>
                </View>
                <View style={[styles.cardContainer]}>
                    <Text style={styles.labelText}>
                        {typeAccount === categories[1] ? 'Your past posts' : 'See what\'s happening!'}
                    </Text>
                    {postCardContent.map(item =>  <PostCard item={item} onPress={()=>{}}/>)}
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
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 10
    },
    body: {
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
        flex: 1,
    },
    carasoul: {
        paddingVertical: 10,
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
});