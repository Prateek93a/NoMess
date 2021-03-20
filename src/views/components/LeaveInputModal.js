import React, {useState} from 'react';
import { View, Text,  Modal, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dimensions from '../../constants/dimensions';

export default function LeaveInputModal({toggleModal, isModalVisible, handleSubmit}) {
    const [reasonText, setReasonText] = useState('');
    const [isStartDateVisible, setStartDateVisible] = useState(false);
    const [isEndDateVisible, setEndDateVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date(Date.now()));
    const [endDate, setEndDate] = useState(new Date(Date.now()));
    const [reasonError, setReasonError] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleStartDate = () => {
        setStartDateVisible(!isStartDateVisible);
    };

    const toggleEndDate = () => {
        setEndDateVisible(!isEndDateVisible);
    };

    const handlePress = async() => {
        let isError = false;
        
        if(!reasonText){
            setReasonError('Please fill this field');
            isError = true;
        }

        if(isError) return;

        setLoading(true);
        await handleSubmit(reasonText, startDate, endDate);

        setLoading(false);
        setReasonText('');
        toggleModal(false);
    }

    return (
        <View>
            <Modal 
                animationType='slide'
                hardwareAccelerated
	            onRequestClose={toggleModal}
                visible={isModalVisible}>
                    <View style={styles.container}>
                        <Text style={styles.labelText}>What is the reason?</Text>
                        <TextInput
                            value={reasonText}
                            onChangeText={setReasonText}
                            numberOfLines={5}
                            multiline
                            textAlignVertical='top'
                            style={styles.input}
                        />
                         <Text style={styles.errorMessage}>{reasonError}</Text>
                          <DateTimePickerModal
                                isVisible={isStartDateVisible}
                                mode="date"
                                onConfirm={(date)=>setStartDate(new Date(date))}
                                onCancel={()=>setStartDateVisible(false)}
                            />
                          <DateTimePickerModal
                                isVisible={isEndDateVisible}
                                mode="date"
                                onConfirm={(date)=>setEndDate(new Date(date))}
                                onCancel={()=>setEndDateVisible(false)}
                            />
                        <Pressable
                            onPress={toggleStartDate}
                            style={({pressed}) => [{opacity: pressed ? 0.8 : 1}]}>
                                <Text style={{color: 'blue'}}>Set Start Data: <Text>{startDate.toLocaleDateString()}</Text></Text>
                        </Pressable>
                        <Pressable
                            onPress={toggleEndDate}
                            style={({pressed}) => [{opacity: pressed ? 0.8 : 1}]}>
                                <Text style={{color: 'blue'}}>Set End Data: <Text>{endDate.toLocaleDateString()}</Text></Text>
                        </Pressable>
                        <Pressable
                            onPress={handlePress}
                            style={({pressed}) => [{opacity: pressed ? 0.8 : 1}, styles.button]}>
                                {loading ? <ActivityIndicator color='white'/> : <Text style={styles.buttonText}>APPLY FOR LEAVE</Text>}
                        </Pressable>
                    </View>
                </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor:'white',
        padding: 10
    },
    labelText: {
        color: '#aaa'
    },
    input: {
        padding: 5, 
        borderRadius: 5, 
        borderWidth: 1, 
        maxHeight: 600, 
        overflow: 'scroll'
    },
    button: {
        backgroundColor: '#222',
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        width: dimensions.WIDTH - 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    errorMessage: {
        color: 'red',
        fontSize: 10
    }
});