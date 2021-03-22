import React, {useState} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../components/Card';
import CardDetailsModal from '../components/CardDetailsModal';
import PageTitle from '../components/PageTitle';
import EmptyList from '../components/EmptyList';
import LeaveInputModal from '../components/LeaveInputModal';

const leaveApplications = [{id: 0, name: 'Sam', date: 'July 2021',
                        title: 'Leave Application', body: 'Going out of station.',
                        status: 'Resolved', active: false},
                        {id: 1, name: 'Jack', date: 'August 2021',
                        body: 'Going out of station.', title: 'Leave Application',
                        status: '', active: true}];

export default function LeaveScreen({navigation}) {
    const leaveDetailsStruct = {id: 0,
                                title: '',
                                name: '',
                                date: '',
                                body: '',
                                status: '',
                                active: false};

    const [leaveDetails, setLeaveDetails] = useState(leaveDetailsStruct);
    const [isLeaveModalVisible, setLeaveModalVisible] = useState(false);
    const [isInputModalVisible, setInputModalVisible] = useState(false);

    const toggleLeaveModal = (isModalVisible, leaveDetails = leaveDetailsStruct) => {
        setLeaveDetails(leaveDetails);
        setLeaveModalVisible(isModalVisible);
    };

    const toggleInputModal = (isModalVisible) => {
        setInputModalVisible(isModalVisible);
    }
    
    const handleLeaveSubmit = async(reasonText, startDate, endDate) => {
        // make requests
    }

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
                    <Icon.Button   
                        onPress={() => toggleInputModal(true)}  
                        name='plus' 
                        size={20} 
                        backgroundColor='white' 
                        color='black'/>
                </View>
                <PageTitle
                    text='Your Leave Applications'
                    handleRefresh={refresh}
                />
            </View>
            <LeaveInputModal
                toggleModal={toggleInputModal}
                isModalVisible={isInputModalVisible}
                handleSubmit={handleLeaveSubmit}
            />
            <View style={styles.body}> 
                <CardDetailsModal
                    toggleModal={toggleLeaveModal}
                    isModalVisible={isLeaveModalVisible}
                    details={leaveDetails}
                />
                {leaveApplications.length ? leaveApplications.map(leave => (
                      <Card
                      name={leave.name}
                      key={leave.id}
                      title={leave.title}
                      date={leave.date}
                      id={leave.id}
                      active={leave.active}
                      status={leave.status}
                      onPress={() => toggleLeaveModal(true, leave)}
                      />
                )) : <EmptyList text='No applications submitted'/>}
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
    body: {
        flex: 1,
        paddingTop: 30
    },
});
