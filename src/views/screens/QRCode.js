import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QR from 'react-native-qrcode-svg';
import dimensions from '../../constants/dimensions';

export default function QRCode({uuid}) {
    return (
        <View style={styles.container}>
            <Text>Scan the code or use the given ID</Text>
            <QR
                size={dimensions.WIDTH-100}
                value={uuid.toString()}
            />
            <Text style={styles.id}>ID: {uuid}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    id: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});