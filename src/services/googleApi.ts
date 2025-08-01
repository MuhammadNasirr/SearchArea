import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlaceDetails } from "../utils/location";

  export const savePlaceToHistory = async (place: PlaceDetails) => {
    try {
      const existing = await AsyncStorage.getItem('place_history');
      const parsed = existing ? JSON.parse(existing) : [];

      const filtered = parsed.filter((p: PlaceDetails) => p.place_id !== place.place_id);
      const updated = [place, ...filtered];

      await AsyncStorage.setItem('place_history', JSON.stringify(updated));
    } catch (error) {
      console.error('Saving history error:', error);
    }
  };