import * as React from 'react';
import AppNavigator from './AppNavigator';
import { LogBox } from 'react-native';
import { verifyInstallation } from 'nativewind';
import "./global.css"
import { AuthContextProvider } from './context';

const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider>
  )
};

export default App;
