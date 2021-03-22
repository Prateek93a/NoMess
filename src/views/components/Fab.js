import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import {complainImage, leaveImage, billImage, couponImage, postImage} from '../../constants/images';

export const consumerFabItems = [{type: couponImage, title: 'Go Out For Eating', screen: 'eat'}, 
                {type: leaveImage, title: 'Apply For Leave', screen: 'leave'},
                {type: complainImage, title: 'File A Complaint', screen: 'complain'},
                {type: billImage, title: 'View Bill History', screen: 'bill'}];

export const catererFabItems = [{type: complainImage, title: 'Review Complaints', screen: 'complaint-list'}, 
                {type: leaveImage, title: 'Leave Requests', screen: 'leave-list'},
                {type: billImage, title: 'Handle Transaction', screen: 'bill'},
                {type: postImage, title: 'Post an Update', screen: 'bill'}];


export function Fab({item, onPress}){
    const {type, title} = item;
    return (
        <Pressable 
            onPress={onPress}
            style={({pressed}) => [styles.fabView, !pressed && styles.fabViewShadow, pressed && {opacity: 0.5}]}>
            <View style={styles.fabContainer}>
                <View style={styles.fabContent}>
                    <Image source={type} style={styles.img}/>
                </View>
                <View style={styles.fabContent}>
                    <Text numberOfLines={2} style={styles.fabText}>
                        {title}
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