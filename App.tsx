/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

// import store from './source/redux/Store';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { ModalProvider } from './source/components/modal';
import MyStack from './source/navigationRouter/CreateStack';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './source/redux/Store';
// import { store, persistor } from './store'; // Assuming your Redux store configuration is in ./store

function App(): React.JSX.Element {
  useEffect(() => SplashScreen.hide(), []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default () => (
  <ModalProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ModalProvider>
);

