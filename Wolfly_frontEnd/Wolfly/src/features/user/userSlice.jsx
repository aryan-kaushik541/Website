import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    access_token: null,
}

export const userSlice = createSlice({
    name:'auth_token',
    initialState,
    reducers:{
        setUserToken:(state,actions)=>{
            state.access_token=actions.payload.access_token;
        },
        unSetUserToken:(state)=>{
            state.access_token=null;
        },

    }
})

export const { setUserToken,unSetUserToken } = userSlice.actions
export default userSlice.reducer