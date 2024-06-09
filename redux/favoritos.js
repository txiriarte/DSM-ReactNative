import * as ActionTypes from './ActionTypes';



export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            if (!state.favoritos.includes(action.payload)) {
                return { ...state, favoritos: [...state.favoritos, action.payload] };
            }
            return state;
        
        default:
            return state;
    }
};


