// campo base component
import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, Image } from 'react-native';
import { Card } from '@rneui/themed';
//  import { EXCURSIONES } from '../comun/excursiones'; ahora redux
//  import { CABECERAS } from '../comun/cabeceras';
//  import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent'; // parece que si no pones llaves casca al cargar


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

function RenderItem(props) {
    const item = props.item;
  
    if (props.isLoading) {
        return (
            
              <IndicadorActividad />
        );
    }

    else if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    else {
        if (item != null) {
            return (
                <Card>
                    <Card.Divider />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.nombre}</Text>
                    </View>
                    <Card.Image source={{ uri: baseUrl + item.imagen }} />
                    <Text style={{ margin: 20 }}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        } else {
            return (<View></View>);
        }

    }

}

class Home extends Component { // parece que como componente funcional no puede interactactuar con redux correctamente
    render() {

        return (
            <ScrollView>
              
                {/* abajo como en pdf */}
                {/* <RenderItem item={this.props.excursiones.excursiones.filter((excursion) =
                 > excursion.destacado)[0]}
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                /> */}
                <RenderItem item={this.props.cabeceras.cabeceras.find(cabecera => cabecera.destacado)} 
                    isLoading={this.props.cabeceras.isLoading}
                    errMess={this.props.cabeceras.errMess}
                />

                <RenderItem item={this.props.excursiones.excursiones.find(excursiones => excursiones.destacado)} 
                    isLoading={this.props.excursiones.isLoading}
                    errMess={this.props.excursiones.errMess}
                 />
                <RenderItem item={this.props.actividades.actividades.find(actividad => actividad.destacado)} 
                     isLoading={this.props.actividades.isLoading}
                     errMess={this.props.actividades.errMess}
                />
           

            </ScrollView>
        );

    }
}

// const Home = () => {
//     return (
//         <ScrollView>
//             {/* <RenderItem item={CABECERAS.find(cabecera => cabecera.destacado)} />
//             <RenderItem item={EXCURSIONES.find(excursion => excursion.destacado)} />
//             <RenderItem item={ACTIVIDADES.find(actividad => actividad.destacado)} /> */}

//             <RenderItem item={this.props.excursiones.excursiones.find(cabecera => cabecera.destacado)} />
//             <RenderItem item={EXCURSIONES.find(excursion => excursion.destacado)} />
//             <RenderItem item={ACTIVIDADES.find(actividad => actividad.destacado)} />
//         </ScrollView>
//     );
// };

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

//export default Home;
export default connect(mapStateToProps)(Home);

