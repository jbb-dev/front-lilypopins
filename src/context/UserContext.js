import { createContext } from 'react'

export const userProfileContext = {
    email : '',
    password: '',
    firstname : '',
    lastname : '',
    age : '',
    city : '',
    postalCode : '',
    biography : '',
    avatar : 'https://static.wixstatic.com/media/8fa7e6_09cf11c3e4584b259145ecc0b2633997.jpg/v1/fill/w_224,h_224,al_c,lg_1,q_80/8fa7e6_09cf11c3e4584b259145ecc0b2633997.webp',
    availabilities : {
        lundi : {
            start : '',
            end : '' },
        mardi : {
            start : '',
            end : '' },
        mercredi : {
            start : '',
             end : '' },
        jeudi : {
            start : '',
            end : '' },
        vendredi : {
            start : '',
            end : '' },
        samedi : {
            start : '',
            end : '' },
        dimanche : {
            start : '',
            end : '' }
    }
}

export const UserContext = createContext(null)
