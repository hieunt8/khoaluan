import { SELECT_DATE } from '../actions/ActionTypes';

const initialState = {
  
};

const select_date = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_DATE:
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

export default select_date;