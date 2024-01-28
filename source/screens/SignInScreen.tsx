import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import EyeOutlineSVG from "../assests/EyeOutlineSVG";
import EyeSVG from "../assests/EyeSVG";
import FlagSVG from "../assests/FlagSVG";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomText from "../components/CustomText";
import { useModalContext } from "../components/modal";
import { BLACK, GRAY_SHADE, GREY_BORDER, LIGHTGREEN, LIGHTT_GRAY, WHITE } from "../constant/Color";
import { loginLogout } from "../redux/Reducer";
import { registrationStyle } from "../styles/Registrationstyle";

const SignInScreen = ({ navigation }: any) => {
    const { openModal }: any = useModalContext()
    const registerUserData = useSelector((state: any) => state.counter.registerUserData);
    const dispatch = useDispatch();
    const [switchButton, setSwitchButton] = useState(0);
    const [hidePassword, setHidePassword] = useState(true);
    const [loader, setLoader] = useState(false);
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
        phoneNumber: ''
    })
    const [errorMsg, setErrorMsg] = useState({
        email: null,
        password: null,
        phoneNumber: null
    })
    const renderItem = (Title: string, placeholder: string, value: any, erroMsg: any, onchange?: any, keyboardType?: any,) => {
        return (
            <View>
                <View style={registrationStyle.mainBody}>
                    <View style={registrationStyle.dataView}>
                        <CustomInput
                            style={registrationStyle.inputText}
                            placeholder={placeholder}
                            placeholderTextColor={GRAY_SHADE}
                            value={value}
                            secureTextEntry={Title == 'Password' ? hidePassword : false}
                            onChangeText={onchange}
                            keyboardType={keyboardType ? keyboardType : 'default'}
                            maxLength={Title == 'Mobile Number' ? 10 : 200}
                        />
                        {Title == 'Password' && (
                            <Pressable onPress={() => setHidePassword(!hidePassword)} style={{ marginEnd: 10 }}>
                                {hidePassword ?
                                    <EyeSVG height={20} width={20} /> :
                                    <EyeOutlineSVG height={20} width={20} />}
                            </Pressable>
                        )}
                    </View>
                    {erroMsg &&
                        <View style={registrationStyle.formTxt}>
                            <CustomText style={registrationStyle.erroFormTxt}>{erroMsg}</CustomText>
                        </View>
                    }
                </View>
                {value && <CustomText style={registrationStyle.titleStyle}>{Title}</CustomText>}
            </View>
        )
    }
    const onValueChange = (state: string, value: any) => {
        setFormValue({ ...formValue, [state]: value })
    }
    const onPress = (value: any) => {
        setSwitchButton(value)
        setFormValue({
            ...formValue,
            email: '',
            password: '',
            phoneNumber: ''
        })
        setErrorMsg({
            ...errorMsg,
            email: null,
            password: null,
            phoneNumber: null
        })
    }

    const validation = () => {
        const validFormValues: any = {
            email: '',
            phoneNumber: '',
            password: ''
        };
        let isValid = false;
        if (formValue.email.length === 0 && switchButton == 0) {
            isValid = true;
            validFormValues.email = "Email is Required";
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(formValue.email) && switchButton == 0) {
            isValid = true;
            validFormValues.email = "Please enter a valid Email Address";
        }
        if (!formValue?.phoneNumber && switchButton == 1) {
            isValid = true,
                validFormValues.phoneNumber = 'PhoneNumber is required'
        }
        if (!formValue?.password) {
            isValid = true,
                validFormValues.password = 'password is required'
        }
        setErrorMsg(validFormValues);
        return isValid;
    }
    const onPressLogin = () => {
        setLoader(true)
        if (validation()) {
            setLoader(false)
            return
        }
        const isValid = registerUserData.some((item: any) => (item.email == formValue?.email || item?.phonenumber == formValue?.phoneNumber) && item?.password == formValue?.password)
        if (!isValid) {
            {
                switchButton == 0 ? openModal('Email and Password is not matched please check / if you are new please signup') :
                    openModal('PhoneNumber and Password is not matched please check / if you are new please signup')
            }
            setLoader(false)
            return
        }
        setLoader(false)
        dispatch(loginLogout())
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.switchView}>
                <CustomButton style={switchButton == 0 ? styles.selectedButtonStyle : styles.buttonStyle} textstyle={switchButton == 0 ? styles.selectedTextStyle : styles.textStyle} label={'Email'} onPress={() => onPress(0)} />
                <CustomButton style={switchButton == 1 ? styles.selectedButtonStyle : styles.buttonStyle} textstyle={switchButton == 1 ? styles.selectedTextStyle : styles.textStyle} label={'Phone Number'} onPress={() => onPress(1)} />
            </View>
            {switchButton == 0 ? renderItem('Email', 'Enter your email', formValue?.email, errorMsg?.email, (text: any) => onValueChange('email', text)) :
                <View style={styles.numberView}>
                    <View style={styles.countryCodeView}>
                        <FlagSVG height={20} width={20} />
                        <CustomText allowFontScaling={false} style={{ color: BLACK }} > +91 </CustomText>
                    </View>
                    <View style={{ flex: 1 }}>
                        {renderItem('Mobile Number', 'Enter your number', formValue?.phoneNumber, errorMsg?.phoneNumber, (text: any) => onValueChange('phoneNumber', text), 'numeric')}
                    </View>
                </View>
            }
            {renderItem('Password', 'Enter your password', formValue?.password, errorMsg?.password, (text: any) => onValueChange('password', text))}
            <CustomButton isLoader={loader} style={styles.buttonStyleLogin} textstyle={styles.selectedTextStyle} label={'Login'} onPress={onPressLogin} />
            <CustomButton style={styles.buttonStyleLogin} textstyle={styles.selectedTextStyle} label={'Signup'} onPress={() => navigation.navigate('SignUp')} />
        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    numberView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    countryCodeView: {
        // width: widthPercentageToDP(10),
        marginStart: 20, borderWidth: 1,
        borderColor: GREY_BORDER,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: -10,
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    switchView: {
        borderWidth: 1,
        borderColor: GREY_BORDER,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        marginHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 30
    },

    buttonStyle: {
        flex: 1,
        backgroundColor: WHITE,
        elevation: 0,
        marginVertical: 3,
        borderRadius: 2,
        marginHorizontal: 5
    },
    buttonStyleLogin: {
        backgroundColor: LIGHTT_GRAY,
        elevation: 0,
        marginVertical: 10,
        borderRadius: 2,
    },
    selectedButtonStyle: {
        flex: 1,
        backgroundColor: LIGHTGREEN,
        marginVertical: 3,
        elevation: 0,
        borderRadius: 5,
        marginHorizontal: 5
    },
    textStyle: {
        color: BLACK,
        fontSize: 14
    },
    selectedTextStyle: {
        color: WHITE,
        fontSize: 14,

    }
})