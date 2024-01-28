import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import { BLACK, LIGHTGREEN, WHITE } from '../constant/Color';
import SignUpScreen from '../screens/SignUpScreen';
import { StyleSheet, TouchableOpacity } from 'react-native';
import BackButtonSVG from '../assests/BackButtonSVG';
import { useDispatch, useSelector } from 'react-redux';
import { loginLogout } from '../redux/Reducer';

const Stack = createNativeStackNavigator();


const MyStack = () => {
  const isLogin = useSelector((state: any) => state.counter.isLogin);
  console.log('islogin', isLogin)
  const dispatch = useDispatch();

  const isLogout = (navigation: any) => {
    dispatch(loginLogout())
  }
  return (
    <Stack.Navigator>
      {
        !isLogin ?
          <>
            <Stack.Screen
              name="Home"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={({ navigation }) => ({
                headerStyle: { backgroundColor: LIGHTGREEN },
                headerTitleStyle: { color: WHITE },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backIconStyle}>
                    <BackButtonSVG width={25} height={33} />
                  </TouchableOpacity>
                ),
              })}
            />
          </>
          :
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={({ navigation }) => ({
              headerStyle: { backgroundColor: LIGHTGREEN },
              headerTitleStyle: { color: WHITE },
              headerLeft: () => (
                <TouchableOpacity onPress={() => isLogout(navigation)} style={styles.backIconStyle}>
                  <BackButtonSVG width={25} height={33} />
                </TouchableOpacity>
              ),
            })}
          />
      }


    </Stack.Navigator>
  );
};

export default MyStack;


const styles = StyleSheet.create({
  backIconStyle: {
    alignItems: 'center',
    marginRight: 10
  }
})