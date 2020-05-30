import { SAVE_LISTUSER } from '../actions/ActionTypes';

const initialState = {

};

const creategroupReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LISTUSER:
      state = action.payload
      return {
        ...state
      };

    default:
      return state;
  }
}

export default listuserReducer;