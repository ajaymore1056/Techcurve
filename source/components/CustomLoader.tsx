import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import { LIGHTGREEN, MDBLUE } from '../constant/Color';

 
export const CustomLoader = ({ title }: any) => {
    const { loaderView, loaderText } = LoaderScreenStyle;
    return (
        <View style={loaderView}>
            <ActivityIndicator size="small" color={LIGHTGREEN} />
            <CustomText style={loaderText}>{title ? title : 'Please Wait.....'} </CustomText>
        </View>
    )
}

const LoaderScreenStyle = StyleSheet.create({
    loaderText: {
        color: MDBLUE,
        fontSize: 12,
        lineHeight: 13,
        marginTop: 10
    },
    loaderView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})