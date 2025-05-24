import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    'x-rapidapi-key': 'c470b27062msh21b6f015ac93d7ep121a07jsnb698adcb4849',
	'x-rapidapi-host': 'real-time-bing-search-apis.p.rapidapi.com'
}

const baseUrl = 'https://real-time-news-data.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: ( builder ) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/search?query=${newsCategory}&limit=${count}&time_published=anytime&country=US&lang=en`)
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;