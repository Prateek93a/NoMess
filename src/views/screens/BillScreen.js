import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PageTitle from '../components/PageTitle';

const items = [{billId: 1, title: 'April 2021', billDate: 'April 2021', billAmount: 3000, billStatus: 'Paid'}, 
               {billId: 2, title: 'May 2021', billDate: 'May 2021', billAmount: 3000, billStatus: 'Paid'},
               {billId: 3, title: 'June 2021', billDate: 'June 2021', billAmount: 3000, billStatus: 'Paid'}];


const ListHeader = ({text}) => {
    return (<View style={styles.listHeaderContainer}>
        <Text style={styles.listHeaderText}>{text}</Text>
    </View>);
}
            

const ListItem = ({ billDetails, toggleModal }) => (
    <TouchableOpacity
    onPress={() => toggleModal(true, billDetails)}>
        <View style={styles.listItemContainer}>
            <Text style={styles.listItemTitle}>{billDetails.title}</Text>
            <Icon  
                name='chevron-right'
                size={15}
                backgroundColor='white'
                color='black'/>
        </View>
    </TouchableOpacity>
);

const ListItemModal = ({billDetails, toggleModal, isModalVisible}) => {
    const {billId, billDate, billAmount, billStatus} = billDetails;
    return (
    <Modal 
    onBackdropPress={() => toggleModal(false)}
    onBackButtonPress={() => toggleModal(false)}
    useNativeDriver
    animationIn='slideInUp'
    hasBackdrop={true}
    backdropOpacity={0.8}
    statusBarTranslucent
    backdropColor={'rgba(0, 0, 0, 0.8)'}
    animationOut='slideOutDown'
    isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
                <Text style={styles.modalHeaderText}>
                    #{billId}
                </Text>
                <View style={[styles.statusContainer, billStatus != 'Paid' && styles.active]}>
                        <Text style={styles.statusText}>
                            {billStatus != 'Paid' ? 'Not Paid' : billStatus}
                        </Text>
                </View>
            </View>
            <View style={styles.modalBodyContainer}>
                <Text style={styles.labelText}>Bill Details</Text>
                <View style={styles.billDetails}>
                    <Icon
                    name='calendar-alt'
                    size={20}
                    />
                    <Text style={styles.billDetailsText}>
                        {billDate}
                    </Text>
                </View>
                <View style={styles.billDetails}>
                    <Icon
                    name='rupee-sign'
                    size={20}
                    />
                    <Text style={styles.billDetailsText}>
                        {billAmount+''}
                    </Text>
                </View>
            </View>
        </View>
    </Modal>
)};


export default function BillScreen({navigation}) {
    const billDetailsStruct = { title: 'June 2021',
                                billId: '', 
                                billDate: '', 
                                billAmount: 0, 
                                billStatus: 'Unpaid'};

    const [isModalVisible, setModalVisible] = useState(false);
    const [billDetails, setBillDetails] = useState(billDetailsStruct);

    const toggleModal = (modalVisible, bill = billDetails) => {
        setBillDetails(bill);
        setModalVisible(modalVisible);
    };

    const refresh = () => {
        //setRefreshing(true);
    };

    const renderItem = ({ item }) => <ListItem toggleModal={toggleModal} billDetails={item} />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerButtons}>
                    <Icon.Button 
                    onPress={navigation.goBack} 
                    name='arrow-left' size={20} 
                    backgroundColor='white' 
                    color='black'/>
                </View>
                <PageTitle
                    text='Your Bills'
                    handleRefresh={refresh}
                />
            </View>
            <View style={styles.body}>
                <ListItemModal
                    toggleModal={toggleModal}
                    isModalVisible={isModalVisible}
                    billDetails={billDetails}
                />
                <ListHeader text='Pending Bills'/>
                <ListItem toggleModal={toggleModal} billDetails={billDetailsStruct}/>
                <ListHeader text='Bill History'/>
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={item => item.billId}
                />
            </View>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
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
        fontSize: 14
    },
    listItemContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cdcdcd',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    modalContainer: { 
        flex: 1,
        maxHeight: 200,
        backgroundColor:'white', 
        padding: 15,
        borderRadius: 5
    },
    modalHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalHeaderText: {
        fontSize: 18,
        color: '#555',
        fontWeight: 'bold'
    },
    statusContainer: {
        backgroundColor: '#0099DB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 5
    },
    labelText: {
        color: '#aaa'
    },
    statusText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    active:  {
        backgroundColor: '#F98B26'
    },
    modalBodyContainer: {
        paddingTop: 20
    },  
    billDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    billDetailsText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#333'
    }
});
