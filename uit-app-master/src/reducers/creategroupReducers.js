import { SAVE_CREATEGROUP } from '../actions/ActionTypes';

const initialState = {

};

const creategroupReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CREATEGROUP:
      state = action.payload
      return {
        ...state
      };

    default:
      return state;
  }
}

export default creategroupReducers;