// code taken from https://docs.expo.io/versions/latest/sdk/bar-code-scanner/
import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {AuthContext} from '../../context/authContext';
import {COUPON_VERIFY} from '../../constants/urls';

const checkCode = async (data, key) => {
  try {
    const res = await fetch(COUPON_VERIFY + data + '/', {
      method: 'GET',
      headers: {
        Authorization: 'Token ' + key,
      },
    });
    const res_json = await res.json();
    console.log(res_json);
    return res_json.success;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default function QRReaderScreen() {
  const {authData} = useContext(AuthContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({type, data}) => {
    setScanned(false);
    let isValid;
    isValid = await checkCode(data, authData.key);
    console.log(isValid);
    // if (type === 'qr') {
    //   isValid = await checkCode(data, authData.key);
    // } else {
    //   isValid = false;
    // }
    Alert.alert(
      '',
      isValid
        ? 'This QR Code is valid'
        : 'This QR Code is not valid or has been used',
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Button title={'Scan QR Code'} onPress={() => setScanned(true)} />
      <Modal
        onBackdropPress={() => setScanned(false)}
        onBackButtonPress={() => setScanned(false)}
        useNativeDriver
        animationIn="slideInUp"
        hasBackdrop={true}
        backdropOpacity={0.8}
        statusBarTranslucent
        backdropColor={'rgba(0, 0, 0, 0.8)'}
        animationOut="slideOutDown"
        isVisible={scanned}>
        <BarCodeScanner
          onBarCodeScanned={scanned && handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </Modal>
      {/* {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
