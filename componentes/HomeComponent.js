import React from 'react';
import { Text, ScrollView, View, StyleSheet, Image } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';

function RenderItem(props) {
    const item = props.item;
    
    if (item != null) {
        return (
            <Card>
                <Card.Divider />
                <View>
                    <Text style={styles.title}>{item.nombre}</Text>
                    <Image source={require('./imagenes/40Años.png')} style={styles.image} />
                </View>
                <Text style={styles.description}>
                    {item.descripcion}
                </Text>
            </Card>
        );
    } else {
        return (<View></View>);
    }
}

const Home = () => {
    return (
        <ScrollView>
            <RenderItem item={CABECERAS.find(cabecera => cabecera.destacado)} />
            <RenderItem item={EXCURSIONES.find(excursion => excursion.destacado)} />
            <RenderItem item={ACTIVIDADES.find(actividad => actividad.destacado)} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    
    title: {
         position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 1,
        color: 'chocolate',
        fontWeight: 'bold',
        fontSize: 36,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
       
    },
    description: {
        margin: 20,
    },
});

export default Home;
