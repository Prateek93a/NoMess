import React, {useState} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../components/Card';
import CardDetailsModal from '../components/CardDetailsModal';
import EmptyList from '../components/EmptyList';
import PageTitle from '../components/PageTitle';

const complaints = [{id: 0, name: 'Sam', date: 'July 2021',
                     title: 'Unhygeinic Food', body: 'Found an insect in the food.',
                     status: 'Resolved', active: false},
                    {id: 1, name: 'Jack', date: 'August 2021',
                     title: 'Bad Oil', body: 'Reusing same oil over and over again.', 
                     status: '', active: true}];

export default function ComplaintApplicationsScreen({navigation}) {
    const complaintDetailsStruct = {id: 0,
                                    name: '',
                                    date: '',
                                    title: '',
                                    body: '',
                                    status: '',
                                    active: false};

    const [complaintDetails, setComplaintDetails] = useState(complaintDetailsStruct);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (isModalVisible, complaintDetails = complaintDetailsStruct) => {
        setComplaintDetails(complaintDetails);
        setModalVisible(isModalVisible);
    };

    const refresh = async() => {
        //setRefreshing(true);
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
                </View>
                <PageTitle
                    text='Complaints Filed'
                    handleRefresh={refresh}
                />
            </View>
            <View style={styles.body}> 
                <CardDetailsModal
                    toggleModal={toggleModal}
                    isModalVisible={isModalVisible}
                    details={complaintDetails}
                    isCaterer={true}
                />
                {complaints.length ? complaints.map(complaint => (
                    <Card
                       key={complaint.id}
                       title={complaint.title}
                       date={complaint.date}
                       id={complaint.id}
                       active={complaint.active}
                       status={complaint.status}
                       onPress={() => toggleModal(true, complaint)}
                   />
                )) : <EmptyList text='No complaints filed'/>}
            </View>
        </ScrollView>
    );
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
    labelText: {
        color: '#aaa'
    },
    body: {
        flex: 1,
        paddingTop: 30
    },
});
