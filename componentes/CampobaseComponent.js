// COMPONENTE QUE DEFINE VENTANAS Y MENU, Y QUE CARGA CON FETCHS AL INICIO QUE IRAN AL STORE REDUX
// ESTO ULTIMO SE HACE AQUI POR SER COMP QUE SE CARGA POR DEFECTO EN APP
import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import { View, Platform, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';

const mapStateToProps = state => { // mapea estado de Redux a las props del componente
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    cabeceras: state.cabeceras,
    actividades: state.actividades
  }
}
// mape acciones de Redux a las props del componente
const mapDispatchToProps = dispatch => ({ // dispatch nombre de convenio, definida al hacer connect 'react-redux'
  fetchExcursiones: () => dispatch(fetchExcursiones()),
  fetchComentarios: () => dispatch(fetchComentarios()),
  fetchCabeceras: () => dispatch(fetchCabeceras()),
  fetchActividades: () => dispatch(fetchActividades()),
})

// mapDispatchToProps: Esta función toma la función dispatch de Redux como argumento y devuelve un objeto que vincula las acciones
//  de Redux a funciones que serán accesibles en el componente. De esta manera, el componente puede despachar acciones simplemente 
//  llamando a estas funciones, lo que desencadena las actualizaciones correspondientes en el estado de Redux.

const Stack = createNativeStackNavigator();
// createNativeStackNavigator para crear un Stack Navigator llamado Stack. 
// Este Navigator gestionará la navegación entre las pantallas de la aplicación.
const Drawer = createDrawerNavigator();


// Áreas seguras son aquellas que no están cubiertas por barras de estado, 
// barras de navegación, notches u otros elementos del sistema operativo que pueden superponerse al contenido de la aplicación.

// forceInset se utiliza aquí para asegurar que haya un relleno en la parte superior (top) 
// para evitar que el contenido se superponga con la barra de estado. 
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image source={require('./imagenes/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props} /> 
        {/* pasa todas las props en una */}
      </SafeAreaView>
    </DrawerContentScrollView>
  )
}

// parece que sin SafeAreaView se queda más encima y queda mejor (xiaomi)

// DrawerContentScrollView
// DrawerItemList: sin ella no muestra lista
function HomeNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name='menu' size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
        // headerLeft puede ir también en Stack.Screen

      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Campo Base',
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavegador() {
  return (

    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />} // {..props } -> spread sintax
      // para pasar todas las props de un componente padre a un componente hijo de manera sencilla y eficiente
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colorGaztaroaClaro,
        },
      }}
    >
      <Drawer.Screen name="Campo base" component={HomeNavegador}
        options={{
          drawerIcon: ({ tintColor }) => ( // definicion de icono del drawer
            <Icon
              name='home'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />

      <Drawer.Screen name="Quiénes somos" component={QuienesSomosNavegador}
        options={{
          drawerIcon: ({ tintColor }) => ( // definicion de icono del drawer
            <Icon
              name='info-circle'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name="Calendario" component={CalendarioNavegador}
        options={{
          drawerIcon: ({ tintColor }) => ( // definicion de icono del drawer
            <Icon
              name='calendar'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }} />
      <Drawer.Screen name="Contacto" component={ContactoNavegador}
        options={{
          drawerIcon: ({ tintColor }) => ( // definicion de icono del drawer
            <Icon
              name='address-card'
              type='font-awesome'
              size={24}
              color={tintColor}
            />
          )
        }} />
    </Drawer.Navigator>
  );
}

function CalendarioNavegador({ navigation }) {
  return (
    //estilo encabezado, opciones de navegacion
    <Stack.Navigator
      initialRouteName="Calendar"
      headerMode="float" // flotan sobre el contenido de la pantalla
      screenOptions={{
        headerTintColor: '#fff', // color del texto del encabezado
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' } // estilo del texto del título del encabezado

      }}
    >
      <Stack.Screen // pantalla navegacion
        name="Calendar"
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa',
          headerLeft: () => (<Icon name='menu' size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),


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

function ContactoNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Contact"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name='menu' size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),

        // headerTitleAlign: 'center', // Alinea el título al centro
      }}
    >
      <Stack.Screen
        name="Contact"
        component={Contacto}
        options={{
          title: 'Contacto',
        }}
      />
    </Stack.Navigator>
  );

}

function QuienesSomosNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="QuienesSomos"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (<Icon name='menu' size={28} color='white' onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />),
        // headerTitleAlign: 'center', // Alinea el título al centro
      }}
    >
      <Stack.Screen
        name="QuienesSomos"
        component={QuienesSomos}
        options={{
          title: 'Quiénes Somos',
        }}
      />
    </Stack.Navigator>
  );

}

class Campobase extends Component {

  componentDidMount() { // SE CARGA AL MONTAR COMPONENTE, SE LLAMA A ACCIONES DE REDUX
    this.props.fetchExcursiones();
    this.props.fetchComentarios();
    this.props.fetchCabeceras();
    this.props.fetchActividades();
  }

  render() {
    return (
      // contexto de navegacion, permite a su contenido acceder a funcionalidades de navegacion
      <NavigationContainer>
        {/* <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}> */}
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 0 }}>

          {/* <CalendarioNavegador /> */}
          <DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

// export default Campobase;
export default connect(mapStateToProps, mapDispatchToProps)(Campobase);

