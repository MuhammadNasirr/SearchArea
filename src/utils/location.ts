
export interface PlacePrediction {
  place_id: string;
  description: string;
}

export interface PlaceDetails {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_address: string;
  name: string;
  place_id: string;
}