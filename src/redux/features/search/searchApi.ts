import { baseApi } from "../../createdApi/baseApi";

const searchApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getSearchItem:builder.query({
            query:(value)=>{
                return {
                  url: "/search/movie",
                  method: "GET",
                  params: {
                    query: value,
                  },
                };
            }
        })
    })
})

export const {useGetSearchItemQuery}=searchApi