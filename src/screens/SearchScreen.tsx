/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  Linking,
  PermissionsAndroid,
  Alert,
} from 'react-native';

import Geolocation, { watchPosition } from 'react-native-geolocation-service';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import EncryptedStorage from 'react-native-encrypted-storage';
import { SearchIcon } from '../assets';
import InputAutoComplete from '../components/InputAutoComplete';
import MitraItem from '../components/MitraItem';
import api from '../api';
import { NearbyStore } from '../api/apiResponseType';
import Loading from '../components/Loading';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;

type LocationProps = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  timestamp: number | null;
};

export default function SearchScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<LocationProps>({
    latitude: -2.5489,
    longitude: 118.0149,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    timestamp: null,
  });
  const [locationGranted, setLocationGranted] = useState(false);
  const [locationResult, setLocationResult] = useState<LatLng>();

  const mapRef = useRef<MapView>(null);

  const [nearbyStore, setNearbyStore] = useState<NearbyStore[]>(
    [] as NearbyStore[],
  );

  const moveCameraToPlace = (details: GooglePlaceDetail | null) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };

    if (position.latitude !== 0 && position.longitude !== 0) {
      setLocationResult(position);
      moveTo(position);
    }
  };

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();

    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const getNearbyStore = async (position: LatLng): Promise<undefined> => {
    if (position) {
      const result = await api.getNearbyStore({
        latitude: position.latitude,
        longitude: position.longitude,
      });

      if (result.data) {
        setNearbyStore(result.data);
      }
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationGranted(true);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(err);
    }
  };

  const getCurrentPosition = async () => {
    const cachedLocation = await getCachedLocation();

    if (cachedLocation) {
      // Use the cached location
      setCurrentLocation(cachedLocation);
      moveTo({
        latitude: cachedLocation.latitude,
        longitude: cachedLocation.longitude,
      });
      await getNearbyStore({
        latitude: cachedLocation.latitude,
        longitude: cachedLocation.longitude,
      });
    } else {
      // Fetch the new current location
      Geolocation.getCurrentPosition(
        async pos => {
          if (pos) {
            // Perbarui lokasi yang di-cache dengan properti timestamp
            const expirationTimestamp = Date.now() + CACHE_EXPIRATION_TIME;

            const newPosition = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
              timestamp: expirationTimestamp,
            };

            await saveCachedLocation(newPosition);

            setCurrentLocation(newPosition);
            moveTo(newPosition);
            await getNearbyStore(newPosition);
          }
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
      );
    }
  };

  const saveCachedLocation = async (location: LatLng) => {
    try {
      const cachedLocation = {
        ...location,
        timestamp: Date.now(),
      };
      await EncryptedStorage.setItem(
        'cachedLocation',
        JSON.stringify(cachedLocation),
      );
    } catch (error) {
      console.warn(error);
    }
  };

  const getCachedLocation = async (): Promise<LocationProps | null> => {
    try {
      const cachedLocationStr = await EncryptedStorage.getItem(
        'cachedLocation',
      );
      if (cachedLocationStr) {
        const cachedLocation = JSON.parse(cachedLocationStr);
        const { timestamp } = cachedLocation;
        const currentTime = Date.now();

        if (currentTime - timestamp <= CACHE_EXPIRATION_TIME) {
          return cachedLocation.position;
        }
      }
      return null;
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (locationGranted) {
      getCurrentPosition();
    }
    setIsLoading(false);
  }, [locationGranted]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <MapView
        ref={mapRef}
        style={{ flex: 1, width: '100%', height: '100%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentLocation}
        rotateEnabled={false}>
        {currentLocation.latitude && currentLocation.longitude ? (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
          />
        ) : null}
        {locationResult && <Marker coordinate={locationResult} />}
      </MapView>

      {/* headers */}
      <View className="absolute w-full px-4 pt-4" style={{ top: 0 }}>
        <InputAutoComplete onPlaceSelected={moveCameraToPlace} />
      </View>

      <BottomSheet
        index={0}
        snapPoints={['20%', '80%']}
        style={{ backgroundColor: 'white' }}
        enableContentPanningGesture={false}
        // enableHandlePanningGesture={false} // control button ke atas
        enablePanDownToClose>
        <Text
          className="text-dark text-sm pl-4 mt-3"
          style={{ fontFamily: 'Poppins-Medium' }}>
          Terdekat
        </Text>
        <BottomSheetFlatList
          contentContainerStyle={{ paddingTop: 15, paddingHorizontal: 16 }}
          data={nearbyStore}
          renderItem={({ item }) => (
            <MitraItem
              key={item.id}
              {...item}
              isOpen={item.is_open}
              distance={item.distance.formated}
            />
          )}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
