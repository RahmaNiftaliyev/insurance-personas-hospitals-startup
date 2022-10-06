import { hospitalsApi } from './hospitalsSlice';
import { citizensApi } from './citizensSlice';

const allExtendedApi = [hospitalsApi, citizensApi].map((api) => {
  return api.injectEndpoints({
    endpoints: (builder) => ({
      getHospitals: builder.query({
        query: () => `/users`,
      }),
      addHospital: builder.mutation({
        query: (newHospital) => ({
          url: '/users',
          method: 'POST',
          body: newHospital,
        }),
      }),
      updateHospital: builder.mutation({
        query: (updatedHospital) => ({
          url: `/users/${updatedHospital.id}`,
          method: 'PUT',
          body: updatedHospital,
        }),
      }),
      deleteHospital: builder.mutation({
        query: (hospitalId) => ({
          url: `/users/${hospitalId}`,
          method: 'DELETE',
        }),
      }),
      getCitizens: builder.query({
        query: () => `/users`,
      }),
      addCitizen: builder.mutation({
        query: (newCitizen) => ({
          url: '/users',
          method: 'POST',
          body: newCitizen,
        }),
      }),
      updateCitizen: builder.mutation({
        query: (updatedCitizen) => ({
          url: `/users/${updatedCitizen.id}`,
          method: 'PUT',
          body: updatedCitizen,
        }),
      }),
      deleteCitizen: builder.mutation({
        query: (citizenId) => ({
          url: `/users/${citizenId}`,
          method: 'DELETE',
        }),
      }),
    }),
  });
});

export const {
  useGetHospitalsQuery,
  useAddHospitalMutation,
  useUpdateHospitalMutation,
  useDeleteHospitalMutation,
} = allExtendedApi[0].endpoints;

export const {
  useGetCitizensQuery,
  useAddCitizenMutation,
  useUpdateCitizenMutation,
  useDeleteCitizenMutation,
} = allExtendedApi[1].endpoints;
