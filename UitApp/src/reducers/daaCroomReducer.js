import { SAVE_DAA_CROOM } from '../actions/ActionTypes';

const initialState = {
  
};

const daaCroomReducer = (state = initialState, action) => {
  switch(action.type) {
    case SAVE_DAA_CROOM:
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

export default daaCroomReducer;