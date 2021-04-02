import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {logoImage} from '../../constants/images';
import RazorpayCheckout from 'react-native-razorpay';
import PageTitle from '../components/PageTitle';
import {useQuery, useQueryClient} from 'react-query';
import Preloader from '../components/Preloader';
import EmptyList from '../components/EmptyList';
import Error from '../components/Error';
import {AuthContext} from '../../context/authContext';
import {BILL_FETCH, BILL_REQUEST, BILL_CONFIRM} from '../../constants/urls';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const fetchBills = async (key) => {
  const res = await fetch(BILL_FETCH, {
    headers: {
      Authorization: 'Token ' + key,
    },
  });
  return res.json();
};

const payBill = async (authData, id) => {
  try {
    const res = await fetch(BILL_REQUEST, {
      method: 'POST',
      body: JSON.stringify({id}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token ' + authData.key,
      },
    });

    if (res.status == 500) {
      console.log('Some error occured at the server, please retry.');
      return;
    }

    if (res.status == 200) {
      const res_json = await res.json();
      var order_id = res_json.order_id;
    } else {
      console.log('Some error occured, please retry.');
      return;
    }
  } catch (error) {
    console.log('Some error occured while requesting payment, please retry.');
  }

  var options = {
    description: 'Payment for bill',
    image: {logoImage}, //FIXME: Image not displaying, but http links work.
    key: 'rzp_test_MtjornKoJ2KiHj', // Test Merchant ID
    name: 'IIITG Mess',
    order_id: order_id,
    prefill: {
      email: authData.email,
      name: authData.name,
    },
    theme: {color: 'blue'},
  };
  RazorpayCheckout.open(options)
    .then(async (data) => {
      // handle success
      //alert(`Success: ${data.razorpay_payment_id} | ${data.razorpay_signature}`);

      let postData = {};
      postData.payment_id = data.razorpay_payment_id;
      postData.signature = data.razorpay_signature;

      try {
        const res = await fetch(BILL_CONFIRM, {
          method: 'POST',
          body: JSON.stringify(postData),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token ' + authData.key,
          },
        });

        if (res.status == 500) {
          console.log('Some error occured, please retry.');
          return;
        }

        if (res.status == 200) {
          const res_json = await res.json();
          console.log(res_json);
          if (res_json.success == 1) {
            alert('Success: Payment completed succesfully!'); //TODO: Do some UI magic
            //TODO: Refresh coupons here
          } else if (res_json.success == 0) {
            alert('Failure: Payment did not completed succesfully!'); //TODO: Do some UI magic
          } else {
            alert('Failure: Payment did not completed succesfully!'); //TODO: Do some UI magic
            console.log(
              'Invalid success message. Contact the idiot. He messed up the server. Again.',
            );
          }
        }
      } catch (error) {
        console.log('Some error occured, please retry.');
      }
    })
    .catch((error) => {
      // handle failure
      if (error.code == 0) {
        alert('Payment cancelled!');
      } else {
        alert(`Error: ${error.code} | ${error.description}`);
      }
    });
};

const items = [
  {
    billId: 1,
    title: 'April 2021',
    billDate: 'April 2021',
    billAmount: 3000,
    billStatus: 'Paid',
  },
  {
    billId: 2,
    title: 'May 2021',
    billDate: 'May 2021',
    billAmount: 3000,
    billStatus: 'Paid',
  },
  {
    billId: 3,
    title: 'June 2021',
    billDate: 'June 2021',
    billAmount: 3000,
    billStatus: 'Paid',
  },
];

const ListHeader = ({text}) => {
  return (
    <View style={styles.listHeaderContainer}>
      <Text style={styles.listHeaderText}>{text}</Text>
    </View>
  );
};

const ListItem = ({billDetails, toggleModal}) => (
  <TouchableOpacity onPress={() => toggleModal(true, billDetails)}>
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemTitle}>
        {monthNames[billDetails.month] + ' ' + billDetails.year}
      </Text>
      {!billDetails.is_paid && (
        <Icon
          name="chevron-right"
          size={15}
          backgroundColor="white"
          color="black"
        />
      )}
    </View>
  </TouchableOpacity>
);

