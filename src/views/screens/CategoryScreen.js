import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import dimensions from '../../constants/dimensions';
import {studentImage, chefImage, guestImage} from '../../constants/images';
import categories from '../../constants/categories';

const slides = [studentImage, chefImage, guestImage];

function Slide(img, key) {
    return (
        <View key={'' + key} style={styles.slideview} collapsable={false}>
            <Image style={styles.img} source={img} />
        </View>
    )
}

export default function CategoryScreen({ navigation }) {
    const [page, setPage] = useState(0);

    const handleButtonClick = (page) => {
        navigation.navigate('register', { category: categories[page] });
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
                    {slides.map((slide, index) => Slide(slide, index + 1))}
                </ViewPager>
            </View>
            <View style={styles.indicator}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={[styles.dotsBase, page == 0 && styles.dotsSelected]}></View>
                    <View style={[styles.dotsBase, page == 1 && styles.dotsSelected]}></View>
                    <View style={[styles.dotsBase, page == 2 && styles.dotsSelected]}></View>
                </View>
                <View style={{ alignItems: 'center', paddingTop: 10 }}>
                    <Pressable
                     onPress={() => handleButtonClick(page)}
                     style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                        <Text style={styles.buttonText}>{categories[page]}</Text>
                    </Pressable>
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
        width: dimensions.WIDTH - 20,
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
