import React, {useState} from 'react';
import { View, Text, Modal, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import dimensions from '../../constants/dimensions';
import MainButton from './MainButton';

export default function ComplaintsInputModal({toggleModal, isModalVisible, handleSubmit}) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [titleError, setTitleError] = useState('');
    const [bodyError, setBodyError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePress = async() => {
        let isError = false;
        
        if(!title){
            setTitleError('Please fill this field');
            isError = true;
        }

        if(!body){
            setBodyError('Please fill this field');
            isError = true;
        }

        if(isError) return;

        setLoading(true);
        await handleSubmit(title, body);

        setLoading(false);
        setTitle('');
        setBody('');
        setTitleError('');
        setBodyError('');
        toggleModal(false);
    }

    return (
            <Modal 
                animationType='slide'
	            onRequestClose={toggleModal}
                hardwareAccelerated
                visible={isModalVisible}>
                    <View style={styles.container}>
                        <Text style={styles.labelText}>What is your complaint?</Text>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder='Provide a title'
                            textAlignVertical='top'
                            style={styles.input}
                        />
                        <Text style={styles.errorMessage}>{titleError}</Text>
                        <TextInput
                            value={body}
                            onChangeText={setBody}
                            numberOfLines={10}
                            placeholder='Describe your issue'
                            multiline
                            textAlignVertical='top'
                            style={[styles.input, styles.inputMultiline]}
                        />
                        <Text style={styles.errorMessage}>{bodyError}</Text>
                        <View style={styles.buttonContainer}>
                            <MainButton
                            loading={loading}
                            onPress={handlePress}
                            title='FILE COMPLAINT'
                            />
                        </View>
                    </View>
            </Modal>
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
        borderWidth: 1
    },
    inputMultiline: {
        maxHeight: 600,
        overflow: 'scroll'
    },
    buttonContainer: {
        paddingTop: 20
    },
    errorMessage: {
        color: 'red',
        fontSize: 10
    }
});