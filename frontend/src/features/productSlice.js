import {createSlice} from '@reduxjs/toolkit';

// appApi that will communicate with redux as well as our backend
import appApi from '../services/appApi';

const initialState =[];
export const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        updateProducts:(_,action)=>{
            return action.payload;
        }
    },
    // for deleting the product from admin [05:44:41]
    extraReducers: (builder)=>{
        builder.addMatcher(appApi.endpoints.createProduct.matchFulfilled,(_,{payload})=>payload)
        builder.addMatcher(appApi.endpoints.updateProduct.matchFulfilled,(_,{payload})=>payload)
        builder.addMatcher(appApi.endpoints.deleteProduct.matchFulfilled,(_,{payload})=>payload)

    }
})
export const {updateProducts}= productSlice.actions;
export default productSlice.reducer;