import React from 'react';
import { Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import dimensions from '../../constants/dimensions';

export default function MainButton({loading=false, onPress, title}) {
    return (
        <Pressable
            android_ripple
            disabled={loading}
            onPress={onPress}
            style={({pressed}) => [styles.button, !pressed && styles.shadow, pressed && {opacity: 0.5}]}>
                {loading ? <ActivityIndicator color='white'/> : <Text style={styles.buttonText}>{title}</Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#222',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 10,
        width: dimensions.WIDTH - 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});