import * as React from 'react';
import { StatusBar, View } from 'react-native';
import Routes from './routes';
import { AuthProvider, useAuth } from './context/AuthContext';
import { COLORS } from './utils/constant';

function App() {
  return (
    <AuthProvider>
      <View className="flex-1">
        <StatusBar barStyle="light-content" />
        <Routes />
      </View>
    </AuthProvider>
  );
}

export default App;
