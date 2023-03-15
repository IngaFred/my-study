import { configureStore } from '@reduxjs/toolkit'
import usersReduser from './modules/user'

const store = configureStore({
    reducer: {
        user: usersReduser
    }
})

export default store;