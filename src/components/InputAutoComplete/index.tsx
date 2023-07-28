/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { API_KEY } from '@env';
import { SearchIcon } from '../../assets';
import { COLORS } from '../../utils/constant';

type InputAutoCompleteProps = {
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};

export default function InputAutoComplete({
  onPlaceSelected,
}: InputAutoCompleteProps) {
  const [address, setAddress] = useState('');
  const searchInputRef = useRef<GooglePlacesAutocompleteRef>(null);

  const handleTextInputReset = () => {
    if (searchInputRef.current) {
      searchInputRef.current.setAddressText('');
    }
  };

  useEffect(() => {
    if (searchInputRef.current) {
      setAddress(searchInputRef.current?.getAddressText());
    }
  }, []);

  return (
    <GooglePlacesAutocomplete
      ref={searchInputRef}
      fetchDetails
      minLength={3}
      debounce={200}
      placeholder="Search"
      // currentLocation={true}
      // currentLocationLabel="Your location!" // add a simple label
      onPress={(data, details = null) => {
        onPlaceSelected(details);
      }}
      query={{
        key: 'AIzaSyA3xpYhf4ogUTF3OBacB59_BVEu15PftPQ',
        language: 'id',
        components: 'country:id',
      }}
      enablePoweredByContainer={false}
      styles={{
        textInputContainer: styles.textInputContainer,
        textInput: styles.textInput,
        row: styles.row,
        listView: styles.listView,
      }}
      renderLeftButton={() => (
        <View style={styles.icon} className="justify-center items-center">
          <SearchIcon
            width={28}
            height={28}
            stroke={COLORS.textDark}
            strokeWidth={0.5}
          />
        </View>
      )}
      renderRightButton={() =>
        searchInputRef.current?.getAddressText() ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.icon}
            className="justify-center items-center"
            onPress={handleTextInputReset}>
            <XCircleIcon width={28} fill={COLORS.inputBorder} />
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    // borderWidth: 1,
  },
  textInputContainer: {
    // paddingTop: 4,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 999,
    gap: 2,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowRadius: 6,
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
  textInput: {
    padding: 0,
    margin: 0,
    height: 'auto',
    marginTop: 1,
    paddingVertical: 6,
    backgroundColor: 'transparent',
  },
  row: {
    backgroundColor: 'transparent',
  },
  listView: {
    marginTop: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 15,
    position: 'absolute',
    top: '100%',
  },
});
