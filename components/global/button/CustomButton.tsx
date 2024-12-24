import { ButtonProps } from '@/types/types';
import { TouchableOpacity, Text } from "react-native";
import LoadingModal from '../loading-modal';


const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
    switch (variant) {
        case "secondary":
            return "bg-gray-500";
        case "danger":
            return "bg-red-500";
        case "success":
            return "bg-green-500";
        case "outline":
            return "bg-transparent border-neutral-300 border-[0.5px]";
        default:
            return "bg-primary-100";
    }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
    switch (variant) {
        case "primary":
            return "text-black";
        case "secondary":
            return "text-gray-100";
        case "danger":
            return "text-red-100";
        case "success":
            return "text-primary-100";
        default:
            return "text-white";
    }
};

const CustomButton = ({
    onPress,
    title,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    className,
    disabled,
    loading,
    ...props
}: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-full rounded-full p-[13px] flex flex-row justify-center items-center shadow-neutral-400/70 ${disabled ? 'bg-[#C6C6C6]' : `${getBgVariantStyle(bgVariant)} `}  ${className}`}
            {...props}
            disabled={disabled}
        >
            {IconLeft && <IconLeft />}
            <Text className={`text-sm font-semibold ${getTextVariantStyle(textVariant)}`}>
                {title}
            </Text>
            {IconRight && <IconRight />}
            <LoadingModal isVisible={loading} />
        </TouchableOpacity>
    );
};

export default CustomButton;
