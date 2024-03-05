import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import SleepModelButton from '../../components/SleepModelButton';
import { loadSleepModelButtons } from '../../services/StorageHandler';

export default function Page() {
    const [sleepModelButtons, setSleepModelButtons] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const buttons = await loadSleepModelButtons();
            if (buttons) {
                setSleepModelButtons(buttons);
            }
        };

        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Schedules</Text>
            <FlatList
                data={sleepModelButtons}
                renderItem={({ item }) => <SleepModelButton name={item.name} segments={item.segments} />}
                keyExtractor={(item) => item.name}
                numColumns={3}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
    list: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 16
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        margin: 10
    }
});
