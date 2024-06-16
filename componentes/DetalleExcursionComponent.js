import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, FlatList, Modal, Button } from 'react-native';
import { Card, Icon, Input } from '@rneui/themed';
// import { EXCURSIONES } from '../comun/excursiones';
// import { COMENTARIOS } from '../comun/comentarios';
import { ListItem } from '@rneui/base';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { Rating } from 'react-native-ratings'; // estrellas formulario
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun'; // para modal


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

// dispatch es una funcion
const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})


function RenderExcursion(props) {

    const excursion = props.excursion;

    if (excursion != null) {
        return (
            <Card>
                <Card.Divider />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{excursion.nombre}</Text>
                </View>
                <Card.Image source={{ uri: baseUrl + excursion.imagen }} />

                <Text style={{ margin: 20 }}>
                    {excursion.descripcion}
                </Text>
                {/* boton fav */}
                <View style={styles.icons}>

                    <Icon
                        raised // Adds box shadow to button.
                        reverse // Reverses color scheme.
                        name={props.favorita ? 'heart' : 'heart-o'} // heart y heart-o dentro de font-awesome
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}

                    />
                    {/* Icono para formulario */}
                    <Icon
                        raised
                        reverse
                        name={'pencil'} // añadir comentarios
                        type='font-awesome'
                        color='#0000ff'
                        onPress={() => props.onPress2()}
                    />
                </View>


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
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // excursiones: EXCURSIONES,
    //         // comentarios: COMENTARIOS,
    //         favoritos: []
    //     };

    // }
    constructor(props) {
        super(props);
        this.state = { //DATOS DEL FORMULARIO EN EL ESTADO
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false
        }
    }

    marcarFavorito(excursionId) {
        // this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
        this.props.postFavorito(excursionId);

    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal }); // sigue en estado
    }

    // gestionarComentario(excursionId, valoracion, autor, comentario) {
    gestionarComentario(excursionId) {
        console.log(this.state.valoracion, this.state.autor, this.state.comentario);
        this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario); // en ActionReducers recibe 4 params, a traves de Maps...
        this.toggleModal(); //alterno apertura y cierre modal
    }

    resetForm() {
        this.setState({
            valoracion: 3,
            autor: '',
            comentario: '',
            dia: '',
            showModal: false
        });
    }



    render() { // Metodo que se llama automaticamente cuando se renderiza el comp
        const { excursionId } = this.props.route.params; // parece que viene de navigate

        return (
            <ScrollView>
                <RenderExcursion
                    //excursion={this.state.excursiones[+excursionId]} // conversion a numero
                    excursion={this.props.excursiones.excursiones[+excursionId]} // viene de redux
                    //favorita={this.state.favoritos.some(el => el === excursionId)} // .some de JS, verifica si algun elto cumple
                    // retorna true si al menos uno cumple la función de callback
                    favorita={this.props.favoritos.favoritos.some(el => el === excursionId)} // .some de JS, verifica si algun elto cumple
                    onPress={() => this.marcarFavorito(excursionId)}
                    onPress2={() => this.toggleModal()}
                    modal={this.state.showModal}


                />
                <Modal
                    animationType={"slide"} // Define el tipo de animación que se usará cuando el modal se muestre o se oculte.
                    transparent={false} // Define si el fondo del modal será transparente o no
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()} // Al cierre
                    onRequestClose={() => this.toggleModal()} // Este evento se dispara cuando se intenta cerrar el modal, por ejemplo, presionando el botón de atrás en un dispositivo Android
                >
                    {/* dentro del modal (abajo) */}
                    <View style={styles.modalContent}>
                        {/* <Text style={{ textAlign: 'center' }}>Rating {this.state.valoracion}/{5}</Text> */}
                        <Rating style={styles.rating} //estrellas
                            showRating // Muestra el texto de la calificación.
                            startingValue={3}
                            onFinishRating={rating => { this.setState({ valoracion: rating }) }}
                        //  Actualiza el estado valoracion con el valor seleccionado.
                        />
                        <Input
                            placeholder="  Autor" //Texto de marcador de posición.
                            leftIcon={{ type: 'font-awesome', name: 'user' }} // Icono a la izquierda del campo (un icono de usuario).
                            onChangeText={value => this.setState({ autor: value })} // Actualiza el estado autor con el texto ingresado.
                        />
                        <Input
                            placeholder="  Comentario"
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            onChangeText={value => this.setState({ comentario: value })}
                        />
                        <View style={styles.enviarContent}>
                            <Button
                                color={colorGaztaroaOscuro}
                                title="ENVIAR"
                                onPress={() => { this.gestionarComentario(excursionId); this.resetForm(); }}
                            // gestiono comentario y reseteo 
                            />
                            <View style={styles.cancelarContent} />
                            {/* separa envia de cancelar */}
                            <Button
                                color={colorGaztaroaClaro}
                                title="CANCELAR"
                                onPress={() => { this.toggleModal(); this.resetForm() }}
                            />
                        </View>

                    </View>
                </Modal>


                <RenderComentarios
                    //comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
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
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50
    },
    rating: {
        paddingVertical: 10
    },
    enviarContent: {
        flexDirection: 'column',//row
        justifyContent: 'center'
        // alignItems: 'center',
    },
    cancelarContent: {
        height: 10 //width
    }

});


// export default DetalleExcursion;
export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
