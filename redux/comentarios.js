import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload}; // retorna nuevo estado
    


    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};
      // { ...state, errMess: action.payload }
      // 1. Se crea nuevo obj que contiene todas la propiedades y valores del objeto state
      // 2. Tiene la propiedad errMess actualizada o añadida con el valor de action.payload.


    case ActionTypes.ADD_COMENTARIO:
      //const comentario = action.payload;
      //return { ...state, comentarios: state.comentarios.concat(comentario) };
      const comentario = { ...action.payload, id: state.comentarios.length }; // Ensure ID is set
      // importante id para iterar con FlatList
      return { ...state, comentarios: state.comentarios.concat(comentario) };


    default:
      return state;
  }
};