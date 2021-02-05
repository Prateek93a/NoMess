import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function PageIndicator({ pageCount }) {
    return (
        <View style={styles.dotsContainer}>
            <View style={[styles.dotsBase, page == 0 && styles.dotsSelected]}></View>
            <View style={[styles.dotsBase, page == 1 && styles.dotsSelected]}></View>
            <View style={[styles.dotsBase, page == 2 && styles.dotsSelected]}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dotsBase: {
        borderRadius: 25,
        marginHorizontal: 3,
        height: 5,
        width: 5,
        overflow: 'hidden',
    },
    dotsSelected: {
        backgroundColor: 'yello'
    }
});