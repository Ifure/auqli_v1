import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { icons, onboarding } from "@/constants";
import CustomButton from '@/components/global/button/CustomButton';
import { FocusAwareStatusBar } from '@/components/ui/focus-aware-status-bar';

const Home = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const isLastSlide = activeIndex === onboarding.length - 1;

    return (
            <>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor='black' />
            <SafeAreaView className="flex h-full items-center justify-between bg-black">
                <TouchableOpacity
                    onPress={() => {
                        router.replace("/(root)/(auth)/sign-up");
                    }}
                    className="w-full flex justify-end items-end p-5"
                >
                    <Text className="text-gray-200 text-sm font-LexendDeca font-light">Skip</Text>
                </TouchableOpacity>

                <Swiper
                    ref={swiperRef}
                    loop={false}
                    dot={
                        <View className="mx-1 h-[9.98px]  w-[9.98px] rounded-full bg-[#E8E8E8]" />
                    }
                    activeDot={
                        <View className="mx-1 h-[9.98px] w-[39.91px] rounded-full bg-[#CCCCCC]" />
                    }
                    onIndexChanged={(index) => setActiveIndex(index)}
                >
                    {onboarding.map((item) => (
                        <View key={item.id} className="flex items-center justify-center p-5">
                            <Image
                                source={item.image}
                                className="h-[350px] w-[321px] rounded-[10px]"
                                resizeMode="cover"
                            />
                            <View className="flex flex-row items-center justify-center w-full mt-10">
                                <Text className="text-gray-200 text-3xl font-LexendDeca font-bold mx-10 text-center">
                                    {item.title}
                                </Text>
                            </View>
                            <Text className="text-sm font-LexendDeca text-center font-light text-gray-100 mx-10 px-4 mt-3">
                                {item.description}
                            </Text>
                        </View>
                    ))}
                </Swiper>
                {!isLastSlide ? (
                    <CustomButton
                        onPress={() =>
                            isLastSlide
                                ? router.replace("/(root)/(auth)/sign-up")
                                : swiperRef.current?.scrollBy(1)
                        }
                        IconLeft={() => (
                            <Image
                                source={icons.arrowRight}
                                resizeMode="contain"
                                className='!w-[29px] !h-[29px]'
                            />
                        )}
                        className="!w-[74px] !h-[74px] mb-16 mt-5"

                    />
                ) : (
                    <CustomButton
                        title={isLastSlide ? "Get Started" : "Next"}
                        onPress={() =>
                            isLastSlide
                                ? router.replace("/(root)/(auth)/sign-up")
                                : swiperRef.current?.scrollBy(1)
                        }
                        className="!w-9/12 mb-24 mt-6"
                    />
                )}

            </SafeAreaView >
            </>
    );
};

export default Home;
