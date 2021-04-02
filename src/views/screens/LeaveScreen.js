import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useQuery, useQueryClient} from 'react-query';
import Card from '../components/Card';
import CardDetailsModal from '../components/CardDetailsModal';
import PageTitle from '../components/PageTitle';
import EmptyList from '../components/EmptyList';
import LeaveInputModal from '../components/LeaveInputModal';
import {AuthContext} from '../../context/authContext';
import Preloader from '../components/Preloader';
import Error from '../components/Error';
import {LEAVE_FETCH, LEAVE_POST} from '../../constants/urls';

const leaveApplications = [
  {
    id: 0,
    name: 'Sam Wilson',
    date: 'July 2021',
    title: 'Leave Application',
    body: 'Going out of station.',
    status: 'Resolved',
    active: false,
  },
  {
    id: 1,
    name: 'Jack Kirby',
    date: 'August 2021',
    body: 'Going out of station.',
    title: 'Leave Application',
    status: '',
    active: true,
  },
];

const fetchLeaves = async (key) => {
  const res = await fetch(LEAVE_FETCH, {
    headers: {
      Authorization: 'Token ' + key,
    },
  });
  return res.json();
};

const postLeave = async (key, body) => {
  await fetch(LEAVE_POST, {
    method: 'POST',
    body: body,
    headers: {
      Authorization: 'Token ' + key,
      'Content-Type': 'application/json',
    },
  });
};

export default function LeaveScreen({navigation}) {
  const queryClient = useQueryClient();
  const {authData} = useContext(AuthContext);
  const {data: leaves, status} = useQuery('leaves', () =>
    fetchLeaves(authData.key),
  );

  const leaveDetailsStruct = {
    id: 0,
    title: '',
    name: '',
    date: '',
    body: '',
    status: '',
    active: false,
  };

  const [leaveDetails, setLeaveDetails] = useState(leaveDetailsStruct);
  const [isLeaveModalVisible, setLeaveModalVisible] = useState(false);
  const [isInputModalVisible, setInputModalVisible] = useState(false);

  const toggleLeaveModal = (
    isModalVisible,
    leaveDetails = leaveDetailsStruct,
  ) => {
    setLeaveDetails(leaveDetails);
    setLeaveModalVisible(isModalVisible);
  };

  const toggleInputModal = (isModalVisible) => {
    setInputModalVisible(isModalVisible);
  };

  const handleLeaveSubmit = async (reasonText, startDate, endDate) => {
    const body = {
      body: reasonText,
      commencement_date: startDate.toISOString().substring(0, 10),
      end_date: endDate.toISOString().substring(0, 10),
    };
    try {
      await postLeave(authData.key, JSON.stringify(body));
    } catch (e) {
      console.log(e);
    }

    queryClient.invalidateQueries('leaves');
  };

  const refresh = async () => {
    //setRefreshing(true);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <Icon.Button
            onPress={navigation.goBack}
            name="arrow-left"
            size={20}
            backgroundColor="white"
            color="black"
          />
          <Icon.Button
            onPress={() => toggleInputModal(true)}
            name="plus"
            size={20}
            backgroundColor="white"
            color="black"
          />
        </View>
        <PageTitle text="Your Leave Requests" handleRefresh={refresh} />
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
          isComplain={false}
        />
        {status == 'loading' && <Preloader />}
        {status == 'error' && <Error />}
        {status == 'success' &&
          (leaves.length ? (
            leaves.map((leave) => (
              <Card
                name={leave.user_name}
                key={leave.id}
                title={'Leave Application'}
                date={leave.applied_date}
                id={leave.id}
                active={!leave.is_approved}
                onPress={() => toggleLeaveModal(true, leave)}
              />
            ))
          ) : (
            <EmptyList text="No Applications Submitted" />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 3,
    backgroundColor: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  body: {
    flex: 1,
    paddingTop: 30,
  },
});
