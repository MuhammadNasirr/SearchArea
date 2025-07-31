import React, { useRef, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Platform,
    PermissionsAndroid,
    View,
    Alert,
    ScrollView
} from "react-native";
import MapView, {
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const DEFAULT_REGION: Region = {
    latitude: 24.860966,
    longitude: 66.990501,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

// ✅ Replace with your actual API Key
const GOOGLE_API_KEY = "AIzaSyAb5qGxE7q2Bz5mXbGZZ1V0LRqOikwjBtI";

const MapsScreen = () => {
    const mapRef = useRef<MapView>(null);
    const [markerPosition, setMarkerPosition] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const animateToLocation = (lat: number, lng: number) => {
        const newRegion = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };
        mapRef.current?.animateToRegion(newRegion, 1000);
        setMarkerPosition({ latitude: lat, longitude: lng });
    };

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={DEFAULT_REGION}
            >
                {markerPosition && (
                    <Marker
                        coordinate={markerPosition}
                        title="Selected Location"
                    />
                )}
            </MapView>

            {/* Google Places Autocomplete Search */}
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flex: 1 }}>
                <GooglePlacesAutocomplete
                    placeholder="Search for a place"
                    keyboardShouldPersistTaps="always"
                    // fetchDetails
                    onFail={(e) => console.log('eee', e)}
                    debounce={300}
                    onPress={(data, details = null) => {
                        const lat = details?.geometry.location.lat;
                        const lng = details?.geometry.location.lng;
                        if (lat && lng) {
                            animateToLocation(lat, lng);
                        }
                    }}
                    predefinedPlaces={[]}
                    // minLength={2} 
                    // autoFocus={false}
                    fetchDetails={true}
                    query={{
                        key: "AIzaSyCDsEXCGdGUHqLKvf3T5u7cuJGoMzZjhb8",
                        language: "en",
                        type: '(cities)', // Specify the type of places to search
                    }}
                    styles={{
                        container: {
                            // position: "absolute",
                            // zIndex: 100, // 🔥 REQUIRED for Android
                            elevation: 10, // 🔥 REQUIRED for Android
                            top: 40,
                            width: "90%", alignSelf: "center"
                        },
                        textInput: {
                            height: 44,
                            backgroundColor: "#fff",
                            borderRadius: 5,
                            paddingHorizontal: 10
                        },
                        listView: {
                            backgroundColor: 'white',
                            // zIndex: 20000, // 🔥 to ensure dropdown is visible
                            // elevation: 12,
                        },
                        description: {
                            fontSize: 16,
                            color: "#000",
                        },
                    }}
                    textInputProps={{
                        placeholderTextColor: "#666060ff",
                        placeholder: "Search Location",
                        onFocus: () => { }
                    }}
                    enablePoweredByContainer={false}
                    currentLocation={false}
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={
                        {
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }
                    }
                    GooglePlacesDetailsQuery={{
                        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                        fields: 'formatted_address',
                    }}
                    filterReverseGeocodingByTypes={[
                        'locality',
                        'administrative_area_level_3',
                    ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    predefinedPlacesAlwaysVisible={!true}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    searchContainer: {
        position: "absolute",
        top: Platform.OS === "ios" ? 60 : 40,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "transparent",
    },
    searchInput: {
        height: 44,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
});

export default MapsScreen;
