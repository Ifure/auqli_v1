import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Modal,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusAwareStatusBar } from '../ui/focus-aware-status-bar';
import { icons, images } from '@/constants';
import { useForm } from 'react-hook-form';
import CustomButton from '../global/button/CustomButton';
import BottomSheet from '../global/bottom-sheet';
import classNames from 'classnames';
import { useUploadCategoriesMutation } from '@/services/categories';
import { toast } from '@/core/toast';
import { router } from 'expo-router';

type Category = {
    id: string;
    title: string;
    image: string;
};

type SubCategory = {
    id: string;
    title: string;
};

type FormData = {
    selectedCategories: {
        name: string;
        subCategories: { name: string }[];
    }[];
};

const categories: Category[] = [
    { id: '1', title: 'Suits', image: require('@/assets/images/suit.png') },
    { id: '2', title: 'Jackets', image: require('@/assets/images/jacket.png') },
    { id: '3', title: 'Pants', image: require('@/assets/images/pant.png') },
    { id: '4', title: 'Shoes', image: require('@/assets/images/sneaker.png') },
    { id: '5', title: 'Jewelry', image: require('@/assets/images/jacket.png') },
    { id: '6', title: 'Shirts', image: require('@/assets/images/suit.png') },
];

const subCategories: SubCategory[] = [
    { id: '1', title: 'Jewelry' },
    { id: '2', title: 'Jerseys' },
    { id: '3', title: 'Men’s Fashion' },
    { id: '4', title: 'Bags' },
    { id: '5', title: 'Vintage' },
    { id: '6', title: 'Men’s Jewelry' },
];

const Categories = () => {
    const [show, setShow] = useState(false);
    const { control, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: {
            selectedCategories: [],
        },
    });

    const selectedCategories = watch('selectedCategories');
    const [uploadCategories, { isLoading }] = useUploadCategoriesMutation();


    const toggleCategory = (id: string, title: string) => {
        const currentCategories = [...selectedCategories];
        const existingIndex = currentCategories.findIndex(
            (category) => category.name === title
        );

        if (existingIndex !== -1) {
            currentCategories.splice(existingIndex, 1);
        } else {
            currentCategories.push({
                name: title,
                subCategories: [],
            });
        }

        setValue('selectedCategories', currentCategories);
    };

    const addSubCategory = (categoryName: string, subCategoryName: string) => {
        if (!categoryName) return;

        const currentCategories = [...selectedCategories];
        const categoryIndex = currentCategories.findIndex(
            (category) => category.name === categoryName
        );

        if (categoryIndex !== -1) {
            const category = currentCategories[categoryIndex];
            const isAlreadyAdded = category.subCategories.some(
                (sub) => sub.name === subCategoryName
            );

            if (!isAlreadyAdded) {
                category.subCategories.push({ name: subCategoryName });
            } else {
                category.subCategories = category.subCategories.filter(
                    (sub) => sub.name !== subCategoryName
                );
            }
            currentCategories[categoryIndex] = category;
        }

        setValue('selectedCategories', currentCategories);
    };

    const handleContinue = async (data: FormData) => {
        try {
            const result = await uploadCategories(data).unwrap();
            router.replace("/(root)/(tabs)/home")
            toast.success(result.message)
        } catch (error: any) {
            console.log(error);

            toast.error(error.data.message);
        }
    };

    return (
        <>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="black" />
            <SafeAreaView className="h-full bg-black">
                <ScrollView className="flex-1 px-4">
                    <FlatList
                        data={categories}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={() => (
                            <Text className="text-gray-200 font-LexendDeca text-center text-[21.77px] font-bold mt-10 mb-[36px]">
                                What’s your style vibe?
                            </Text>
                        )}
                        ItemSeparatorComponent={() => <View className="h-4" />}
                        columnWrapperStyle={{
                            justifyContent: 'center',
                            columnGap: 48,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => toggleCategory(item.id, item.title)}
                                className="rounded-md overflow-visible relative w-[115px] h-[173px]"
                            >
                                <Image
                                    source={item.image}
                                    className="rounded-md border-[0.6px] border-gray-200 h-full"
                                    resizeMode="contain"
                                />
                                {selectedCategories.some(
                                    (category) => category.name === item.title
                                ) && (
                                        <Image
                                            source={images.checkmarkIcon}
                                            className="absolute top-[-10px] right-[1px] w-6 h-6 z-50"
                                        />
                                    )}
                                <Text className="text-center font-LexendDecaBold text-white absolute bottom-3 text-lg px-[8.41px]">
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <View className="mx-5 mt-5">
                        <CustomButton
                            title="Continue"

                            onPress={handleSubmit(handleContinue)}
                            // loading={isLoading}
                            disabled={!selectedCategories.length || isLoading}
                            className="mb-4 mt-[18px] !bg-primary-100 !rounded !text-white text-sm font-LexendDecaBold"
                        />
                        <CustomButton
                            title="Add Preference"
                            onPress={() => setShow(true)}
                            textVariant="success"
                            disabled={!selectedCategories.length || isLoading}
                            // loading={isLoading}
                            className="mb-16 mt-[18px] !bg-transparent border border-[#16783A] !rounded text-sm font-LexendDecaBold"
                            IconLeft={() => (
                                <Image
                                    source={icons.addCircle}
                                    resizeMode="contain"
                                    className='mx-1'
                                />
                            )}
                        />
                        {/* Sub Categories */}
                        <BottomSheet
                            bgColor="#3A3A3A"
                            childrenStyle="!px-[11px]"
                            showCloseIcon={false}
                            title="Sub Category"
                            show={show}

                        >
                            <View className="rounded-t-3xl">
                                <FlatList
                                    data={subCategories}
                                    numColumns={2}
                                    columnWrapperStyle={{
                                        columnGap: 22,
                                        justifyContent: 'space-between',
                                    }}
                                    keyExtractor={(item) => item.title}
                                    renderItem={({ item: subCategory }) => {
                                        const isSelected = selectedCategories.some((category) =>
                                            category.subCategories.some(
                                                (sub) => sub.name === subCategory.title
                                            )
                                        );
                                        return (
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: isSelected
                                                        ? '#16783A'
                                                        : 'rgba(69, 193, 51, 0.15)',
                                                    padding: 16,
                                                    marginBottom: 26,
                                                }}
                                                className="rounded-[26.928px] flex-1 items-center flex-row justify-between px-[22px] text-center w-[168px] font-LexendDeca font-normal text-sm border-gray-200 border-[0.861px]"
                                                onPress={() =>
                                                    addSubCategory(
                                                        selectedCategories[0]?.name || '',
                                                        subCategory.title
                                                    )
                                                }
                                            >
                                                <Text className={`${isSelected ? 'text-white' : "text-gray-200"} text-[14.362px] font-LexendDeca font-normal `}>
                                                    {subCategory.title}
                                                </Text>
                                                {!isSelected ? (
                                                    <Image
                                                        source={icons.checkmarkCircleIcon}
                                                    />
                                                ) : (
                                                    <Image
                                                        source={icons.checkmarkCircleSelectIcon}
                                                    />
                                                )}

                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                                <View className='mx-3'>
                                    <CustomButton
                                        title="Continue"
                                        onPress={() => setShow(false)}
                                        className="mb-8 mt-[18px] bg-primary-200 !rounded !text-white text-[14.512px] font-bold font-LexendDecaBold"
                                    />
                                </View>
                            </View>
                        </BottomSheet>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Categories;
