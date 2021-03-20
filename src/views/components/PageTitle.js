import React, {useState} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function PageTitle({text, handleRefresh}) {
    const [refreshing, setRefreshing] = useState(false);

    const handlePress = async() => {
        setRefreshing(true);
        await handleRefresh();
        setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            <Text 
            numberOfLines={2} 
            ellipsizeMode='tail'
            style={styles.headerText}>
                {text}
            </Text>
            <View style={styles.refreshIcon}>
                    {refreshing ? (
                    <ActivityIndicator 
                        size={20} 
                        color='black'/>) : (
                    <Icon.Button 
                        onPress={handlePress} 
                        name='sync-alt' 
                        size={20} 
                        backgroundColor='white' 
                        color='black'/>)
                    }
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal: 10
    },
    headerText: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    refreshIcon: {
        justifyContent: 'flex-start',
        alignItems:'center', 
        flex: 1, 
        flexDirection:'row-reverse'
    }
});