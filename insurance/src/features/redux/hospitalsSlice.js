import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const hospitalsAdapter = createEntityAdapter({
  selectId: (hospital) => hospital.id,
  sortComparer: (preHospital, nextHospital) => preHospital.id.localeCompare(nextHospital.id),
});

const hospitalsSlice = createSlice({
  name: 'hospitals',
  initialState: hospitalsAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  reducers: {
    addHospital: hospitalsAdapter.addOne,
    updateHospital: hospitalsAdapter.updateOne,
    removeHospital: hospitalsAdapter.removeOne,
  },
  extraReducers: {},
});

export const {
  selectAll: selectAllHospitals,
  selectById: selectHospitalById,
  selectIds: selectAllHospitalIds,
  selectEntities: selectAllHospitalEntities,
  selectTotal: selectTotalHospitalSlice,
} = hospitalsAdapter.getSelectors((state) => state.hospitals);

export const hospitalsApi = createApi({
  reducerPath: 'hospitals',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({}),
});

export default hospitalsSlice.reducer;
