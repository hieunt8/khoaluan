import { SAVE_ACCOUNT } from '../actions/ActionTypes';

const initialState = {
  
};

const accountReducer = (state = initialState, action) => {
  switch(action.type) {
    case SAVE_ACCOUNT:
      //state = action.data
      state = action.payload
      return {
        //count: count + 1,
         ...state
      }
    default:
      return state;
  }
}

export default accountReducer;