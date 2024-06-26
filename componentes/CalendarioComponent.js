// COMPONENTE VENTANA CALENDARIO
import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
// import { EXCURSIONES } from '../comun/excursiones';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import IndicadorActividad from './IndicadorActividadComponent';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones
    }
}

class Calendario extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         excursiones: EXCURSIONES
    //     };
    // }

    render() {

        // proporciona acceso a varios métodos de navegación, como navigate, goBack, push, pop, entre otros
        // {} desestructuracion, extraigo solo propiedad navigate de navigation y la asigna a la variable
        // en lugar de tener que escribir this.props.navigation.navigate(...)
        const { navigate } = this.props.navigation;

        // al click, navego a DetalleExcursion
        const renderCalendarioItem = ({ item, index }) => {
            return (
                <ListItem
                    key={index}
                    onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                    bottomDivider>
                    <Avatar source={{ uri: baseUrl + item.imagen }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        };

        if (this.props.excursiones.isLoading) { // parece que este bloque de ifs ha de estar abajo por orden de funcion renderCalendario...
            return (
                <IndicadorActividad />
            );
        }

        else if (this.props.excursiones.isLoading) {
            return (
                <View>
                    <Text>{this.props.excursiones.errMess}</Text>
                </View>
            );
        }


        else {
            return (
                <SafeAreaView>
                    <FlatList
                        // data={this.state.excursiones}
                        data={this.props.excursiones.excursiones}
                        renderItem={renderCalendarioItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </SafeAreaView>
            );

        }

    }
}

// export default Calendario;
export default connect(mapStateToProps)(Calendario);
