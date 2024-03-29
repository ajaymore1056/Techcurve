import React from 'react';
import { Pressable, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { BLACK, WHITE } from '../constant/Color';

const CustomButton = (props: any) => {
    const { label, isLoader, onPress, disabled, style, textstyle, color } = props;

    const handlePress = () => {
        if (!disabled && onPress) {
            onPress();
        }
    };

    return (
        <Pressable
            disabled={disabled || isLoader}
            onPress={handlePress}
            style={({ pressed }) => [buttonCommonStyle.buttonStyle, (disabled ? buttonCommonStyle.disabledStyle : ''), style, { opacity: pressed ? 0.2 : 1 }]}
        >
            {!isLoader ? (
                <Text style={{ ...buttonCommonStyle.buttonText, ...textstyle }}>
                    {label}
                </Text>
            ) : (
                <ActivityIndicator color={color ? color : WHITE} />
            )}
        </Pressable>
    );
};

export default CustomButton;

export const buttonCommonStyle = StyleSheet.create({
    buttonStyle: {
        borderRadius: 9,
        backgroundColor: BLACK,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        height: 54,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    buttonText: {
        color: WHITE,
        fontSize: 18,
        alignSelf: 'center',
        lineHeight: 30
    },
    disabledStyle: {
        opacity: 0.5,
    },
});