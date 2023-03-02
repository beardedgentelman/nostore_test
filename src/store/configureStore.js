import { configureStore } from '@reduxjs/toolkit'
import { subscribeToStore } from 'reducers/cartReducer'
import { rootReducer } from 'reducers/rootReducer'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

// subscribeToStore(store)

export const persistor = persistStore(store)
