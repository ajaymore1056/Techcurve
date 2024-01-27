import React from 'react';
import { TextInput } from 'react-native';
// import { Text } from 'react-native';
// import { commonStyle } from '../../styles/commonStyle';

const CustomInput = ({ children, style, ...otherProps }: any) => {
    return <>
        <TextInput style={{
            fontSize: 14,
            padding: 10,
            color: '#000',
            borderRadius: 10,
            flex: 1,
            ...style
        }}
            allowFontScaling={false} {...otherProps}>
            {children}
        </TextInput>
    </>

}
export default CustomInput;