import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import Campobase from './componentes/CampobaseComponent';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
    // garantiza que el contenido de tu aplicación se muestre de manera segura 
    // en dispositivos móviles al tener en cuenta las limitaciones de pantalla específicas de cada dispositivo. 
    <SafeAreaProvider>
       {/* Componente de View de React Native para contener otros componentes. */}
      <View> 
        <Campobase />
        {/* la barra de estado se gestione automáticamente según el contenido de la aplicación. */}
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}