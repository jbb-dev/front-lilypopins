import { createContext } from 'react'

export const userProfileContext = {
    user_email : '',
    user_password: '',
    user_firstname : '',
    user_lastname : '',
    user_city : '',
    user_postal : null,
    user_biography : '',

}

export const UserContext = createContext(null)
