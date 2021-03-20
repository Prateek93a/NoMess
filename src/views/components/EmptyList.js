import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {emptyImage} from '../../constants/images';

export default function EmptyList({text}) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={emptyImage} />
            <Text style={styles.text} >{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 150,
        width: 200,
        resizeMode: 'contain',
        marginBottom: 30 
    },
    text:{
        color: '#ababab',
        fontSize: 20
    }
});