import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Card({title, active, status, date, id, onPress}) {
    return (
        <TouchableOpacity 
        onPress={onPress}
        style={[styles.container, active && styles.active]}>
            <View style={styles.topTextContainer}>
                <Text style={styles.subtext}>Date: <Text style={{color: '#fff'}}>{date}</Text></Text>
                <Text style={styles.subtext}>ID: <Text style={{color: '#fff'}}>#{id}</Text></Text>
            </View>
            <View
            style={styles.centerTextContainer}>
                <Text 
                numberOfLines={2}
                ellipsizeMode='tail'
                style={styles.text}>
                    {title}
                </Text>
            </View>
            <View style={styles.bottomTextContainer}>
                <Text style={styles.subtext}>Status: <Text style={{color: '#fff'}}>{status}</Text></Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: '#0099DB',
        paddingVertical: 10,
        paddingHorizontal: 15,
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
    active:  {
        backgroundColor: '#F98B26'
    },
    topTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    }, 
    centerTextContainer: {
        marginTop: 10,
        flex: 2
    },
    bottomTextContainer: {
        marginTop: 10,
        flex: 1,
        alignItems: 'flex-end'
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtext: {
        color: '#dedede',
        fontSize: 15
    }
});