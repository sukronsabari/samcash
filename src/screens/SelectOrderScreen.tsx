/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { SetStateAction, useEffect, useMemo, useState } from 'react';
import { ShoppingBagIcon } from 'react-native-heroicons/solid';
import ButtonSmall from '../components/ButtonSmall';
import { COLORS } from '../utils/constant';
import WasteCard from '../components/WasteCard';

import { SelectOrderScreenProps } from './ScreenType';
import api from '../api';
import { SelectedWaste, Waste } from '../api/apiResponseType';

type WasteType = 'organik' | 'non-organik' | 'b3';
type GetWasteParams = {
  categoryId: number;
  setWaste: React.Dispatch<SetStateAction<any>>;
  categorySelectedSet: WasteType;
  haveChild?: boolean | null;
  childCategorySelectedId?: number;
  setChildCategory?: React.Dispatch<SetStateAction<number>>;
};

const nonOrganikCategories = [
  {
    id: 3,
    parent_id: 2,
    category_name: 'Plastik',
    children: [],
  },
  {
    id: 4,
    parent_id: 2,
    category_name: 'Kertas',
    children: [],
  },
  {
    id: 5,
    parent_id: 2,
    category_name: 'Logam',
    children: [],
  },
  {
    id: 6,
    parent_id: 2,
    category_name: 'Kaca',
    children: [],
  },
  {
    id: 7,
    parent_id: 2,
    category_name: 'Elektronik',
    children: [],
  },
];

const wasteData = [
  {
    category_id: 2,
    id: 1,
    is_available: '1',
    mitra_id: 100,
    product_code: 'product1',
    product_image: null,
    product_name: 'Botol Plastik',
    purchase_point: '120',
    unit_type: 'kiloan',
  },
  {
    category_id: 2,
    id: 2,
    is_available: '1',
    mitra_id: 100,
    product_code: 'product1',
    product_image: null,
    product_name: 'Botol Kaca',
    purchase_point: '160',
    unit_type: 'kiloan',
  },
  {
    category_id: 2,
    id: 3,
    is_available: '1',
    mitra_id: 100,
    product_code: 'product1',
    product_image: null,
    product_name: 'Alumunium',
    purchase_point: '230',
    unit_type: 'kiloan',
  },
];

