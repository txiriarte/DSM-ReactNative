import React from 'react';
import { Text, ScrollView, View, StyleSheet, Image } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';

function RenderItem(props) {
    const item = props.item;
    
    if (item != null) {
        return (
            <Card>
                <Card.Divider />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.nombre}</Text>
                </View>
                <Card.Image source={{uri: baseUrl + item.imagen}}/>
                <Text style={{ margin: 20 }}>
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
        color: 'chocolate',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
        zIndex: 1, // Asegura que el texto esté sobre la imagen
    },
    textContainer: {
        position: 'absolute', //position: 'absolute', lo que permite que el texto se superponga sobre la imagen. The element is removed from the normal document flow, and no space is created for the element in the page layout. The element is positioned relative to its closest positioned ancestor (if any) or to the initial containing block.
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center', // Centra horizontalmente
    }
});

export default Home;
