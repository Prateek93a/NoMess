import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import {complainImage, leaveImage, billImage, couponImage, postImage} from '../../constants/images';

export const consumerFabItems = [{type: couponImage, titleTop: 'Go For', titleBottom: 'Eating', screen: 'eat'}, 
                {type: leaveImage, titleTop: 'Apply For', titleBottom: 'Leaves', screen: 'leave'},
                {type: complainImage, titleTop: 'File', titleBottom: 'Complaints', screen: 'complain'},
                {type: billImage, titleTop: 'Handle', titleBottom: 'Transactions', screen: 'bill'}];

export const catererFabItems = [{type: postImage, titleTop: 'Post', titleBottom: 'Updates', screen: 'bill'},
                {type: complainImage, titleTop: 'Review', titleBottom: 'Complaints', screen: 'complaint-list'}, 
                {type: leaveImage, titleTop: 'Leave', titleBottom: 'Requests', screen: 'leave-list'},
                {type: billImage, titleTop: 'Handle', titleBottom: 'Transactions', screen: 'bill'}];


export function Fab({item, onPress}){
    const {type, titleTop, titleBottom} = item;
    return (
        <Pressable 
            onPress={onPress}
            style={({pressed}) => [styles.fabView, !pressed && styles.fabViewShadow, pressed && {opacity: 0.5}]}>
            <View style={styles.fabContainer}>
                <View style={styles.fabContent}>
                    <Image source={type} style={styles.img}/>
                </View>
                <View style={styles.fabContent}>
                    <Text style={styles.fabText}>
                        {titleTop}
                    </Text>
                    <Text style={styles.fabText}>
                        {titleBottom}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    fabView: {
        marginRight: 10,
        marginLeft: 2,
        borderRadius: 20,
        height: 140,
        width: 100,
        backgroundColor : '#fff',
    },
    fabContainer: {
        flex: 1,
        paddingVertical: 10
    },
    fabContent: {
        flex: 1,
        paddingTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    fabViewShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    fabText: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight:  20
    },
    img: {
        height: 50,
        width: 50
    }
});