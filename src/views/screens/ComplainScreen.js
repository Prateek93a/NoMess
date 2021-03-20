import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../components/Card';
import ComplaintModal from '../components/ComplaintModal';

// todo: merge ComplaintApplicationsScreen and ComplaintScreen into single screen

const complaints = [{id: 0, name: 'Sam', date: 'July 2021',
                     title: 'Unhygeinic Food', body: 'Found an insect in the food.',
                     status: 'Resolved', active: false},
                    {id: 1, name: 'Jack', date: 'August 2021',
                     title: 'Bad Oil', body: 'Reusing same oil over and over again.', 
                     status: '', active: true}];

export default function ComplainScreen({navigation}) {
    const complaintDetailsStruct = {id: 0,
        name: '',
        date: '',
        title: '',
        body: '',
        status: '',
        active: false};

    const [complaintDetails, setComplaintDetails] = useState(complaintDetailsStruct);
    const [isModalVisible, setModalVisible] = useState(false);

    
    const toggleComplaintsModal = (isModalVisible, complaintDetails = complaintDetailsStruct) => {
        setComplaintDetails(complaintDetails);
        setModalVisible(isModalVisible);
    };


    const handleTextChange = (text) => setComplainText(text);

    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                {/*<Modal 
                animationType='slide'
	            onRequestClose={toggleModal}
                hardwareAccelerated
                visible={isModalVisible}>
                    <View style={{ backgroundColor:'white', padding: 10 }}>
                        <Text style={styles.labelText}>What is your complaint?</Text>
                        <TextInput
                            //onChangeText={handleTextChange}
                            placeholder='Provide a title'
                            textAlignVertical='top'
                            style={{padding: 5, borderRadius: 5, borderWidth: 1, maxHeight: 600, overflow: 'scroll'}}
                        />
                        <TextInput
                            onChangeText={handleTextChange}
                            numberOfLines={10}
                            placeholder='Describe your issue'
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
                </Modal>*/}
                    <Icon.Button 
                        onPress={navigation.goBack} 
                        name='arrow-left' 
                        size={20} 
                        backgroundColor='white' 
                        color='black'/>
                    {/*<Icon.Button 
                        onPress={toggleModal} 
                        name='plus' size={20} 
                        backgroundColor='white' 
                        color='black'/>*/}
                </View>
                <Text style={styles.headerText}>Your Complaints</Text>
            </View>
            <View style={styles.body}> 
                <ComplaintModal
                    toggleModal={toggleComplaintsModal}
                    isModalVisible={isModalVisible}
                    complaintDetails={complaintDetails}
                />
                {complaints.map(complaint => (
                    <Card
                       key={complaint.id}
                       title={complaint.title}
                       date={complaint.date}
                       id={complaint.id}
                       active={complaint.active}
                       status={complaint.status}
                       onPress={() => toggleComplaintsModal(true, complaint)}
                   />
                ))}
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
