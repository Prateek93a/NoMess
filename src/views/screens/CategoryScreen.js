import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import dimensions from '../../constants/dimensions';
import {studentImage, chefImage, guestImage} from '../../constants/images';
import categories from '../../constants/categories';
import MainButton from '../components/MainButton';

const slides = [studentImage, chefImage, guestImage];

function Slide(img, key) {
  return (
    <View key={'' + key} style={styles.slideview} collapsable={false}>
      <Image style={styles.img} source={img} />
    </View>
  );
}

export default function CategoryScreen({navigation}) {
  const [page, setPage] = useState(0);

  const handleButtonClick = (page) => {
    navigation.navigate('register', {category: categories[page]});
  };

  const handlePageUpdate = ({nativeEvent}) => {
    setPage(nativeEvent.position);
  };

  return (
    <View style={styles.container}>
      <View style={styles.indicator}>
        <Text style={styles.indicatorText}>You are?</Text>
        <Text
          style={{
            fontSize: 15,
            color: '#555',
            paddingTop: 20,
            paddingHorizontal: 20,
            textAlign: 'center',
          }}>
          Basically, whom do you identify yourself with
        </Text>
      </View>
      <View style={styles.scrollview}>
        <ViewPager
          orientation="horizontal"
          style={styles.onboard}
          initialPage={0}
          showPageIndicator
          onPageSelected={handlePageUpdate}>
          {slides.map((slide, index) => Slide(slide, index + 1))}
        </ViewPager>
      </View>
      <View style={styles.indicator}>
        <View style={styles.dotContainer}>
          <View style={[styles.dotsBase, page == 0 && styles.dotsSelected]} />
          <View style={[styles.dotsBase, page == 1 && styles.dotsSelected]} />
          <View style={[styles.dotsBase, page == 2 && styles.dotsSelected]} />
        </View>
        <View style={styles.buttonContainer}>
          <MainButton
            onPress={() => handleButtonClick(page)}
            title={categories[page]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  onboard: {
    flex: 1,
  },
  slideview: {
    flex: 1,
    alignItems: 'center',
  },
  scrollview: {
    flex: 6,
  },
  indicator: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#111',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    color: '#555',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 20,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
    marginTop: 50,
  },
  dotsBase: {
    borderRadius: 25,
    marginHorizontal: 5,
    height: 5,
    width: 5,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  dotsSelected: {
    backgroundColor: 'orange',
  },
});
