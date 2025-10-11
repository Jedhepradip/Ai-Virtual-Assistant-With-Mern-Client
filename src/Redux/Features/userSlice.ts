// src/redux/userSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the type for User
interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    history: string[];
    assistantName?: string;
    assistantImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

// Async thunk
export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api-user/current-user`, {
                withCredentials: true,
            });
            return res.data.user;
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            console.error("Register error:", error);
            return rejectWithValue(error.response?.data?.message || "Invalid email or password!");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
