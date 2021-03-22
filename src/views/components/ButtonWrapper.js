//import React from 'react';
//import { View, Text, Pressable, StyleSheet } from 'react-native';

//export default function ButtonWrapper({onPress, children}) {
//    return (
//        <Pressable 
//            onPress={onPress}
//            style={({pressed}) => [styles.container, !pressed && styles.fabViewShadow, pressed && {opacity: 0.5}]}>
//            {children}
//        </Pressable>
//    )
//}

//const styles = StyleSheet.create({
//    fabView: {
//        marginRight: 15,
//        borderRadius: 20,
//        justifyContent:'center',
//        alignItems: 'center',
//        height: 150,
//        width: 100,
//        backgroundColor : "#fff",
//    },
//    fabViewShadow: {
//        shadowColor: "#000",
//        shadowOffset: {
//            width: 0,
//            height: 2,
//        },
//        shadowOpacity: 0.25,
//        shadowRadius: 3.84,

//        elevation: 5,
//    },
//});