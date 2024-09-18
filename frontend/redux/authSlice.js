const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = state.payload
    }
  }
})

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;