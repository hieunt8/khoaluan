import { SAVE_DEADLINE } from '../actions/ActionTypes';

const initialState = {
  
};

const deadlineReducer = (state = initialState, action) => {
  switch(action.type) {
    case SAVE_DEADLINE:     
        state = action.payload
        return {
            ...state
        };
       
    default:
      return state;
  }
}

export default deadlineReducer;