import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Constants from 'expo-constants';
import InputAutoComplete from '../InputAutoComplete';
import React, { useRef, useState } from 'react';
import { API_KEY, COLORS } from '../../utils/constant';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function Maps() {
  const [origin, setOrigin] = useState<LatLng | null>();
  const [destination, setDestination] = useState<LatLng | null>();
  const [showDirection, setShowDirection] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const mapRef = useRef<MapView>(null);

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const onPlaceSelected = (
    details: GooglePlaceDetail | null,
    flag: 'origin' | 'destination'
  ) => {
    const set = flag === 'origin' ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };

    set(position);
    moveTo(position);
  };

  const edgePadding = {
    top: 90,
    right: 90,
    bottom: 90,
    left: 90,
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirection(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  const onTraceReady = (args: any) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };
  return (
    <View className="flex-1 items-center justify-center">
      <MapView
        ref={mapRef}
        className="w-full h-full"
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirection && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={API_KEY}
            strokeColor={COLORS.primary}
            strokeWidth={5}
            onReady={onTraceReady}
          />
        )}
      </MapView>

      {/* <View style={styles.searchContainer}>
        <InputAutoComplete
          label="Origin"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, 'origin');
          }}
          autoFocus
        />
        <InputAutoComplete
          label="Destination"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, 'destination');
          }}
        />
        <TouchableOpacity
          className="mt-3 py-2 bg-primary rounded-md"
          onPress={traceRoute}
        >
          <Text className="text-white text-center ">Trace Route</Text>
        </TouchableOpacity>
        {distance && duration ? (
          <View>
            <Text>Distance {distance.toFixed(2)} </Text>
            <Text>Duration {Math.ceil(duration)}</Text>
          </View>
        ) : null}
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
});
