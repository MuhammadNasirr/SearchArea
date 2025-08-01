import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

const DetailsCard = ({ details, onClose }: { details: any; onClose: () => void }) => {
  const slideAnim = useRef(new Animated.Value(500)).current; // Start offscreen (300px down)

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to visible
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 18, color: '#333' }}>Close</Text>
      </TouchableOpacity>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{details?.name}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{details?.formatted_address}</Text>

        <Text style={styles.label}>Latitude:</Text>
        <Text style={styles.value}>{details?.geometry?.location?.lat}</Text>

        <Text style={styles.label}>Longitude:</Text>
        <Text style={styles.value}>{details?.geometry?.location?.lng}</Text>

        <Text style={styles.label}>Place ID:</Text>
        <Text style={styles.value}>{details?.place_id}</Text>

        {details?.types && (
          <>
            <Text style={styles.label}>Types:</Text>
            <Text style={styles.value}>{details?.types.join(', ')}</Text>
          </>
        )}
      </ScrollView>
    </Animated.View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 10,
    maxHeight: '50%',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  content: {
    paddingHorizontal: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    color: '#444',
  },
  value: {
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
  },
});
