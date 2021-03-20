import React from 'react';
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';

export default function CardDetailsModal({details, toggleModal, isModalVisible,
                                        isCaterer=false, handleAccept=null, handleReject=null}){
    const {name, date, id, title, body, status, active} =  details;
    return (
        <Modal 
        animationType='slide'
        onRequestClose={() => toggleModal(false)}
        hardwareAccelerated
        visible={isModalVisible}>
            <View style={styles.container}>
                <Text>ID: {id}</Text>
                <Text>By: {name}</Text>
                <Text>Date: {date}</Text>
                <Text>Title: {title}</Text>
                <Text>Body: {body}</Text>
                <Text>Status: {active ? 'Pending' : status}</Text>
                {isCaterer && (
                <View style={styles.buttonContainer}>
                    <Pressable
                    disabled={active} 
                    onPress={handleReject}
                    style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button, styles.reject]}>
                        <Text style={styles.buttonText}>REJECT</Text>
                    </Pressable>
                    <Pressable
                    disabled={active} 
                    onPress={handleAccept}
                    style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button, styles.accept]}>
                        <Text style={styles.buttonText}>ACCEPT</Text>
                    </Pressable>
                </View>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        padding: 10
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 10
    },
    headerText: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    labelText: {
        color: '#aaa'
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        flex: 1
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    reject: {
        backgroundColor: 'red'
    },
    accept: {
        backgroundColor: 'green'
    },
    body: {
        flex: 1,
        paddingTop: 30
    },
});
