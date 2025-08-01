import React, { useRef, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Platform,
    Text
} from "react-native";
import MapView, {
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from "react-native-maps";
import 'react-native-get-random-values';
import CustomPlacesSearch from "../../components/PlacesInput";

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
            <Text>ssss</Text>
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
                const lat = details?.geometry?.location?.lat;
                const lng = details?.geometry?.location?.lng;
                if (lat && lng) {
                    animateToLocation(lat, lng);
                }
            }} />
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
