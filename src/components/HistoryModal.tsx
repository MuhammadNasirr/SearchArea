import React, { useEffect, useState } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlaceDetails } from '../utils/location';

const HistoryModal = ({ visible, onClose, onSelect }: any) => {
    const [history, setHistory] = useState<PlaceDetails[]>([]);

    useEffect(() => {
        if (visible) loadHistory();
    }, [visible]);

    const loadHistory = async () => {
        const raw = await AsyncStorage.getItem('place_history');
        setHistory(raw ? JSON.parse(raw) : []);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity onPress={onClose} style={{ padding: 20, alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 18, color: '#333' }}>Close</Text>
            </TouchableOpacity>
            <Modal visible={visible} animationType="slide">
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}><Text>Close</Text></TouchableOpacity>
                    <FlatList
                        data={history}
                        keyExtractor={(item) => item.place_id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => { onSelect(item); onClose(); }}>
                                <Text style={styles.item}>{item.name} - {item.formatted_address}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
    closeBtn: { alignSelf: 'flex-end', marginBottom: 10 },
    item: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
});

export default HistoryModal;
