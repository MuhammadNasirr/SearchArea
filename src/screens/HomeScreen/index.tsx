import React, { useRef, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Platform,
} from "react-native";
import MapView, {
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from "react-native-maps";
import 'react-native-get-random-values';
import CustomPlacesSearch from "../../components/PlacesInput";
import DetailsCard from "../../components/DetailsCard";
import { PlaceDetails } from "../../utils/location";
import HistoryModal from "../../components/HistoryModal";
import { savePlaceToHistory } from "../../services/googleApi";
import Header from "../../components/Header";

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

const MapsScreen = () => {
    const mapRef = useRef<MapView>(null);
    const [isHistoryVisible, setHistoryVisible] = useState<boolean>(false);
    const [details, setDetails] = useState<{ name: string; formatted_address: string; geometry: { location: { lat: number; lng: number } }, place_id: string } | null>(null);
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



    // Called when a place is selected from the modal
    const handleHistorySelect = (place: PlaceDetails) => {
        setDetails(place);     // Set marker and show details
        setMarkerPosition({ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng });
        animateToLocation(place.geometry.location.lat, place.geometry.location.lng);
        savePlaceToHistory(place);   // Optional: refresh history order
    };

    return (
        <SafeAreaView style={styles.container}>
           <Header setHistoryVisible={setHistoryVisible} />
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
            <CustomPlacesSearch onPlaceSelect={(details) => {
                setDetails({
                    name: details.name,
                    formatted_address: details.formatted_address,
                    geometry: {
                        location: {
                            lat: details.geometry.location.lat,
                            lng: details.geometry.location.lng,
                        },
                    },
                    place_id: details.place_id,
                });
                const lat = details?.geometry?.location?.lat;
                const lng = details?.geometry?.location?.lng;
                if (lat && lng) {
                    animateToLocation(lat, lng);
                }
            }} />

            {details && (
                <DetailsCard details={details} onClose={() => setDetails(null)} />
            )}
            {
                isHistoryVisible && (
                    <HistoryModal
                        visible={isHistoryVisible}
                        onClose={() => setHistoryVisible(false)}
                        onSelect={handleHistorySelect}
                    />
                )
            }
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
    info: {
        position: "absolute",
        width: "90%",
        alignSelf: "center",
        bottom: 20,
        padding: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginTop: 10,
    },
    value: {
        color: '#222',
        fontSize: 15,
        marginTop: 2,
    },
    historyButton: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 6,
        alignSelf: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MapsScreen;
