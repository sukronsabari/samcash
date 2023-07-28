import { Text, TouchableOpacity } from 'react-native';
import { TicketIcon } from 'react-native-heroicons/solid';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { COLORS } from '../../utils/constant';

type ButtonVoucherProps = {
  handlePress: () => void;
};

export default function ButtonVoucher({ handlePress }: ButtonVoucherProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.6}
      className="flex-row items-center justify-between space-x-4 border border-slate-400 rounded-lg px-4 py-2">
      <TicketIcon size={28} fill={COLORS.primary} />
      <Text
        className="text-dark text-xs flex-1"
        style={{ fontFamily: 'Poppins-Medium' }}>
        Pakai Voucher untuk dapat Promo
      </Text>
      <ChevronRightIcon size={20} stroke={COLORS.placeholder} />
    </TouchableOpacity>
  );
}
