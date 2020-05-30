import { createStore, applyMiddleware, compose } from 'redux';

// middlewares
import thunkMiddleware from 'redux-thunk';

// Import custom components
import rootReducer from '../reducers/rootReducer';



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


/**
 * Create a Redux store that holds the app state.
 */
const initialState = {}
const store = createStore(rootReducer, initialState, composeEnhancer(
    applyMiddleware(thunkMiddleware),
));

export default store;