import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { PlaceDetails, PlacePrediction } from '../utils/location';
import { savePlaceToHistory } from '../services/googleApi';


interface Props {
  onPlaceSelect: (place: PlaceDetails) => void;
}

const GOOGLE_API_KEY = 'AIzaSyAb5qGxE7q2Bz5mXbGZZ1V0LRqOikwjBtI'; // 🔐 Replace with your actual key

const CustomPlacesSearch: React.FC<Props> = ({ onPlaceSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<PlacePrediction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(false);

  useEffect(() => {
    if (query.length > 2) {
      const timeoutId = setTimeout(() => {
        searchPlaces(query);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [query]);

  const searchPlaces = async (input: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input
        )}&key=${GOOGLE_API_KEY}&language=en`
      );
      const json = await response.json();
      setResults(json.predictions || []);
    } catch (error) {
      console.error('Autocomplete error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlaceDetails = async (placeId: string): Promise<PlaceDetails | null> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const json = await response.json();
      return json.result as PlaceDetails;
    } catch (error) {
      console.error('Details fetch error:', error);
      return null;
    }
  };

  const handleSelect = async (item: PlacePrediction) => {
    const details = await getPlaceDetails(item.place_id);
    if (details) {
      onPlaceSelect(details);
      setQuery(item.description);
      savePlaceToHistory(details);
      setResults([]);
      setShowList(false);
      // Optionally: dismiss keyboard
      // Import at top: import { Keyboard } from 'react-native';
      Keyboard.dismiss();
    }
  };

  // In onChangeText:
  const onChangeText = (text: string) => {
    setQuery(text);
    setShowList(true);
  }


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for a place"
        value={query}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor="#666"
      />
      {loading && <ActivityIndicator size="small" />}
      {showList && results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.resultItem}>
              <Text style={styles.resultText}>{item.description}</Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  resultItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  resultText: {
    fontSize: 16,
    color: '#000',
  },
});

export default CustomPlacesSearch;
