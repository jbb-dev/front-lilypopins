import { createContext } from 'react'

export const childrenProfileContext = {
    firstname: '',
    age: '',
    section : '',
    biography : '',
    sex : '',
    avatar : null,
}

export const ChildrenContext = createContext(null)
