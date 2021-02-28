import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../components/Card';

//import Modal from 'react-native-modal';

export default function ComplainScreen({navigation}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [complainText, setComplainText] = useState('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleTextChange = (text) => setComplainText(text);

    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                <Modal 
                animationType='slide'
                hardwareAccelerated
                visible={isModalVisible}>
                    <View style={{ backgroundColor:'white', padding: 10 }}>
                        <Text style={styles.labelText}>What is your complaint?</Text>
                        <TextInput
                            onChangeText={handleTextChange}
                            numberOfLines={10}
                            multiline
                            textAlignVertical='top'
                            style={{padding: 5, borderRadius: 5, borderWidth: 1, maxHeight: 600, overflow: 'scroll'}}
                        />
                        <Pressable
                            onPress={toggleModal}
                            style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                                <Text style={styles.buttonText}>FILE COMPLAINT</Text>
                            </Pressable>
                    </View>
                </Modal>
                    <Icon.Button onPress={navigation.openDrawer} name='bars' size={20} backgroundColor='white' color='black'/>
                    <Icon.Button onPress={toggleModal} name='plus' size={20} backgroundColor='white' color='black'/>
                </View>
                <Text style={styles.headerText}>Your Complaints</Text>
            </View>
            <View style={styles.body}> 
                <Card
                    title='Complaint regarding delays and quality'
                    date='19/1/10'
                    id={10}
                    active={false}
                    status='Resolved'
                    onPress={()=>{}}
                />
                <Card
                    title='Complaint regarding delays and quality'
                    date='19/1/10'
                    id={10}
                    active={false}
                    status='Resolved'
                    onPress={()=>{}}
                />
                <Card
                    title='Complaint regarding delays and quality'
                    date='19/1/10'
                    id={10}
                    active={true}
                    status='Unresolved'
                    onPress={()=>{}}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fff'
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
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
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
    body: {
        flex: 1,
        paddingTop: 30
    },
});
