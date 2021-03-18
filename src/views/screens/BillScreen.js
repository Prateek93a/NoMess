import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Icon  name='arrow-right' size={20} backgroundColor='white' color='black'/>
    </View>
);

export default function BillScreen({navigation}) {
    const [refreshing, setRefreshing] = useState(false);
    const refresh = () => {};
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                    <Icon.Button onPress={navigation.openDrawer} name='arrow-left' size={20} backgroundColor='white' color='black'/>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.headerText}>Your Bills</Text>
                <View style={{justifyContent: 'center', alignItems:'center', flex: 1, flexDirection:'row-reverse'}}>
                    {refreshing ? <ActivityIndicator size={20} color='black'/> : <Icon.Button onPress={refresh} name='sync-alt' size={20} backgroundColor='white' color='black'/>}
                </View>
                </View>
            </View>
            <View style={styles.body}>
                <Text style={styles.labelText}>Pending Bill</Text>

                <Text style={styles.labelText}>Bill History</Text>
            {/*<FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />*/}
            </View>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fff'
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 10
    },
    headerText: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    body: {
        paddingTop: 40,
        flex: 1
    },
    labelText: {
        color: '#aaa'
    }
});
