import { SAVE_RESCOMMENT } from '../actions/ActionTypes';

const initialState = {
  
};

const daaCroomReducer = (state = initialState, action) => {
  switch(action.type) {
    case SAVE_RESCOMMENT:
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