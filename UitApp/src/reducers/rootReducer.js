import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import deadlineReducer from './deadlineReducer';
import escheduleReducer from './escheduleReducer';
import select_date from './selectDate';
import daaCroomReducer from './daaCroomReducer';
import compensatoryReducers from './compensatoryReducers';
import resCommentReducers from './resCommentReducers';
import scheduleReducer from './scheduleReducer';

import creategroupReducers from './creategroupReducers';

const rootReducer = combineReducers({
    accountReducer,
    deadlineReducer,
    escheduleReducer,
    select_date,
    daaCroomReducer,
    compensatoryReducers,
    resCommentReducers,
    scheduleReducer,
    creategroupReducers
});

export default rootReducer;
