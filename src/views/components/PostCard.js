import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function PostCard({onPress, item}) {
    return (
        <Pressable 
            onPress={onPress}
            style={({pressed}) => [styles.view, !pressed && styles.shadow, pressed && {opacity: 0.7}]}>
            <Image source={item.img} style={styles.image}/>
            <View style={styles.overlay}/>
            <View style={styles.textContainer}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.text}>{item.title}</Text>
                <Text style={styles.subtext}>{item.date}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        borderRadius: 10,
        height: 200,
        marginBottom: 10,
        marginTop: 5,
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
    image: {
        flex: 1,
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    textContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtext: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rrgba(0,0,0,0.4)',
        borderRadius: 10,
    }
});