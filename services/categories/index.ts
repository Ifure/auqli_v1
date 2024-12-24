import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@env'

import { getRequest, putRequest, postRequest } from '@/core';
import { getToken } from '@/store/features/auth/utils';
import { SelectedCategoriesRequest } from '@/types/types';

export const category = createApi({
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL + 'api',
        prepareHeaders: async (headers) => {
            const token = getToken();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        uploadCategories: builder.mutation<any, SelectedCategoriesRequest>({
            query: (credentials) => putRequest('/buyer/selected-categories', credentials),
        }),

    }),
});

export const {
    useUploadCategoriesMutation
} = category;
