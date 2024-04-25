import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {

    const excursion = props.excursion;
    
        if (excursion != null) {
            return(
            <Card>
              <Card.Divider/>
              <View>
                <Text style={styles.title}>{excursion.nombre}</Text>
                <Image source={require('./imagenes/40Años.png')} style={styles.image} />
              </View>
              <Text style={styles.description}>
                {excursion.descripcion}
              </Text>
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class DetalleExcursion extends Component {
        constructor(props) {
            super(props);
            this.state = {
                excursiones: EXCURSIONES
            };
        }
      
        render(){ // Metodo que se llama automaticamente cuando se renderiza el comp
            const {excursionId} = this.props.route.params; // parece que viene de navigate
            return(<RenderExcursion excursion={this.state.excursiones[+excursionId]} />); // + -> conversion a numero
        }
}

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

export default DetalleExcursion;
