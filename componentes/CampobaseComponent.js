import React, { Component } from 'react';
import Constants from 'expo-constants';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
// createNativeStackNavigator para crear un Stack Navigator llamado Stack. 
// Este Navigator gestionará la navegación entre las pantallas de la aplicación.
function CalendarioNavegador() {
  return (
    //estilo encabezado, opciones de navegacion
    <Stack.Navigator
      initialRouteName="Calendario" 
      headerMode="float"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen // pantalla navegacion
        name="Calendario"
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa',
        }}
      />
      <Stack.Screen // patalla navegacion
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: 'Detalle Excursión',
        }}
      />
    </Stack.Navigator>
  );
}

class Campobase extends Component {
  render() {
     return (
      // contexto de navegacion, permite a su contenido acceder a funcionalidades de navegacion
      <NavigationContainer>
        <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <CalendarioNavegador />
        </View>
      </NavigationContainer>      
  );
  }
}

export default Campobase;
