import React from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';

function Calendario(props) {
    const renderCalendarioItem = ({ item, index }) => {
        return (
            // cuando se establece a true, bottomDivider añade linea de separación al final del componente
            // ListItem requiere de key
            <ListItem key={index} bottomDivider>
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
            {/* funcion map implicita en FlatList */}
            <FlatList
                data={props.excursiones}
                // renderItem proporciona index e item automaticamente (pueden tener otros nombres)
                renderItem={renderCalendarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}
export default Calendario;