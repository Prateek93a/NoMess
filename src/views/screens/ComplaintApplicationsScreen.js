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
import {COMPLAINT_FETCH, COMPLAINT_RESOLVE} from '../../constants/urls';

const complaints = [
  {
    id: 0,
    name: 'Sam Wilson',
    date: 'July 2021',
    title: 'Unhygeinic Food',
    body: 'Found an insect in the food.',
    status: 'Resolved',
    active: false,
  },
  {
    id: 1,
    name: 'Jack Kirby',
    date: 'August 2021',
    title: 'Bad Oil',
    body: 'Reusing same oil over and over again.',
    status: '',
    active: true,
  },
];

const fetchComplaints = async (key) => {
  const res = await fetch(COMPLAINT_FETCH, {
    headers: {
      Authorization: 'Token ' + key,
    },
  });
  return res.json();
};

const resolveComplaint = async (key, id) => {
  await fetch(COMPLAINT_RESOLVE + id, {
    method: 'PUT',
    headers: {
      Authorization: 'Token ' + key,
    },
  });
};

export default function ComplaintApplicationsScreen({navigation}) {
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
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (
    isVisible,
    complaintDetails = complaintDetailsStruct,
  ) => {
    setComplaintDetails(complaintDetails);
    setModalVisible(isVisible);
  };

  const handleComplaintResolve = async (id) => {
    try {
      await resolveComplaint(authData.key, id); // use the useMutation hook
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
        </View>
        <PageTitle text="Complaints Filed" handleRefresh={refresh} />
      </View>
      <View style={styles.body}>
        <CardDetailsModal
          toggleModal={toggleModal}
          isModalVisible={isModalVisible}
          details={complaintDetails}
          isCaterer={true}
          handlePress={handleComplaintResolve}
          isComplaint={true}
        />
        {status == 'loading' && <Preloader />}
        {status == 'error' && <Error />}
        {status == 'success' && complaints.length ? (
          complaints.map((complaint) => (
            <Card
              name={complaint.user_name}
              isComplaint={true}
              key={complaint.id}
              title={complaint.title}
              date={complaint.applied_date}
              id={complaint.id}
              active={!complaint.resolved}
              onPress={() => toggleModal(true, complaint)}
            />
          ))
        ) : (
          <EmptyList text="No complaints filed" />
        )}
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
