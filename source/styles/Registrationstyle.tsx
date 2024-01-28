import { widthPercentageToDP } from "react-native-responsive-screen";
import { BGRED, BLACK, Black_Pearl, DARK_GREEN, GRAY_BORDER, WHITE } from "../constant/Color";
import { StyleSheet } from "react-native";

export const registrationStyle = StyleSheet.create({
    inputText: {
        marginVertical: 5,
        marginHorizontal: 20,
        height: 40,
        fontSize: 15,
        lineHeight: 20,
        color: BLACK,
    },
    inputTextDrop: {
        marginVertical: 5,
        marginStart: 20,
        height: 40,
        fontSize: 15,
        lineHeight: 20,
        color: BLACK,
        flex: 0.5
    },
    titleStyle: {
        position: 'absolute',
        marginHorizontal: 40,
        backgroundColor: WHITE,
        paddingHorizontal: 10,
        color: GRAY_BORDER,
    },
    formTxt: {
        // marginHorizontal: 35,
    },
    erroFormTxt: {
        color: BGRED,
        fontSize: 12,
        lineHeight: 30
    },
    btnGenerateOtp: {
        top: 0,
    },
    mainContainerView: {
        flex: 1,
    },
    mainBody: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    shopAddressText: {
        color: BLACK,
        fontSize: 18,
        lineHeight: 30
    },
    toggle: {
        borderColor: BLACK,
        borderWidth: 1,
        borderRadius: 1,
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        position: 'absolute',
        bottom: -5,
        width: widthPercentageToDP(87),
        height: 50, alignSelf: 'center'
    },
    billingText: {
        fontSize: 18,
        color: BLACK,
        lineHeight: 20,
        marginHorizontal: 5
    },
    dataView: {
        backgroundColor: WHITE,
        height: 50,
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: Black_Pearl,
        flexDirection:'row',
        alignItems:'center'
        // ...boxStyle,
    },
    dataViewDropDown: {
        backgroundColor: WHITE,
        height: 50,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: Black_Pearl,
        flexDirection: 'row',
        alignItems: 'center',
        paddingEnd: 10
        // ...boxStyle,
    },
    cardViewData: {
        backgroundColor: WHITE,
        justifyContent: 'center',
        // ...boxStyle,
    },
    headerText: {
        color: DARK_GREEN,
        fontSize: 24,
        lineHeight: 28,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20
    }
})