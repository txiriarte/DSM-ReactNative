import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {

    const excursion = props.excursion;
    
        if (excursion != null) {
            return(
            <Card>
              <Card.Title>{excursion.nombre}</Card.Title>
              <Card.Divider/>
              <Card.Image source={require('./imagenes/40Años.png')}></Card.Image>
              <Text style={{margin: 20}}>
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

export default DetalleExcursion;
