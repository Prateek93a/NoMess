import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../components/Card';
import ComplaintModal from '../components/ComplaintModal';
import ComplaintsInputModal from '../components/ComplaintsInputModal';
import EmptyList from '../components/EmptyList';

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
    const [isComplaintModalVisible, setComplaintModalVisible] = useState(false);
    const [isInputModalVisible, setInputModalVisible] = useState(false);
    
    const toggleComplaintsModal = (isModalVisible, complaintDetails = complaintDetailsStruct) => {
        setComplaintDetails(complaintDetails);
        setComplaintModalVisible(isModalVisible);
    };

    const toggleInputModal = (isModalVisible) => {
        setInputModalVisible(isModalVisible);
    }
    
    const handleComplaintSubmit = async(title, body) => {
        // make requests
    }

    return (
        <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                    <Icon.Button 
                        onPress={navigation.goBack} 
                        name='arrow-left' 
                        size={20} 
                        backgroundColor='white' 
                        color='black'/>
                    <Icon.Button 
                        onPress={() => toggleInputModal(true)} 
                        name='plus' size={20} 
                        backgroundColor='white' 
                        color='black'/>
                    <ComplaintsInputModal 
                        toggleModal={toggleInputModal}
                        isModalVisible={isInputModalVisible}
                        handleSubmit={handleComplaintSubmit}
                    />
                </View>
                <Text style={styles.headerText}>Your Complaints</Text>
            </View>
            <View style={styles.body}> 
                <ComplaintModal
                    toggleModal={toggleComplaintsModal}
                    isModalVisible={isComplaintModalVisible}
                    complaintDetails={complaintDetails}
                />
                {complaints.length ? 
                    complaints.map(complaint => (
                        <Card
                        key={complaint.id}
                        title={complaint.title}
                        date={complaint.date}
                        id={complaint.id}
                        active={complaint.active}
                        status={complaint.status}
                        onPress={() => toggleComplaintsModal(true, complaint)}
                    />
                    )) : <EmptyList text='No complaints filed'/>}
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
    body: {
        flex: 1,
        paddingTop: 30
    },
});
