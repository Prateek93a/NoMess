import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import urls from '../../constants/imageUrls';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image 
            style={styles.img}
            source={{ uri: urls.SPLASH }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCF6D7'
    },
    img: {
        height: 120,
        width: 120,
        resizeMode: 'contain' 
    }
});