const ListItemModal = ({
  billDetails,
  toggleModal,
  isModalVisible,
  auth,
  refresh,
}) => {
  const {
    buyer,
    is_paid: billStatus,
    bill_from: billDate,
    bill_days,
    bill_amount: billAmount,
    id: billId,
  } = billDetails;

  const pay = async () => {
    await payBill(auth, billId);
    refresh();
    toggleModal(false);
  };
  return (
    <Modal
      onBackdropPress={() => toggleModal(false)}
      onBackButtonPress={() => toggleModal(false)}
      useNativeDriver
      animationIn="slideInUp"
      hasBackdrop={true}
      backdropOpacity={0.8}
      statusBarTranslucent
      backdropColor={'rgba(0, 0, 0, 0.8)'}
      animationOut="slideOutDown"
      isVisible={isModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeaderContainer}>
          <Text style={styles.modalHeaderText}>#{billId + ''}</Text>
          <View style={[styles.statusContainer, billStatus && styles.active]}>
            <Text style={styles.statusText}>
              {billStatus ? 'Paid' : 'Not Paid'}
            </Text>
          </View>
        </View>
        <View style={styles.modalBodyContainer}>
          <Text style={styles.labelText}>Bill Details</Text>
          <View style={styles.billDetails}>
            <Icon name="user-alt" size={20} />
            <Text style={styles.billDetailsText}>{buyer}</Text>
          </View>
          <View style={styles.billDetails}>
            <Icon name="calendar-alt" size={20} />
            <Text
              style={
                styles.billDetailsText
              }>{`${billDate} (${bill_days} Days)`}</Text>
          </View>
          <View style={styles.billDetails}>
            <Icon name="rupee-sign" size={20} />
            <Text style={styles.billDetailsText}>{billAmount + ''}</Text>
          </View>
          {!billStatus && (
            <Pressable
              onPress={pay}
              style={({pressed}) => [
                !pressed && styles.shadow,
                pressed && {opacity: 0.8},
                styles.button,
                styles.resolve,
              ]}>
              <Text style={styles.buttonText}>PAY NOW</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default function BillScreen({navigation}) {
  const queryClient = useQueryClient();
  const {authData} = useContext(AuthContext);
  const {data: bills, status} = useQuery('bills', () =>
    fetchBills(authData.key),
  );

  const billDetailsStruct = {
    title: 'June 2021',
    billId: '',
    billDate: '',
    billAmount: 0,
    billStatus: 'Unpaid',
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [billDetails, setBillDetails] = useState(billDetailsStruct);

  const toggleModal = (modalVisible, bill = billDetails) => {
    setBillDetails(bill);
    setModalVisible(modalVisible);
  };

  const refresh = () => {
    queryClient.invalidateQueries('bills');
  };

  const renderItem = ({item}) => (
    <ListItem toggleModal={toggleModal} billDetails={item} />
  );

  return (
    <View style={styles.container}>
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
        <PageTitle text="Your Bill History" handleRefresh={refresh} />
      </View>
      <View style={styles.body}>
        <ListItemModal
          toggleModal={toggleModal}
          isModalVisible={isModalVisible}
          billDetails={billDetails}
          auth={authData}
          refresh={refresh}
        />
        {status == 'loading' && <Preloader />}
        {status == 'error' && <Error />}
        {status == 'success' &&
          (bills.length ? (
            <>
              <ListHeader text="Pending Bills" />
              <FlatList
                data={bills.filter((bill) => !bill.is_paid)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
              <ListHeader text="Bill History" />
              <FlatList
                data={bills.filter((bill) => bill.is_paid)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </>
          ) : (
            <EmptyList text="No Bills Yet" />
          ))}
      </View>
      <Text />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  body: {
    paddingTop: 40,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#efefef',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#cdcdcd',
  },
  listHeaderText: {
    color: '#333',
    fontSize: 14,
  },
  listItemContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    maxHeight: 250,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },
  statusContainer: {
    backgroundColor: '#0099DB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  labelText: {
    color: '#aaa',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  active: {
    backgroundColor: '#F98B26',
  },
  modalBodyContainer: {
    paddingTop: 20,
    flex: 1,
  },
  billDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  billDetailsText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  resolve: {
    backgroundColor: '#368039',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