export default function SelectOrderScreen({
  route,
  navigation,
}: SelectOrderScreenProps) {
  // const { mitraId } = route.params;
  const mitraId = 16;
  const [selectedCategory, setSelectedCategory] =
    useState<WasteType>('organik');
  const [selectedNonOrganikId, setSelectedNonOrganikId] = useState<number>(3);
  const [selectedWaste, setSelectedWaste] = useState<Waste[]>([]);

  const [organicWaste, setOrganicWaste] = useState<Waste[]>([] as Waste[]);
  const [nonOrganicWaste, setNonOrganicWaste] = useState<Waste[]>(
    [] as Waste[],
  );
  const [b3Waste, setB3Waste] = useState<Waste[]>([] as Waste[]);

  const getWaste = async ({
    categoryId,
    setWaste,
    categorySelectedSet,
    haveChild = false,
    childCategorySelectedId,
    setChildCategory,
  }: GetWasteParams) => {
    if (haveChild && setChildCategory && childCategorySelectedId) {
      setChildCategory(childCategorySelectedId);
    } else {
      setSelectedCategory(categorySelectedSet);
    }

    const result = await api.getAvailableWasteList({
      mitraId,
      categoryId,
    });

    if (result) {
      setWaste(result.data);
    }
  };

  const renderWaste = useMemo(
    () => ({
      organik: organicWaste,
      'non-organik': nonOrganicWaste,
      b3: b3Waste,
    }),
    [organicWaste, nonOrganicWaste, b3Waste],
  );

  const isWasteSelected = (wasteId: number) =>
    selectedWaste.some(waste => waste.id === wasteId);

  const addToCart = (waste: Waste) => {
    const existingWaste = selectedWaste.find(item => item.id === waste.id);
    if (!existingWaste) {
      setSelectedWaste(prev => [...prev, waste]);
    }
  };

  const removeFromCart = (waste: Waste) => {
    const existingWaste = selectedWaste.find(item => item.id === waste.id);

    if (existingWaste) {
      const updatedWaste = selectedWaste.filter(item => item.id !== waste.id);
      setSelectedWaste(updatedWaste);
    }
  };

  const getTotalPoints = () => {
    return selectedWaste.reduce(
      (acc, currObj) => acc + parseInt(currObj.purchase_point, 10),
      0,
    );
  };

  useEffect(() => {
    async function fetchData() {
      await getWaste({
        categoryId: 1,
        setWaste: setOrganicWaste,
        categorySelectedSet: 'organik',
      });
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="pt-4 px-4">
        <Text
          className="text-dark text-sm"
          style={{ fontFamily: 'Poppins-Medium' }}>
          Jenis Sampah
        </Text>
        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 10, marginTop: 15 }}>
          <ButtonSmall
            handlePress={() =>
              getWaste({
                categoryId: 1,
                setWaste: setOrganicWaste,
                categorySelectedSet: 'organik',
              })
            }
            text="Organik"
            backgroundColor={
              selectedCategory === 'organik' ? COLORS.primary : 'white'
            }
            color={selectedCategory === 'organik' ? 'white' : COLORS.primary}
            borderColor={COLORS.primary}
          />
          <ButtonSmall
            handlePress={() =>
              getWaste({
                categoryId: selectedNonOrganikId,
                setWaste: setNonOrganicWaste,
                categorySelectedSet: 'non-organik',
              })
            }
            text="Non-Organik"
            backgroundColor={
              selectedCategory === 'non-organik' ? COLORS.primary : 'white'
            }
            color={
              selectedCategory === 'non-organik' ? 'white' : COLORS.primary
            }
            borderColor={COLORS.primary}
          />
          <ButtonSmall
            handlePress={() =>
              getWaste({
                categoryId: 8,
                setWaste: setB3Waste,
                categorySelectedSet: 'b3',
              })
            }
            text="B3"
            backgroundColor={
              selectedCategory === 'b3' ? COLORS.primary : 'white'
            }
            color={selectedCategory === 'b3' ? 'white' : COLORS.primary}
            borderColor={COLORS.primary}
          />
        </ScrollView>

        {selectedCategory === 'non-organik' && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 10 }}
            data={nonOrganikCategories}
            renderItem={({ item, index }) => (
              <View className="mr-3">
                <ButtonSmall
                  handlePress={() =>
                    getWaste({
                      categoryId: item.id,
                      setWaste: setNonOrganicWaste,
                      haveChild: true,
                      childCategorySelectedId: item.id,
                      setChildCategory: setSelectedNonOrganikId,
                      categorySelectedSet: 'non-organik',
                    })
                  }
                  text={item.category_name}
                  backgroundColor={
                    selectedNonOrganikId === nonOrganikCategories[index].id
                      ? COLORS.primary
                      : 'white'
                  }
                  color={
                    selectedNonOrganikId === nonOrganikCategories[index].id
                      ? 'white'
                      : COLORS.primary
                  }
                  borderColor={COLORS.primary}
                />
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}

        {/* Waste Card */}
        <FlatList
          contentContainerStyle={{ marginTop: 25 }}
          data={wasteData}
          renderItem={({ item }) => (
            <View className="mb-3">
              <WasteCard
                isWasteSelected={isWasteSelected(item.id)}
                wasteData={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />

        <Text
          className="text-dark text-xs mt-6"
          style={{ fontFamily: 'Poppins-Regular' }}>
          * Harga bisa berubah di mitra yang berbeda
        </Text>
        <Text
          className="text-dark text-xs"
          style={{ fontFamily: 'Poppins-Regular' }}>
          * Harga dalam satuan Kilogram
        </Text>
      </View>
      {/* <BottomBar>
        <View className="px-4">
          <ButtonLarge
            title="Selanjutnya"
            handlePress={() => navigation.navigate('SetAddress')}
            roundedFull
          />
        </View>
      </BottomBar> */}
      {selectedWaste.length > 0 ? (
        <View className="absolute bottom-0 left-0 w-full h-auto px-4 pb-10">
          <TouchableOpacity
            onPress={() => navigation.navigate('SetAddress')}
            activeOpacity={0.9}
            className="bg-primary rounded-full py-2 px-6">
            <View className="flex-row justify-between items-center">
              <View>
                <Text
                  className="text-white text-xs"
                  style={{ fontFamily: 'Poppins-Medium' }}>
                  {selectedWaste.length} item
                </Text>
                <Text
                  className="text-white"
                  style={{ fontFamily: 'Poppins-Regular', fontSize: 10 }}>
                  Dipilih
                </Text>
              </View>
              <View className="flex-row items-center space-x-3">
                <Text
                  className="text-white text-sm"
                  style={{ fontFamily: 'Poppins-Medium' }}>
                  {getTotalPoints()} points
                </Text>
                <ShoppingBagIcon fill="white" size={24} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

// const increaseQuantity = (waste: SelectedWaste) => {
//   setSelectedWaste(prev =>
//     prev.map(item =>
//       item.id === waste.id ? { ...item, quantity: item.quantity + 1 } : item,
//     ),
//   );
// };

// const decreaseQuantity = (waste: SelectedWaste) => {
//   if (waste.quantity > 1) {
//     const updatedWaste = selectedWaste.map(item =>
//       item.id === waste.id ? { ...item, quantity: item.quantity - 1 } : item,
//     );

//     setSelectedWaste(updatedWaste);
//   } else if (waste.quantity === 1) {
//     const updatedWaste = selectedWaste.filter(item => item.id !== waste.id);
//     setSelectedWaste(updatedWaste);
//   }
// };

// const addToCart = (product: Waste) => {
//   const existingProduct = selectedWaste.find(item => item.id === product.id);

//   if (existingProduct) {
//     const updatedWaste = selectedWaste.map(item =>
//       item.id === product.id
//         ? { ...item, quantity: item.quantity + 1 }
//         : item,
//     );

//     setSelectedWaste(updatedWaste);
//   } else {
//     setSelectedWaste([...selectedWaste, { ...product, quantity: 1 }]);
//   }
// };
