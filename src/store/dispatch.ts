import { createActionDispatcher } from 'oo-redux-utils2';
import store from './store';

const dispatch = createActionDispatcher(store.dispatch);

export default dispatch;
