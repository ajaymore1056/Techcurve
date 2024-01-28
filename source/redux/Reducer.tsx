import { createSlice } from '@reduxjs/toolkit'

const initialStateValues: any = {
  registerUserData: [],
  isLogin: false
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialStateValues,
  reducers: {
    increment: (state, action) => {
      const formValue = action.payload;
      state.registerUserData.push(formValue);
    },
    loginLogout: (state) => {
      state.isLogin = !state.isLogin;
    },
  },
});


// Action creators are generated for each case reducer function
export const { increment, loginLogout } = counterSlice.actions

export default counterSlice.reducer