// code taken from https://docs.expo.io/versions/latest/sdk/bar-code-scanner/
import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {AuthContext} from '../../context/authContext';
import {COUPON_VERIFY} from '../../constants/urls';

const checkCode = async (data, key) => {
  try {
    const res = await fetch(COUPON_VERIFY + data, {
      method: 'GET',
      headers: {
        Authorization: 'Token ' + key,
      },
    });
    const res_json = await res.json();
    return res_json.is_valid;
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
    let isValid;
    if (type === 'qr') {
      isValid = await checkCode(data, authData.key);
    } else {
      isValid = false;
    }
    setScanned(true);
    Alert.alert(
      isValid ? 'This QR Code is valid' : 'This QR Code is not valid',
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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
