import { SAVE_ESCHEDULE } from '../actions/ActionTypes';

const initialState = {
    data:[]
};

const escheduleReducer = (state = initialState, action) => {
  switch(action.type) {
    case SAVE_ESCHEDULE:     
        state.data= action.payload
        return {
            ...state,
            //data= action.payload
        };
       
    default:
      return state;
  }
}

export default escheduleReducer;