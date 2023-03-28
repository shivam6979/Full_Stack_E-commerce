import {configureStore} from '@reduxjs/toolkit';
import productSlice from './features/productSlice';
import userSlice from './features/userSlice';
import appApi from './services/appApi'


//  const store1=  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
//  export default store1

// ------------------------ persit our store -----------------------------
// users and product details save in our local storage even if we close the page means we don't have to login
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
//-------------------------- reducers -----------------------
const reducer = combineReducers({
    user:userSlice,
    products:productSlice,
    [appApi.reducerPath]:appApi.reducer,
 });
const persistConfig={
    key:'root',
    storage,
    blackList:[appApi.reducerPath,'products']
 };
// ---------------------- persist our store ----------------------
const persistedReducer = persistReducer(persistConfig, reducer);
// ----------------------create the store ---------------------------
const store = configureStore({
    reducer:persistedReducer,
    middleware:[thunk, appApi.middleware],
})
export default store;
// ok