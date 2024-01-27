import React from 'react';
import { Pressable, ActivityIndicator, Text, StyleSheet } from 'react-native';

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
            style={{ ...buttonCommonStyle.buttonStyle, ...(disabled ? buttonCommonStyle.disabledStyle : {}), ...style, }}
        >
            {!isLoader ? (
                <Text style={{ ...buttonCommonStyle.buttonText, ...textstyle }}>
                    {label}
                </Text>
            ) : (
                <ActivityIndicator color={color ? color : '#FFF'} />
            )}
        </Pressable>
    );
};

export default CustomButton;

export const buttonCommonStyle = StyleSheet.create({
    buttonStyle: {
        borderRadius: 9,
        backgroundColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        height: 54,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        alignSelf: 'center',
        lineHeight: 30
    },
    disabledStyle: {
        opacity: 0.5,
    },
});