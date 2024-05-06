
import { Component } from 'react';
import { Card, ListItem, Avatar } from '@rneui/themed';
import { Text, FlatList } from 'react-native';
// import { ACTIVIDADES } from '../comun/actividades';
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        actividades: state.actividades
    }
}

function Historia() {

    return (
        <Card>
            <Card.Title>Un poquito de historia</Card.Title>
            <Card.Divider />
            <Text>
                El nacimiento del club de montaña Gaztaroa se remonta a la
                primavera de 1976 cuando jóvenes aficionados a la montaña y
                pertenecientes a un club juvenil decidieron crear la sección
                montañera de dicho club. Fueron unos comienzos duros debido sobre
                todo a la situación política de entonces. Gracias al esfuerzo
                económico de sus socios y socias se logró alquilar una bajera.
                Gaztaroa ya tenía su sede social.
            </Text>
            <Text></Text>
            <Text>
                Desde aquí queremos hacer llegar nuestro agradecimiento a todos
                los montañeros y montañeras que alguna vez habéis pasado por el
                club aportando vuestro granito de arena            </Text>
            <Text></Text>
            <Text>
                Gracias
            </Text>
        </Card>

    );

}

// se puede mirar meter historia de fichero externo, añadiendolo como actividades

class QuienesSomos extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         actividades: ACTIVIDADES
    //     };
    // }

    render() {

        const renderCardItem = ({ item }) => {
            return (
                <ListItem bottomDivider>
                    <Avatar source={{ uri: baseUrl + item.imagen }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );

        }

        return (
            <>

                <Historia />
                {/* si no se pone scrollview no se ve la lista completa */}
                <ScrollView>

                    <Card>
                        <Card.Title>Actividades y recursos</Card.Title>
                        <Card.Divider />

                        <FlatList scrollEnabled={false}
                            //ListHeaderComponent={() => null} // Para evitar que se renderice el header predeterminado de FlatList
                            //ListFooterComponent={() => null} // Para evitar que se renderice el footer predeterminado de FlatList
                            // data={this.state.actividades}
                            data={this.props.actividades.actividades}
                            renderItem={renderCardItem}
                            keyExtractor={item => item.id.toString()}


                        />
                                                    {console.log(this.props.actividades.actividades)}


                    </Card>
                </ScrollView>

            </>

        );
    }
}

// export default QuienesSomos;
export default connect(mapStateToProps)(QuienesSomos);