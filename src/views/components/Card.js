import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import {avatarImage} from '../../constants/images';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Card({name='John Doe', title, active, status, date, id, onPress}) {
    return (
        <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.button, !pressed && styles.shadow, pressed && {opacity: 0.5}]}>
            <View style={styles.container}>
                <View style={styles.topTextContainer}>
                    <View style={styles.user}>
                        <View style={styles.imgBackground}>
                            <Image source={avatarImage} style={styles.img}/>
                        </View>
                        <Text style={styles.subText}>{name}</Text>
                    </View>
                    <Text style={styles.subText}>#{id}</Text>
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
                    <View style={styles.dateContainer}>
                        <Icon
                            name='calendar-alt'
                            size={20}
                            style={[styles.subText, {marginRight: 5}]}
                        />
                        <Text style={styles.subText}>
                            {date}
                        </Text>
                    </View>
                    <View style={[styles.statusContainer, active && styles.active]}>
                        <Text style={styles.statusText}>
                            {active ? 'Pending' : status}
                        </Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        marginHorizontal: 2,
        borderRadius: 10,
    },
    container: {
        backgroundColor : '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    statusContainer: {
        backgroundColor: '#0099DB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5
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
        paddingTop: 10,
        paddingHorizontal: 10,
        flex: 2
    },
    bottomTextContainer: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    subText: {
        fontSize: 15,
        color: '#666',
        fontWeight: 'bold'
    }, 
    imgBackground: {
        borderRadius: 15,
        height: 30,
        width: 30,
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    }, 
    img: {
        resizeMode: 'cover',
        borderRadius: 15,
        height: '100%',
        width: '100%',
    },
    text: {
        color: '#333',
        fontSize: 23,
        fontWeight: 'bold'
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        color: '#fff',
        fontWeight: 'bold'
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
    }
});