import { configureStore } from "@reduxjs/toolkit";
import cacheSlice from "./reducers/cacheSlice";
import textoSlice from "./reducers/textoSlice";
import globalSlice from "./reducers/globalSlice";

export const store = configureStore({
  reducer: {
    cache: cacheSlice,
    texto: textoSlice,
    global: globalSlice
  },
});

export default store;
