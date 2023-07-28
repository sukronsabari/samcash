import { useState, useRef } from 'react';
import { Text, SafeAreaView, Dimensions, View, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import TextInputField from '../components/TextInputField';
import ButtonLarge from '../components/ButtonLarge';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
type LocationProps = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export default function AddAddressScreen() {
  const [currentLocation, setCurrentLocation] = useState<LocationProps>({
    latitude: -2.5489,
    longitude: 118.0149,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const mapRef = useRef<MapView>(null);

  const [alamat, setAlamat] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kota, setKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kodePos, setKodePos] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white">
      <MapView
        ref={mapRef}
        style={{ width: '100%', height: height * 0.3 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentLocation}
        rotateEnabled={false}
      />
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 30 }}>
        <View className="mt-3">
          <Text
            style={{ fontFamily: 'Poppins-Regular' }}
            className="text-dark mb-1">
            Alamat Lengkap
          </Text>
          <TextInputField
            value={alamat}
            handleChange={value => setAlamat(value)}
          />
        </View>
        <View className="mt-3">
          <Text
            style={{ fontFamily: 'Poppins-Regular' }}
            className="text-dark mb-1">
            Provinsi
          </Text>
          <TextInputField
            value={provinsi}
            handleChange={value => setProvinsi(value)}
          />
        </View>
        <View className="mt-3">
          <Text
            style={{ fontFamily: 'Poppins-Regular' }}
            className="text-dark mb-1">
            Kota
          </Text>
          <TextInputField value={kota} handleChange={value => setKota(value)} />
        </View>
        <View className="mt-3">
          <Text
            style={{ fontFamily: 'Poppins-Regular' }}
            className="text-dark mb-1">
            Kecamatan
          </Text>
          <TextInputField
            value={kecamatan}
            handleChange={value => setKecamatan(value)}
          />
        </View>
        <View className="mt-3">
          <Text
            style={{ fontFamily: 'Poppins-Regular' }}
            className="text-dark mb-1">
            Kelurahan
          </Text>
          <TextInputField
            value={kelurahan}
            handleChange={value => setKelurahan(value)}
          />
        </View>
        <View className="mt-3">
          <Text
            style={{ fontFamily: 'Poppins-Regular' }}
            className="text-dark mb-1">
            Kode Pos
          </Text>
          <TextInputField
            value={kodePos}
            handleChange={value => setKodePos(value)}
          />
        </View>
        <View className="mt-3">
          <ButtonLarge title="Tambah Alamat" handlePress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
