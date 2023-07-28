import { View, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { COLORS } from '../../utils/constant';

const { width, height } = Dimensions.get('window');
export default function Loading() {
  return (
    <View
      className="absolute z-20 flex-row justify-center items-center bg-white/70"
      style={{ width, height }}>
      <Progress.CircleSnail size={120} thickness={6} color={COLORS.primary} />
      {/* <Progress.CircleSnail
        size={160}
        thickness={8}
        color={['red', 'green', 'blue']}
      /> */}
    </View>
  );
}
