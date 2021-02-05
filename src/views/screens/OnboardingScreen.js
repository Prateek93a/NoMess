import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

const slides = [{ title: 'Ease Your Mess', subtext: 'Handle payments, complaints, feedback and updates right from your phone', img: 'https://i.ibb.co/qCB5q9x/page4.png' },
{ title: 'Plan Ahead', subtext: 'Get useful analytics that track your bills and mess service usage', img: 'https://i.ibb.co/g3PY76x/page5.png' }, //'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200'
{ title: 'Live Peacefully', subtext: 'With mess management covered, you can focus on things that are actually important', img: 'https://i.ibb.co/Dt0B3kW/page6.png' }]

const { width: dWidth } = Dimensions.get('screen');

function Slide({ title, subtext, img }, key) {
    return (
        <View key={'' + key} style={styles.slideview} collapsable={false}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtext}>{subtext}</Text>
            <Image style={styles.img} source={{ uri: img }} />
        </View>
    )
}

export default function OnboardingScreen({ navigation }) {
    const [page, setPage] = useState(0);

    const handleButtonClick = () => {
        navigation.navigate('category');
    }

    const handlePageUpdate = ({ nativeEvent }) => {
        setPage(nativeEvent.position);
    }

    return (
        <View style={styles.container}>
            <View style={styles.scrollview}>
                <ViewPager
                    orientation='horizontal'
                    style={styles.onboard}
                    initialPage={0}
                    showPageIndicator
                    onPageSelected={handlePageUpdate}
                >
                    {slides.map((slide, index) => Slide(slide, index + 1))}
                </ViewPager>
            </View>
            <View style={styles.indicator}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={[styles.dotsBase, page == 0 && styles.dotsSelected]}></View>
                    <View style={[styles.dotsBase, page == 1 && styles.dotsSelected]}></View>
                    <View style={[styles.dotsBase, page == 2 && styles.dotsSelected]}></View>
                </View>
                {page == 2 && (
                    <TouchableOpacity onPress={handleButtonClick} style={styles.button}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    onboard: {
        flex: 1
    },
    slideview: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 70
    },
    scrollview: {
        flex: 6
    },
    indicator: {
        flex: 1,
        paddingTop: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    subtext: {
        fontSize: 15,
        color: '#555',
        paddingTop: 20,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    img: {
        height: 400,
        width: dWidth,
        marginTop: 30,
        resizeMode: 'contain'
    },
    dotsBase: {
        borderRadius: 25,
        marginHorizontal: 5,
        height: 5,
        width: 5,
        overflow: 'hidden',
        backgroundColor: '#ccc'
    },
    dotsSelected: {
        backgroundColor: 'orange'
    }
});