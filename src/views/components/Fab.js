import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const consumerFabItems = [{type: 'utensils', title: 'Go Eating', screen: 'eat'}, 
                {type: 'sign-out-alt', title: 'Take Leave', screen: 'leave'},
                {type: 'file-medical', title: 'Complaint', screen: 'complain'},
                {type: 'wallet', title: 'Handle Bills', screen: 'bill'}];

export const catererFabItems = [{type: 'file-medical', title: 'Complaints Filed', screen: 'eat'}, 
                {type: 'sign-out-alt', title: 'Leave Requests', screen: 'leave'},
                {type: 'wallet', title: 'Bills List', screen: 'bill'}];


export function Fab({type, title}){
    return (
        <View style={styles.fabView}>
            <Icon name={type} size={30}/>
            <Text style={styles.fabText}>
                    {title}
                </Text>
        </View>
    );
}

const styles = StyleSheet.create({
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