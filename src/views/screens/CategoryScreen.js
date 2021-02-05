import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

const slides = [{ category: 'student', text: 'Student', img: 'https://i.ibb.co/S0Y9MZh/student2.png' },
{ category: 'caterer', text: 'Caterer', img: 'https://i.ibb.co/r4LXBPS/chef2.png' },
{ category: 'guest', text: 'Guest', img: 'https://i.ibb.co/KwV8JqV/guest2.png' }]

const category = ['Student', 'Caterer', 'Guest']

const { width: dWidth } = Dimensions.get('screen');

function Slide({ category, text, img }, key, navigation) {

    return (
        <View key={'' + key} style={styles.slideview} collapsable={false}>
            <Image style={styles.img} source={{ uri: img }} />
        </View>
    )
}

export default function CategoryScreen({ navigation }) {
    const [page, setPage] = useState(0);

    const handleButtonClick = (page) => {
        navigation.navigate('register', { category: category[page] });
    }

    const handlePageUpdate = ({ nativeEvent }) => {
        setPage(nativeEvent.position);
    }

    return (
        <View style={styles.container}>
            <View style={styles.indicator}>
                <Text style={styles.indicatorText}>
                    You are?
                </Text>
                <Text style={{
                    fontSize: 15,
                    color: '#555',
                    paddingTop: 20,
                    paddingHorizontal: 20,
                    textAlign: 'center'
                }}>Basically, whom do you identify yourself with</Text>
            </View>
            <View style={styles.scrollview}>
                <ViewPager
                    orientation='horizontal'
                    style={styles.onboard}
                    initialPage={0}
                    showPageIndicator
                    onPageSelected={handlePageUpdate}
                >
                    {slides.map((slide, index) => Slide(slide, index + 1, navigation))}
                </ViewPager>
            </View>
            <View style={styles.indicator}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={[styles.dotsBase, page == 0 && styles.dotsSelected]}></View>
                    <View style={[styles.dotsBase, page == 1 && styles.dotsSelected]}></View>
                    <View style={[styles.dotsBase, page == 2 && styles.dotsSelected]}></View>
                </View>
                <View style={{ alignItems: 'center', paddingTop: 10 }}>
                    <TouchableOpacity onPress={() => handleButtonClick(page)} style={styles.button}>
                        <Text style={styles.buttonText}>I am a {category[page]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 40
    },
    onboard: {
        flex: 1
    },
    slideview: {
        flex: 1,
        alignItems: 'center',
    },
    scrollview: {
        flex: 6
    },
    indicator: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicatorText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#111'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 20,
        color: '#555'
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        width: dWidth - 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    img: {
        height: 300,
        width: 300,
        resizeMode: 'contain',
        marginTop: 50
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
