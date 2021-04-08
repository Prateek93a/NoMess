import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useQuery, useQueryClient} from 'react-query';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import {PieChart} from 'react-native-chart-kit';
import PageTitle from '../components/PageTitle';
import {AuthContext} from '../../context/authContext';
import {BILL_FETCH, BILL_REPORT} from '../../constants/urls';
import Preloader from '../components/Preloader';
import EmptyList from '../components/EmptyList';
import Error from '../components/Error';
import MainButton from '../components/MainButton';

const screenWidth = Dimensions.get('window').width;

const downloadFile = async (setLoading, key) => {
  setLoading(true);
  try {
    const downloadResumable = FileSystem.createDownloadResumable(
      BILL_REPORT, // insert url here
      FileSystem.documentDirectory + 'report.csv',
      {headers: {Authorization: 'Token ' + key}},
    );
    const response = await downloadResumable.downloadAsync();

    const res = await saveFileAsync(response.uri);
    if (res) {
      Alert.alert('File saved');
    } else {
      Alert.alert('Could not save file');
    }
  } catch (e) {
    console.error(e);
  }
  setLoading(false);
};

const saveFileAsync = async (file_uri) => {
  try {
    const {status, permissions} = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY,
    );
    if (
      status === 'granted' &&
      permissions.mediaLibrary.accessPrivileges !== 'limited'
    ) {
      const asset = await MediaLibrary.createAssetAsync(file_uri);
      const album = await MediaLibrary.getAlbumAsync('Documents');
      if (album === null) {
        await MediaLibrary.createAlbumAsync('Documents', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], 'Documents', false);
      }
      return true;
    }
    return false;
  } catch (error) {
    console.log('ERR: saveFileAsync', error);
    return false;
  }
};

const getData = (bills) => {
  return [
    {
      name: 'Bills Paid',
      number: bills.filter((bill) => bill.is_paid).length,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Bills Not Paid',
      number: bills.filter((bill) => !bill.is_paid).length,
      color: 'orange',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const fetchBillStat = async (key) => {
  const res = await fetch(BILL_FETCH, {
    headers: {
      Authorization: 'Token ' + key,
    },
  });
  return res.json();
};

const ListItem = ({titleLeft, titleRight}) => (
  <View style={styles.listItemContainer}>
    <Text style={styles.listItemTitle}>{titleLeft}</Text>
    <Text style={styles.listItemTitle}>{titleRight + ''}</Text>
  </View>
);

export default function BillStatScreen({navigation}) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const {authData} = useContext(AuthContext);
  const {data: bills, status} = useQuery('bills', () =>
    fetchBillStat(authData.key),
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
        <PageTitle text="Bill Stats" showRefresh={false} />
      </View>
      <View style={styles.body}>
        {status == 'loading' && <Preloader />}
        {status == 'error' && <Error />}
        {status == 'success' &&
          (bills.length ? (
            <>
              <PieChart
                data={getData(bills)}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={'number'}
                backgroundColor={'transparent'}
                paddingLeft={5}
                avoidFalseZero
              />
              <ListItem
                titleLeft="Total Bills Generated"
                titleRight={bills.length}
              />
              <ListItem
                titleLeft="Total Amount Received"
                titleRight={
                  'Rs ' +
                  bills
                    .map((bill) => bill.bill_amount)
                    .reduce((acc, item) => Number(acc) + Number(item))
                }
              />
              <View style={styles.buttonContainer}>
                <MainButton
                  onPress={() => downloadFile(setLoading, authData.key)}
                  title="Generate Student Report"
                  loading={loading}
                />
              </View>
            </>
          ) : (
            <EmptyList text="No Bills Generated" />
          ))}
      </View>
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
    flex: 1,
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
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
});
