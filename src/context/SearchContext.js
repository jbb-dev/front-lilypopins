import { createContext } from 'react'


export const userSearchContext = {
    date : null,
    startHour : null,
    endHour : null
}

export const SearchContext = createContext(null)
