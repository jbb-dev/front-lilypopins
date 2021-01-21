import { createContext } from 'react'
import moment from "moment";
import 'moment/locale/fr'


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
            isAvailable : false,
            start : moment().set({day : 1, hour : 12, minute : 0, second : 0}),
            end : moment().set({day : 1, hour : 14, minute : 0, second : 0}),
        },
        mardi : {
            isAvailable : false,
            start : moment().set({day : 2, hour : 12, minute : 0, second : 0}),
            end : moment().set({day : 2, hour : 14, minute : 0, second : 0}),
        },
        mercredi : {
            isAvailable : false,
            start : moment().set({day : 3, hour : 12, minute : 0, second : 0}),
            end : moment().set({day : 3, hour : 14, minute : 0, second : 0}),
        },
        jeudi : {
            isAvailable : false,
            start : moment().set({day : 4, hour : 12, minute : 0, second : 0}),
            end : moment().set({day : 4, hour : 14, minute : 0, second : 0}),
        },
        vendredi : {
            isAvailable : false,
            start : moment().set({day : 5, hour : 12, minute : 0, second : 0}),
            end : moment().set({day : 5, hour : 14, minute : 0, second : 0}),
        },
        samedi : {
            isAvailable : false,
            start : moment().set({day : 6, hour : 12, minute : 0, second : 0}),
            end : moment().set({day : 6, hour : 14, minute : 0, second : 0}),
        },
        dimanche : {
            isAvailable : false,
            start : moment().set({day : 7, hour : 12, minute : 0, second : 0}),
            end : moment().set({day : 7, hour : 14, minute : 0, second : 0}),
        }
    }    
}

export const UserContext = createContext(null)
