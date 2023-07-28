/* eslint-disable react/no-array-index-key */
import { View, ScrollView, Image } from 'react-native';

export default function PhotoList() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <View className="overflow-hidden rounded mr-3" key={index}>
          <Image
            source={require('../../assets/images/sample-mitra-img.png')}
            // className="w"
            style={{ width: 200, height: 150 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}
