import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const citizensAdapter = createEntityAdapter({
  selectId: (citizen) => citizen.id,
  sortComparer: (preCitizen, nextCitizen) => preCitizen.id.localeCompare(nextCitizen.id),
});

const citizensSlice = createSlice({
  name: 'citizens',
  initialState: citizensAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  reducers: {
    addCitizen: citizensAdapter.addOne,
    updateCitizen: citizensAdapter.updateOne,
    removeCitizen: citizensAdapter.removeOne,
  },
  extraReducers: {},
});

export const {
  selectAll: selectAllCitizens,
  selectById: selectCitienById,
  selectIds: selectAllCitizenIds,
  selectEntities: selectAllCitizenEntities,
  selectTotal: selectTotalCitizenSlice,
} = citizensAdapter.getSelectors((state) => state.citizens);

export const citizensApi = createApi({
  reducerPath: 'citizens',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: () => ({}),
});

export default citizensSlice.reducer;
