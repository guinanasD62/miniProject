// userSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    username: string;
    password: string;
    email?: string;
    name?: string;
}

interface UserState {
    users: User[];
    currentUser?: User;
}

// Initialize state from localStorage or fallback to defaults
const initialState: UserState = {
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    currentUser: undefined
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Reducer to add a user and update localStorage
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
            // Update localStorage whenever a new user is added
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        // Reducer to set the current user in the state
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        // Assuming other existing reducers here, add or modify as necessary
    }
});



export const { addUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
