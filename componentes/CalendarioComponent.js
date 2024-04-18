import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import { EXCURSIONES } from '../comun/excursiones';

class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }

    render(){

    // proporciona acceso a varios métodos de navegación, como navigate, goBack, push, pop, entre otros
    // {} desestructuracion, extraigo solo propiedad navigate de navigation y la asigna a la variable
    // en lugar de tener que escribir this.props.navigation.navigate(...)
    const { navigate } = this.props.navigation;    

    // al click, navego a DetalleExcursion
    const renderCalendarioItem = ({item, index}) => {
        return (
            <ListItem
            key={index}
            onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
            bottomDivider>
                <Avatar source={require('./imagenes/40Años.png')} />
                <ListItem.Content>
                    <ListItem.Title>{item.nombre}</ListItem.Title>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem> 
        );
    };

    return (
        <SafeAreaView>
            <FlatList 
                data={this.state.excursiones}
                renderItem={renderCalendarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
    }
}

export default Calendario;
