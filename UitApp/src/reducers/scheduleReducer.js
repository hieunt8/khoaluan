import { SAVE_SCHEDULE } from '../actions/ActionTypes';

const initialState = {
    data:[]
};

const scheduleReducer = (state = initialState, action) => {
  switch(action.type) {
    case SAVE_SCHEDULE:     
        state.data= action.payload
        return {
            ...state,
            //data= action.payload
        };
       
    default:
      return state;
  }
}

export default scheduleReducer;