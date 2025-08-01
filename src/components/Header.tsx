import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  setHistoryVisible: (visible: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setHistoryVisible }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Location Picker</Text>
      <TouchableOpacity onPress={() => setHistoryVisible(true)} style={styles.historyButton}>
        <Text style={styles.buttonText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  historyButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Header;
