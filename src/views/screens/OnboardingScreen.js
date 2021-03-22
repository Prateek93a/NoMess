import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import dimensions from '../../constants/dimensions';
import {onboardImage1, onboardImage2, onboardImage3} from '../../constants/images';
import strings from '../../constants/strings';
import MainButton from '../components/MainButton';

const slides = [{ title: strings.ONBOARDING_TITLE_1, subtext: strings.ONBOARDING_SUBTEXT_1, img: onboardImage1 },
{ title: strings.ONBOARDING_TITLE_2, subtext: strings.ONBOARDING_SUBTEXT_2, img: onboardImage2 },
{ title: strings.ONBOARDING_TITLE_3, subtext: strings.ONBOARDING_SUBTEXT_3, img: onboardImage3 }];


function Slide({ title, subtext, img }, key) {
    return (
        <View key={'' + key} style={styles.slideview} collapsable={false}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtext}>{subtext}</Text>
            <Image style={styles.img} source={img} />
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
                    <View style={styles.buttonContainer}>
                        <MainButton
                            onPress={handleButtonClick}
                            title='GET STARTED'
                        />
                    </View>
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
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 20
    },
    img: {
        height: 400,
        width: dimensions.WIDTH,
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