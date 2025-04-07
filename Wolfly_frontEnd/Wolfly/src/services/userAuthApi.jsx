import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { getToken } from './LocalStorageToken'
export const userAuthApi = createApi({
    reducerPath:"userAuthApi",
    baseQuery:fetchBaseQuery({baseUrl:'http://127.0.0.1:8000/'}),
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(user)=>{
                
                return{
                    url:'accounts/register/',
                    method:'POST',
                    body:user,
                    headers:{
                        'Content-type':'application/json'
                    }
                }
            },
        }),
        loginUser:builder.mutation({
            query:(user)=>{
                
                return{
                    url:'accounts/login/',
                    method:'POST',
                    body:user,
                    headers:{
                        'Content-type':'application/json'
                    }
                }
            },
        }),
        sendEmailPassword:builder.mutation({
            query:(user)=>{
                
                return{
                    url:'accounts/sendpasswordemail/',
                    method:'POST',
                    body:user,
                    headers:{
                        'Content-type':'application/json'
                    }
                }
            },
        }),
        getProfileUser:builder.query({
            query:(access_token)=>{
                
                return{
                    url:'accounts/profile/',
                    method:'GET',
                    headers:{
                        'Content-type':'application/json',
                        'authorization':`Bearer ${access_token}`
                    }
                }
            },
        }),
        changePassword:builder.mutation({
            query:({form,access_token})=>{
                return{
                    url:'accounts/passwordchange/',
                    method:'POST',
                    body:form,
                    headers:{
                        'Content-type':'application/json',
                        'authorization':`Bearer ${access_token}`
                    }
                }
            },
        }),

        resetPassword:builder.mutation({
            query:({form,id,token})=>{
               return{
                    url:`accounts/resetpassword/${id}/${token}/`,
                    method:'POST',
                    body:form,
                    headers:{
                        'Content-type':'application/json',
                    }
                }
            },
        }),
        getProducts: builder.query({
            query: () => "products/",
        }),
        getCartItem: builder.query({
            query:(access_token)=>{
            
                return{
                    url:'orders/cart/',
                    method:'GET',
                    headers:{
                        'Content-type':'application/json',
                        'authorization':`Bearer ${access_token}`
                    }
                }
                
            },
        }),


    addToCart:builder.mutation({
            query:({productInfo,access_token})=>{
                
                return{
                    url:'orders/cart/',
                    method:'POST',
                    body:productInfo,
                    headers:{
                        'Content-type':'application/json',
                        'authorization':`Bearer ${access_token}`
                    }
                }
            },
        }),
        
        updateCartItemQuantity: builder.mutation({
            query: ({ itemId, quantity, access_token }) => ({
              url: `orders/cart/${itemId}/`,
              method: 'PATCH',
              body: { quantity },
              headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${access_token}`
              }
            })
          }),


        deleteCartItem: builder.mutation({
            query: ( {itemId, access_token }) => {
           
                return {
                url: `orders/cart/${itemId}/`,
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${access_token}`
                }

            }
            },
        }),
        addAddress: builder.mutation({
            query: ({ addressData, access_token }) => ({
                url: "accounts/addaddress/",
                method: "POST",
                body: addressData,
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${access_token}`,
                },
            }),
        }),
        getAddress: builder.query({
            query:(access_token)=>{
            
                return{
                    url:'accounts/addaddress/',
                    method:'GET',
                    headers:{
                        'Content-type':'application/json',
                        'authorization':`Bearer ${access_token}`
                    }
                }
                
            },
        }),
        
    }),
})

export const { useRegisterUserMutation,useLoginUserMutation,useSendEmailPasswordMutation,useGetProfileUserQuery,useChangePasswordMutation,useResetPasswordMutation ,useGetProductsQuery,useGetCartItemQuery,useDeleteCartItemMutation,useAddToCartMutation,useUpdateCartItemQuantityMutation,useAddAddressMutation,useGetAddressQuery} = userAuthApi;