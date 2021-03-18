import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TextInput, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../components/Card';


export default function LeaveScreen({navigation}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isStartDateVisible, setStartDateVisible] = useState(false);
    const [isEndDateVisible, setEndDateVisible] = useState(false);
    const [startDate, setStartDate] = useState(+new Date());
    const [endDate, setEndDate] = useState(+new Date());


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleStartDate = () => {
        setStartDateVisible(!isStartDateVisible);
    };

    const toggleEndDate = () => {
        setEndDateVisible(!isEndDateVisible);
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
	            onRequestClose={toggleModal}
                visible={isModalVisible}>
                    <View style={{ backgroundColor:'white', padding: 10 }}>
                        <Text style={styles.labelText}>What is the reason?</Text>
                        <TextInput
                            onChangeText={handleTextChange}
                            numberOfLines={5}
                            multiline
                            textAlignVertical='top'
                            style={{padding: 5, borderRadius: 5, borderWidth: 1, maxHeight: 600, overflow: 'scroll'}}
                        />
                        {isStartDateVisible && (<DateTimePicker
                            value={new Date(startDate)}
                            
                            mode="date"
                            onChange={(_, date) => {console.log(+date); setStartDate(+new Date(date)); setStartDateVisible(false);}}
                        />)}
                        {isEndDateVisible && (<DateTimePicker
                            value={new Date(endDate)}
                            mode="date"
                            onChange={(_, date) => {setEndDate(+new Date(date)); setEndDateVisible(false);}}
                        />)}
                        <Pressable
                            onPress={toggleStartDate}
                            style={({pressed}) => [{opacity: pressed ? 0.8 : 1}]}>
                                <Text style={{color: 'blue'}}>Set Start Data: <Text>{new Date(startDate).toLocaleDateString()}</Text></Text>
                        </Pressable>
                        <Pressable
                            onPress={toggleEndDate}
                            style={({pressed}) => [{opacity: pressed ? 0.8 : 1}]}>
                                <Text style={{color: 'blue'}}>Set End Data: <Text>{new Date(endDate).toLocaleDateString()}</Text></Text>
                        </Pressable>
                        <Pressable
                            onPress={toggleModal}
                            style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                                <Text style={styles.buttonText}>APPLY FOR LEAVE</Text>
                        </Pressable>
                    </View>
                </Modal>
                    <Icon.Button onPress={navigation.goBack} name='arrow-left' size={20} backgroundColor='white' color='black'/>
                    <Icon.Button onPress={toggleModal} name='plus' size={20} backgroundColor='white' color='black'/>
                </View>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.headerText}>Your Leave Applications</Text>
            </View>
            <View style={styles.body}> 
                <Card
                    title='Leave Application 1'
                    date='19/1/10'
                    id={10}
                    active={false}
                    status='Granted'
                    onPress={()=>{}}
                />
                <Card
                    title='Leave Application 3'
                    date='19/1/10'
                    id={10}
                    active={true}
                    status='Unresolved'
                    onPress={()=>{}}
                />
                <Card
                    title='Leave Application 5'
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
