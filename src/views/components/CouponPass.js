import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import dimensions from '../../constants/dimensions';

export default function CouponPass({
  isCoupon = false,
  onPress,
  buyer,
  is_spent = false,
  timestamp,
}) {
  return (
    <Pressable
      android_ripple
      onPress={onPress}
      style={({pressed}) => [
        // styles.button,
        styles.container,
        !pressed && styles.shadow,
        pressed && {opacity: 0.5},
      ]}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{padding: 10, borderRadius: 5}}
        >
        <View style={styles.head}>
          <Text style={styles.text}>{buyer}</Text>
          <Text style={styles.text}>{new Date(timestamp).toString().substring(0, 10)}</Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.title}>
            {isCoupon ? 'Coupon' : 'Food Pass'}
          </Text>
        </View>
        <View style={styles.foot}>
          <View style={[styles.status, is_spent && styles.is_spent]}>
            <Text style={styles.statusText}>{is_spent ? 'Spent' : 'Available'}</Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#222',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: dimensions.WIDTH - 20,
  },
  container: {
    // padding: 15,
    // flex: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  head: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  middle: {
    flex: 2,
  },
  foot: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 3
  },
  statusText: {
    color: 'white'
  },  
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#dedede',
    fontWeight: 'bold',
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: 20,
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
  is_spent: {
    backgroundColor: 'red'
  }
});
