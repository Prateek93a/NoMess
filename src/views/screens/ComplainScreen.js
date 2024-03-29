import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../../context/authContext';
import Card from '../components/Card';
import CardDetailsModal from '../components/CardDetailsModal';
import ComplaintsInputModal from '../components/ComplaintsInputModal';
import EmptyList from '../components/EmptyList';
import Error from '../components/Error';
import PageTitle from '../components/PageTitle';
import Preloader from '../components/Preloader';
import {COMPLAINT_FETCH, COMPLAINT_POST} from '../../constants/urls';

// todo: merge ComplaintApplicationsScreen and ComplaintScreen into single screen

//const complaints = [{id: 0, name: 'Sam Wilson', date: 'July 2021',
//                     title: 'Unhygeinic Food', body: 'Found an insect in the food.',
//                     status: 'Resolved', active: false},
//                    {id: 1, name: 'Jack Kirby', date: 'August 2021',
//                     title: 'Bad Oil', body: 'Reusing same oil over and over again.',
//                     status: '', active: true}];

const fetchComplaints = async (key) => {
  const res = await fetch(COMPLAINT_FETCH, {
    headers: {
      Authorization: 'Token ' + key,
    },
  });
  return res.json();
};

const postComplaint = async (key, body) => {
  console.log(body);
  await fetch(COMPLAINT_POST, {
    method: 'POST',
    body: body,
    headers: {
      Authorization: 'Token ' + key,
      'Content-Type': 'application/json',
    },
  });
};

export default function ComplainScreen({navigation}) {
  const queryClient = useQueryClient();
  const {authData} = useContext(AuthContext);
  const {data: complaints, status} = useQuery('complaints', () =>
    fetchComplaints(authData.key),
  );

  const complaintDetailsStruct = {
    id: 0,
    name: '',
    date: '',
    title: '',
    body: '',
    status: '',
    active: false,
  };

  const [complaintDetails, setComplaintDetails] = useState(
    complaintDetailsStruct,
  );
  const [isComplaintModalVisible, setComplaintModalVisible] = useState(false);
  const [isInputModalVisible, setInputModalVisible] = useState(false);

  const toggleComplaintsModal = (
    isModalVisible,
    complaintDetails = complaintDetailsStruct,
  ) => {
    setComplaintDetails(complaintDetails);
    setComplaintModalVisible(isModalVisible);
  };

  const toggleInputModal = (isModalVisible) => {
    setInputModalVisible(isModalVisible);
  };

  const handleComplaintSubmit = async (title, body) => {
    try {
      await postComplaint(authData.key, JSON.stringify({title, body}));
      queryClient.invalidateQueries('complaints');
    } catch (e) {
      console.log(e);
    }
  };

  const refresh = async () => {
    queryClient.invalidateQueries('complaints');
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
          <ComplaintsInputModal
            toggleModal={toggleInputModal}
            isModalVisible={isInputModalVisible}
            handleSubmit={handleComplaintSubmit}
          />
        </View>
        <PageTitle text="Your Complaints" handleRefresh={refresh} />
      </View>
      <View style={styles.body}>
        <CardDetailsModal
          toggleModal={toggleComplaintsModal}
          isModalVisible={isComplaintModalVisible}
          details={complaintDetails}
          isComplaint={true}
        />
        {status == 'loading' && <Preloader />}
        {status == 'success' &&
          (complaints.length ? (
            complaints.map((complaint) => (
              <Card
                name={complaint.user_name}
                isComplaint={true}
                key={complaint.id}
                title={complaint.title}
                date={complaint.applied_date}
                id={complaint.id}
                active={!complaint.resolved}
                onPress={() => toggleComplaintsModal(true, complaint)}
              />
            ))
          ) : (
            <EmptyList text="No complaints filed" />
          ))}
        {status == 'error' && <Error />}
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
  body: {
    flex: 1,
    paddingTop: 30,
  },
});
