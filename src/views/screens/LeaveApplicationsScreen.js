import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useQuery, useQueryClient} from 'react-query';
import Card from '../components/Card';
import CardDetailsModal from '../components/CardDetailsModal';
import {AuthContext} from '../../context/authContext';
import EmptyList from '../components/EmptyList';
import PageTitle from '../components/PageTitle';
import Preloader from '../components/Preloader';
import Error from '../components/Error';
import {LEAVE_FETCH, LEAVE_APPROVE} from '../../constants/urls';

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

const approveLeave = async (key, id) => {
  const res = await fetch(LEAVE_APPROVE + id + '/', {
    method: 'PATCH',
    body: JSON.stringify({is_approved: true}),
    headers: {
      Authorization: 'Token ' + key,
      'Content-Type': 'application/json',
    },
  });

  console.log(res);
};

export default function LeaveApplicationsScreen({navigation}) {
  const queryClient = useQueryClient();
  const {authData} = useContext(AuthContext);
  const {data: leaves, status} = useQuery('leaves', () =>
    fetchLeaves(authData.key),
  );

  const leaveDetailsStruct = {
    id: 0,
    name: '',
    date: '',
    title: '',
    body: '',
    status: '',
    active: false,
  };

  const [leaveDetails, setleaveDetails] = useState(leaveDetailsStruct);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (isModalVisible, leaveDetails = leaveDetailsStruct) => {
    setleaveDetails(leaveDetails);
    setModalVisible(isModalVisible);
  };

  const handleLeaveApprove = async (id) => {
    try {
      await approveLeave(authData.key, id); // use the useMutation hook
      queryClient.invalidateQueries('leaves');
      toggleModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  const refresh = async () => {
    queryClient.invalidateQueries('leaves');
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
        </View>
        <PageTitle
          text="Leaves Filed"
          isCaterer={true}
          handleRefresh={refresh}
        />
      </View>
      <View style={styles.body}>
        <CardDetailsModal
          toggleModal={toggleModal}
          isModalVisible={isModalVisible}
          handlePress={handleLeaveApprove}
          details={leaveDetails}
          isCaterer={true}
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
                title={'Leave Request'}
                date={leave.applied_date}
                id={leave.id}
                active={!leave.is_approved}
                onPress={() => toggleModal(true, leave)}
              />
            ))
          ) : (
            <EmptyList text="No leaves filed" />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  labelText: {
    color: '#aaa',
  },
  body: {
    flex: 1,
    paddingTop: 30,
  },
});
