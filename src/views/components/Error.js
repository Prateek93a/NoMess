import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {errorImage} from '../../constants/images';

export default function Error() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={errorImage} />
            <Text style={styles.text} >We are facing some issue!</Text>
            <Text style={styles.text} >Please try again later</Text>
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