import React, {useState} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../components/Card';
import CardDetailsModal from '../components/CardDetailsModal';
import EmptyList from '../components/EmptyList';
import PageTitle from '../components/PageTitle';

const leaveApplications = [{id: 0, name: 'Sam', date: 'July 2021',
                        title: 'Leave Application', body: 'Going out of station.',
                        status: 'Resolved', active: false},
                        {id: 1, name: 'Jack', date: 'August 2021',
                        body: 'Going out of station.', title: 'Leave Application',
                        status: '', active: true}];

export default function LeaveApplicationsScreen({navigation}) {
    const leaveDetailsStruct = {id: 0,
                                    name: '',
                                    date: '',
                                    title: '',
                                    body: '',
                                    status: '',
                                    active: false};

    const [leaveDetails, setleaveDetails] = useState(leaveDetailsStruct);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (isModalVisible, leaveDetails = leaveDetailsStruct) => {
        setleaveDetails(leaveDetails);
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
                    text='Leaves Filed'
                    isCaterer={true}
                    handleRefresh={refresh}
                />
            </View>
            <View style={styles.body}> 
                <CardDetailsModal
                    toggleModal={toggleModal}
                    isModalVisible={isModalVisible}
                    details={leaveDetails}
                    isCaterer={true}
                />
                {leaveApplications.length ? leaveApplications.map(leave => (
                    <Card
                       key={leave.id}
                       title={leave.title}
                       date={leave.date}
                       id={leave.id}
                       active={leave.active}
                       status={leave.status}
                       onPress={() => toggleModal(true, leave)}
                   />
                )) : <EmptyList text='No leaves filed'/>}
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
