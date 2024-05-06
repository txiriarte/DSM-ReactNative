import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from '@rneui/themed';
// import { EXCURSIONES } from '../comun/excursiones';
// import { COMENTARIOS } from '../comun/comentarios';
import { ListItem } from '@rneui/base';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios
    }
}

function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{excursion.nombre}</Text>
                </View>
                <Card.Image source={{uri: baseUrl + excursion.imagen}} /> 

                <Text  style={{ margin:20 }}>
                    {excursion.descripcion}
                </Text>
                    {/* boton fav */}

                    <Icon
                        raised // Adds box shadow to button.
                        reverse // Reverses color scheme.
                        name={props.favorita ? 'heart' : 'heart-o'} // heart y heart-o dentro de font-awesome
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}

                    />

            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComentarios(props) {

    const comentarios = props.comentarios;
    
    const renderComentarioItem = ({ item, index }) => {
        return (
            <ListItem
                // key={index}
                bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item.comentario}</ListItem.Title>
                    <ListItem.Subtitle>{item.valoracion}</ListItem.Subtitle>
                    <ListItem.Subtitle>-- {item.autor}, {item.dia}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

        );

    };

    return (
        <Card>
            <Card.Title>Comentarios</Card.Title>
            <Card.Divider />
            <FlatList scrollEnabled={false}
                data={comentarios}
                renderItem={renderComentarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>

    )

}


class DetalleExcursion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // excursiones: EXCURSIONES,
            // comentarios: COMENTARIOS,
            favoritos: []
        };

    }

    marcarFavorito(excursionId) {
        this.setState({ favoritos: this.state.favoritos.concat(excursionId) });

    }

    render() { // Metodo que se llama automaticamente cuando se renderiza el comp
        const { excursionId } = this.props.route.params; // parece que viene de navigate

        return (
            <ScrollView>
                <RenderExcursion
                    //excursion={this.state.excursiones[+excursionId]} // conversion a numero
                    excursion={this.props.excursiones.excursiones[+excursionId]} // viene de redux
                    favorita={this.state.favoritos.some(el => el === excursionId)} // .some de JS, verifica si algun elto cumple
                    // retorna true si al menos uno cumple la función de callback
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                <RenderComentarios
                    //comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                    // revisar si es correcto contenido de filter, o si se debieria acceder this.props...
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        padding: 5,
        zIndex: 1, // Asegura que el texto esté sobre la imagen
    },
    textContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center', // Centra horizontalmente
    }
});


// export default DetalleExcursion;
export default connect(mapStateToProps)(DetalleExcursion);
