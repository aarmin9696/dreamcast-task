import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../API/userAPI';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getUsers(); // Use the API layer function
    return response.data;
  });

const userSlice = createSlice({
  name: 'users',
  initialState: { data: [], status: 'idle' },
  reducers: {
    addUser: (state, action) => {
      const maxId = state.data.length > 0 ? Math.max(...state.data.map(user => user.id)) : 0;
      state.data.push({
        ...action.payload,
        id: maxId + 1,
        address: {
          city: action.payload.city,
          zipcode: action.payload.zipcode
        }
      });
    },
    updateUser: (state, action) => {
      const { id, updatedUser } = action.payload;
      const index = state.data.findIndex(user => user.id === id);
      if (index !== -1) {
        // Spread existing user data and overwrite with updatedUser fields
        state.data[index] = { ...state.data[index], ...updatedUser };
      }
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
