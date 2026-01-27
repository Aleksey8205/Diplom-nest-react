import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ActiveChat = string; 

const initialState = {
  activeChats: [] as ActiveChat[], 
  connectionStatus: 'disconnected' as 'connected' | 'disconnected',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addActiveChat(state, action: PayloadAction<ActiveChat>) {
      state.activeChats.push(action.payload);
    },
    removeActiveChat(state, action: PayloadAction<ActiveChat>) {
      state.activeChats = state.activeChats.filter(chat => chat !== action.payload);
    },
    setConnectionStatus(state, action: PayloadAction<'connected' | 'disconnected'>) {
      state.connectionStatus = action.payload;
    },
  },
});

export const { addActiveChat, removeActiveChat, setConnectionStatus } = chatSlice.actions;
export default chatSlice.reducer;