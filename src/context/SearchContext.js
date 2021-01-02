import { createContext } from 'react'


export const userSearchContext = {
    date : new Date(),
    startHour : null,
    endHour : null
}

export const SearchContext = createContext(null)
