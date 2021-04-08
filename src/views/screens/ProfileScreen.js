import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {AuthContext} from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useQuery, useQueryClient} from 'react-query';
import {LOGOUT_URL, BILL_MODE_UPDATE} from '../../constants/urls';
import {profileStudentImage, profileCatererImage} from '../../constants/images';
import categories from '../../constants/categories';
import PageTitle from '../components/PageTitle';
import MainButton from '../components/MainButton';
import ModeSwitch from '../components/ModeSwitch';

export default function ProfileScreen({navigation}) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const {setAuthData, authData} = useContext(AuthContext);
  const {name, email, typeAccount, specialRole, billingMode} = authData;
  const [mode, setMode] = useState(billingMode);

  const setBillingMode = async (updatedMode) => {
    setMode(updatedMode);
    await fetch(BILL_MODE_UPDATE, {
      method: 'PUT',
      body: JSON.stringify({requestedBillingMode: updatedMode}),
      headers: {
        Authorization: 'Bearer ' + authData.key,
        'Content-Type': 'application/json',
      },
    });
  };

  const profileImage =
    typeAccount === categories[1] ? profileCatererImage : profileStudentImage;

  const handleLogout = async () => {
    setLoading(true);
    await fetch(LOGOUT_URL, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + authData.key,
      },
    });
    await AsyncStorage.removeItem('auth-data');
    queryClient.invalidateQueries();
    setLoading(false);
    setAuthData(null);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container}>
      <View style={styles.headerButtons}>
        <Icon.Button
          onPress={navigation.goBack}
          name="arrow-left"
          size={20}
          backgroundColor="white"
          color="black"
        />
      </View>
      <PageTitle text="Your Profile" showRefresh={false} />
      <View style={styles.body}>
        <View style={styles.imgContainer}>
          <View style={styles.imgBackground}>
            <Image source={profileImage} style={styles.img} />
          </View>
        </View>
        <View style={styles.heading}>
          <Text style={styles.headingText}>{name}</Text>
        </View>
        <View style={styles.ticketContainer}>
          <View style={[styles.ticket, {backgroundColor: '#F98B26'}]}>
            <Text style={styles.ticketText}>
              {typeAccount == categories[1]
                ? 'Caterer'
                : typeAccount == categories[0]
                ? 'Student'
                : 'Guest'}
            </Text>
          </View>
          <View style={[styles.ticket, {backgroundColor: 'purple'}]}>
            <Text style={styles.ticketText}>
              {specialRole ? specialRole : 'No Special Role'}
            </Text>
          </View>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.labelText}>Contact Details</Text>
          <View style={styles.contact}>
            <Icon name="inbox" size={20} />
            <Text style={styles.contactText}>{email}</Text>
          </View>
          <View style={styles.contact}>
            <Icon name="phone-alt" size={20} />
            <Text style={styles.contactText}>+91-999-999-1000</Text>
          </View>
          <View style={styles.contact}>
            <Icon name="utensils" size={20} />
            <Text style={styles.contactText}>{billingMode}</Text>
          </View>
        </View>
        {typeAccount != categories[1] && (
          <View style={styles.contactContainer}>
            <Text style={styles.labelText}>Switch Billing Mode</Text>
            {typeAccount == categories[2] ? (
              <Text>Coupon System</Text>
            ) : (
              <ModeSwitch
                firstText="COUPON"
                secondText="MONTHLY"
                currentActive={mode}
                setActive={setMode}
              />
            )}
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <MainButton loading={loading} onPress={handleLogout} title="LOGOUT" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  body: {
    paddingHorizontal: 20,
    flex: 1,
  },
  imgContainer: {
    paddingTop: 30,
    alignItems: 'center',
  },
  imgBackground: {
    borderRadius: 60,
    height: 120,
    width: 120,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    resizeMode: 'cover',
    borderRadius: 60,
    height: '100%',
    width: '100%',
  },
  heading: {
    paddingTop: 20,
    alignItems: 'center',
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ticketContainer: {
    flexDirection: 'row',
    paddingTop: 30,
    justifyContent: 'center',
  },
  ticket: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ticketText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  labelText: {
    color: '#aaa',
  },
  contactContainer: {
    paddingTop: 30,
  },
  contact: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingTop: 12,
  },
  contactText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#555',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 15,
  },
});
