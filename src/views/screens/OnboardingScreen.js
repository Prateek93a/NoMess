import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import dimensions from '../../constants/dimensions';
import urls from '../../constants/imageUrls';
import strings from '../../constants/strings';

const slides = [{ title: strings.ONBOARDING_TITLE_1, subtext: strings.ONBOARDING_SUBTEXT_1, img: urls.ONBOARDING_1 },
{ title: strings.ONBOARDING_TITLE_2, subtext: strings.ONBOARDING_SUBTEXT_2, img: urls.ONBOARDING_2 },
{ title: strings.ONBOARDING_TITLE_3, subtext: strings.ONBOARDING_SUBTEXT_3, img: urls.ONBOARDING_3 }];


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
                    <Pressable
                     android_ripple
                     onPress={handleButtonClick} 
                     style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                        <Text style={styles.buttonText}>GET STARTED</Text>
                    </Pressable>
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
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
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