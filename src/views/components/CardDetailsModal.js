import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {avatarImage} from '../../constants/images';

export default function CardDetailsModal({
  details,
  toggleModal,
  isModalVisible,
  isCaterer = false,
  handlePress = null,
  isComplaint = false,
}) {
  const {
    user_name: name,
    applied_date: date,
    id,
    title,
    body,
    is_approved: active,
  } = details;
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
      <View style={styles.container}>
        <View style={styles.topTextContainer}>
          <View style={styles.user}>
            <View style={styles.imgBackground}>
              <Image source={avatarImage} style={styles.img} />
            </View>
            <View>
              <Text style={styles.subText}>{name}</Text>
              <View style={styles.dateContainer}>
                <Icon
                  name="calendar-alt"
                  size={20}
                  style={[styles.subText, {marginRight: 5}]}
                />
                <Text style={styles.subText}>
                  {new Date(date).toString().substring(0, 10)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.right}>
            <Text style={styles.subText}>#{id}</Text>
            <View style={[styles.statusContainer, active && styles.active]}>
              <Text style={styles.statusText}>
                {active ? 'Pending' : isComplaint ? 'Resolved' : 'Approved'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.titleText}>
            {title}
          </Text>
        </View>
        <ScrollView style={styles.bodyContainer}>
          <Text style={styles.bodyText}>{body}</Text>
        </ScrollView>
        {isCaterer && (
          <View style={styles.buttonContainer}>
            {isComplaint ? (
              <Pressable
                disabled={!active}
                onPress={() => handlePress(id)}
                style={({pressed}) => [
                  !pressed && active && styles.shadow,
                  pressed && active && {opacity: 0.8},
                  styles.button,
                  active ? styles.resolve : styles.disabled,
                ]}>
                <Text style={styles.buttonText}>MARK AS RESOLVED</Text>
              </Pressable>
            ) : (
              <Pressable
                disabled={!active}
                onPress={() => handlePress(id)}
                style={({pressed}) => [
                  !pressed && active && styles.shadow,
                  pressed && active && {opacity: 0.8},
                  styles.button,
                  active ? styles.resolve : styles.disabled,
                ]}>
                <Text style={styles.buttonText}>MARK AS APPROVED</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    height: 450,
    borderRadius: 10,
  },
  topTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgBackground: {
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  right: {
    alignItems: 'flex-end',
  },
  img: {
    resizeMode: 'cover',
    borderRadius: 25,
    height: '100%',
    width: '100%',
  },
  subText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  labelText: {
    color: '#aaa',
  },
  text: {
    color: '#333',
    fontSize: 23,
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  bottomTextContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusContainer: {
    backgroundColor: '#0099DB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginTop: 10,
  },
  active: {
    backgroundColor: '#F98B26',
  },
  titleContainer: {
    paddingTop: 30,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bodyContainer: {
    maxHeight: 240,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  bodyText: {
    fontSize: 18,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  reject: {
    backgroundColor: '#a72323',
    borderColor: '#a72323',
    borderWidth: 2,
  },
  accept: {
    borderColor: '#368039',
    borderWidth: 2,
    color: '#368039',
    backgroundColor: 'white',
  },
  disabled: {
    backgroundColor: '#ddd',
  },
  resolve: {
    backgroundColor: '#0099DB',
  },
});
