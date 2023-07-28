import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import { COLORS } from '../../utils/constant';

export default function ProgressBarLoading() {
  return (
    <View
      className="absolute z-10 top-0 left-0 w-full h-auto"
      style={{ marginTop: -1 }}>
      <Progress.Bar
        animated
        indeterminate
        progress={0.3}
        width={null}
        height={4}
        color={COLORS.primary}
        unfilledColor="white"
        borderRadius={3}
        borderColor="transparent"
      />
    </View>
  );
}
