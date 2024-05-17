import authentication from './auth';
import userID from './userId';
import dimension from './dimension';
import quiz from './quiz';
import nav from './nav';
import resType from './resType';
import fontSize from './resType';

import { combineReducers } from 'redux';

const allReducres = combineReducers({
    authentication: authentication,
    userID: userID,
    dimension: dimension,
    quiz: quiz,
    nav: nav,
    resType: resType,
    fontSize: fontSize,
})

export default allReducres;