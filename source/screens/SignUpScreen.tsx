import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, ToastAndroid, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import EyeOutlineSVG from "../assests/EyeOutlineSVG";
import EyeSVG from "../assests/EyeSVG";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { CustomLoader } from "../components/CustomLoader";
import CustomText from "../components/CustomText";
import { useModalContext } from "../components/modal";
import { BLACK, GRAY_SHADE, GREY_BORDER, LIGHTGREEN, LIGHTT_GRAY, WHITE } from "../constant/Color";
import { increment } from "../redux/Reducer";
import { registrationStyle } from "../styles/Registrationstyle";

const SignUpScreen = ({ navigation }: any) => {
    const { openModal }: any = useModalContext()
    const registerUserData = useSelector((state: any) => state.counter.registerUserData);
    const [isLoader, setIsLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [errorMsg, setErrorMsg] = useState({
        email: null,
        name: null,
        role: null,
        password: null,
        phoneNumber: null,
        confirmpassword: null
    })
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState({
        email: '',
        name: '',
        role: '',
        password: '',
        confirmpassword: '',
        phonenumber: ''
    })

    useEffect(() => {
        setTimeout(() => {
            setLoader(true)
        }, 1000);
    }, [])

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
                            secureTextEntry={Title == 'Password*' ? hidePassword : false}
                            onChangeText={onchange}
                            keyboardType={keyboardType ? keyboardType : 'default'}
                            maxLength={Title == 'Mobile Number*' ? 10 : 200}
                        />
                        {(Title == 'Password*') &&
                            <Pressable onPress={() => setHidePassword(!hidePassword)} style={{ marginEnd: 10 }}>
                                {hidePassword ?
                                    <EyeSVG height={20} width={20} /> :
                                    <EyeOutlineSVG height={20} width={20} />
                                }
                            </Pressable>
                        }
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
    const validation = () => {
        const validFormValues: any = {
            email: null,
            name: null,
            role: null,
            password: null,
            // phoneNumber: null,
            confirmpassword: null
        };
        let isValid = false;
        if (formValue.email.length === 0) {
            isValid = true;
            validFormValues.email = "Email is Required";
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(formValue.email)) {
            isValid = true;
            validFormValues.email = "Please enter a valid Email Address";
        }
        if (!formValue?.phonenumber) {
            isValid = true
            validFormValues.phoneNumber = 'PhoneNumber is required'
        }
        if (!formValue?.password) {
            isValid = true,
                validFormValues.password = 'Password is required'
        }
        if (!formValue?.name) {
            isValid = true
            validFormValues.name = 'Full Name is required'
        }
        if (!formValue?.role) {
            isValid = true
            validFormValues.role = 'Role is required'
        }
        if (!formValue?.confirmpassword) {
            isValid = true
            validFormValues.confirmpassword = 'Confirm password is required'
        } else if (formValue.password != formValue?.confirmpassword) {
            isValid = true
            validFormValues.confirmpassword = 'Password & Confirm password is not matched'
        }
        setErrorMsg(validFormValues);
        return isValid;
    }

    const onSubmit = () => {
        setIsLoader(true)
        if (validation()) {
            setIsLoader(false)
            return
        }
        const isDuplicate = registerUserData.some((item: any) => item.email == formValue?.email)
        if (isDuplicate) {
            openModal('Email/Mobile Number already Exist, Use other Email/Mobile number')
            setIsLoader(false)
            return
        }

        dispatch(increment(formValue))
        setIsLoader(false)
        ToastAndroid.show('Your Registration Was Completed. Congratulations!', ToastAndroid.SHORT);
        navigation.goBack();
    }

    return (
        <View style={styles.mainView}>
            {loader ?
                <ScrollView style={{ marginTop: 20 }}>
                    {renderItem('Full Name*', 'Enter your name*', formValue?.name, errorMsg?.name, (text: any) => onValueChange('name', text))}
                    {renderItem('Role*', 'Enter your role *', formValue?.role, errorMsg?.role, (text: any) => onValueChange('role', text))}
                    {renderItem('Email*', 'Enter your email *', formValue?.email, errorMsg?.email, (text: any) => onValueChange('email', text))}
                    {renderItem('Mobile Number*', 'Enter your number *', formValue?.phonenumber, errorMsg?.phoneNumber, (text: any) => onValueChange('phonenumber', text), 'numeric')}
                    {renderItem('Password*', 'Enter your password*', formValue?.password, errorMsg?.password, (text: any) => onValueChange('password', text))}
                    {renderItem('Confirm Password*', 'Enter your confirm password*', formValue?.confirmpassword, errorMsg?.confirmpassword, (text: any) => onValueChange('confirmpassword', text))}
                </ScrollView>
                :
                <CustomLoader />
            }
            <CustomButton isLoader={isLoader} style={styles.buttonStyleLogin} textstyle={styles.selectedTextStyle} label={'Signup'} onPress={() => onSubmit()} />
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
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