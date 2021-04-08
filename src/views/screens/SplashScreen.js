import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {splashImage} from '../../constants/images';

export default function SplashScreen() {
  return (
    <>
      <StatusBar backgroundColor="#FCF6D7" barStyle="dark-content" />
      <View style={styles.container}>
        <Image style={styles.img} source={splashImage} />
        <ActivityIndicator
          style={styles.indicator}
          color="#cdcdcd"
          size="large"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCF6D7',
  },
  img: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  indicator: {
    position: 'absolute',
    bottom: 150,
  },
});
