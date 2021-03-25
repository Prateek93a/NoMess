import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function ModeSwitch({firstText, secondText, currentActive, setActive}) {
    return (
        <View style={[styles.container, styles.shadow]}>
            <Pressable
            style={[styles.textContainer, currentActive == 0 && styles.active]}
             onPress={()=>setActive(0)}>
                <View style={[styles.textContainer, currentActive == 0 && styles.active]}>
                    <Text style={[styles.text, currentActive == 0 && styles.activeTxt]}>{firstText}</Text>
                </View>
            </Pressable>
            <Pressable 
            style={[styles.textContainer, currentActive == 1 && styles.active]}
            onPress={()=>setActive(1)}>
                <View style={[styles.textContainer, currentActive == 1 && styles.active]}>
                    <Text style={[styles.text, currentActive == 1 && styles.activeTxt]}>{secondText}</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: '#888'
    },
    container: {
        marginTop: 5,
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#dedede',
    },
    textContainer: {
        flex: 1,
        backgroundColor: '#dedede',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    active: {
       backgroundColor: 'green'
    },
    activeTxt: {
        color: 'white'
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