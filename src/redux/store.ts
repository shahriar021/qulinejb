import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./createdApi/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // watchLater: watchLaterReducer,
    // recentlyViewed: recentlyViewedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
