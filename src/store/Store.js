import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import { PersistGate } from 'redux-persist/integration/react'
  import storage from 'redux-persist/lib/storage'
import amazonReducer from '../store/amazonSlice'
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, amazonReducer)
export const store = configureStore({
  reducer: {amazon:persistedReducer},
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:{
        ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
    }
  })
})
export let persistor = persistStore(store)