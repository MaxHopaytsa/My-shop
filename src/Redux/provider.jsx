'use client'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import LoadingCircle from '../app/components/other/LoadingCircle'
export function Providers ({children}){
return(
    <Provider store={store}>
        <PersistGate loading={<LoadingCircle/> } persistor={persistor}> 
            {children}
        </PersistGate>
    </Provider>
)
}
