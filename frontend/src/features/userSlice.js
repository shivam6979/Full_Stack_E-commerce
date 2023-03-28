import {createSlice} from '@reduxjs/toolkit';
// appApi that will communicate with redux as well as our backend
import appApi from '../services/appApi';

const initialState =null;  // don't have a user so say null
export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logout:()=> initialState,
    },
    // store data in our state
    extraReducers:(builder)=>{
        builder.addMatcher(appApi.endpoints.signup.matchFulfilled,(_,{payload}) =>payload)
        builder.addMatcher(appApi.endpoints.login.matchFulfilled,(_,{payload}) =>payload)
        // user cart not updating [04:05:00];{
        builder.addMatcher(appApi.endpoints.addToCart.matchFulfilled,(_,{payload}) =>payload)
    // }
        builder.addMatcher(appApi.endpoints.removeFromCart.matchFulfilled,(_,{payload}) =>payload)
        builder.addMatcher(appApi.endpoints.increaseCartProduct.matchFulfilled,(_,{payload}) =>payload)
        builder.addMatcher(appApi.endpoints.decreaseCartProduct.matchFulfilled,(_,{payload}) =>payload)
        builder.addMatcher(appApi.endpoints.createOrder.matchFulfilled,(_,{payload}) =>payload)

    }
})
export const {logout} = userSlice.actions
export default userSlice.reducer;


