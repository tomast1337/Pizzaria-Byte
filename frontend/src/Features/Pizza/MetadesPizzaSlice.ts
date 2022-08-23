import {
    AsyncThunk,
    createAsyncThunk,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { BACKEND_URL } from '../../variables';

export interface MetadePizzaData {
    metades: string[][];
}

const metadesPizzaSlice = createSlice({
    name: 'metadesPizza',
    initialState: {
        metades: [[], [], [], []]
    },
    reducers: {
        setMetades: (state, action: PayloadAction<MetadePizzaData>) => {
            state.metades = action.payload.metades;
        }
    }
});
export const { setMetades } = metadesPizzaSlice.actions;

export const selectMetades = (state: RootState) => state.metadesPizza.metades;

export default metadesPizzaSlice.reducer;
