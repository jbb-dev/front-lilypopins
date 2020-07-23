import { createContext } from 'react'

export const childrenProfileContext = {
    child_firstname: '',
    child_age: null,
    child_biography : '',
    child_sex : ''

}

export const ChildrenContext = createContext(null)
