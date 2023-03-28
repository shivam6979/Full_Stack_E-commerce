import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// create the api
const appApi=createApi({
    reducerPath:'appAPi',
    baseQuery:fetchBaseQuery({baseUrl: 'http://localhost:8000'}),
    endpoints :(builder)=>({
        signup:builder.mutation({
            query:(user)=>({
                url:'/users/signup',
                method:'POST',
                body:user,
            }),
        }),

        login:builder.mutation({
            query:(user)=>({
                url:'/users/login',
                method:'POST',
                body:user,
            }),
        }),
    // creating products [1:59:42]
        createProduct:builder.mutation({
            query:(product)=>({
                url:'/products',
                body:product,
                method:'POST',

            }),
        }),

        // delete Product for admin [05:40:05]
        deleteProduct: builder.mutation({
            query:({product_id, user_id})=>({
                url:`/products/${product_id}`,
                body:{
                    user_id,
                },
                method:"DELETE"
            }),
        }),

        // update product for admin[05:41:16]
        updateProduct: builder.mutation({
            query:(product)=>({
                url:`/products/${product.id}`,
                body: product,
                method:"PATCH"
            }),
        }),


        // add product to cart [3:44:30]
        addToCart:builder.mutation({
            query:(cartInfo)=>({
                url:'/products/add-to-cart',
                body:cartInfo,
                method:'POST'
            }),
        }),

        // Remove from cart [3:45:16]
        removeFromCart:builder.mutation({
            query:(body)=>({
                url:'/products/remove-from-cart',
                body,
                method:'POST'
            }),
        }),

        // increase count of product [3:45:57]
        increaseCartProduct:builder.mutation({
            query:(body)=>({
                url:'/products/increase-cart',
                body,
                method:'POST'
            }),
        }),

        // decrease count of product [3:46:24]
        decreaseCartProduct:builder.mutation({
            query:(body)=>({
                url:'/products/decrease-cart',
                body,
                method:'POST'
            }),
        }),

        // create order[05:20:49]
        createOrder:builder.mutation({
            query:(body)=>({
                url:"/orders",
                method:"POST",
                body,
            }),
        }),
    }),

});
export const {useSignupMutation, useLoginMutation, useCreateProductMutation, useAddToCartMutation,
    useRemoveFromCartMutation, useIncreaseCartProductMutation, useDecreaseCartProductMutation, useCreateOrderMutation, useDeleteProductMutation, useUpdateProductMutation  } = appApi
export default appApi;

// ok