import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import { EXCURSIONES } from '../comun/excursiones';
// Component para crear componentes de clase
// Campobase clase de componentes
class Campobase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES
        };
    }
    render() {
        return (
            <Calendario excursiones={this.state.excursiones} />
        );
    }
}
export default Campobase;