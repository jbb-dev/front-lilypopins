import React, { useState, useContext } from 'react' 
import { Link } from 'react-router-dom'
import Header from '../common/Header/Header'
import Back from '../common/Buttons/Back'
import './search.css'
import Next from '../common/Buttons/Next'
import { SearchContext } from '../../context/SearchContext'
import moment from 'moment'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import fr from "date-fns/locale/fr"
registerLocale("fr", fr)
 
const Search = () => {

    const { searchContext, setSearchContext } = useContext(SearchContext)

    const getFormattedDate = (dateString, isStartHour) => {
        let date = new Date(searchContext.date)
        let hour = dateString.getHours()
        let minutes = dateString.getMinutes()
        let formattedDate = date.setHours(hour, minutes, 0, 0)
        console.log(new Date(formattedDate))
        isStartHour ? setSearchContext({...searchContext, startHour: new Date(formattedDate)}) : setSearchContext({...searchContext, endHour: new Date(formattedDate)})
    }

    return (
        <>
            <Header title='Faire garder mon enfant'/>
            <Back title='Accueil' link='/home' />
                <div className="select-page">

                    <div className='select-title'>
                        <h4>A quelle date souhaitez-vous faire garder votre enfant ?</h4>
                    </div>
                    <div className='date'>
                        <DatePicker 
                            inline
                            selected={searchContext.date} 
                            onChange={date => setSearchContext({...searchContext, date : date})}
                            dateFormat="dd/MM/yyyy"
                            locale="fr"                
                        />
                    </div>

                {searchContext.date !== null ? 
                    <div className='time'>
                        <div className='select-title'>
                            <h4>A partir de quelle heure ?</h4>
                        </div>
                            <DatePicker
                                onChange={hour => getFormattedDate(hour, true)}
                                showTimeSelect
                                showTimeSelectOnly
                                selected={searchContext.startHour} 
                                timeIntervals={15}
                                timeCaption=""
                                dateFormat="HH:mm "
                                locale="fr"
                            />
                    </div>
                : null }

                {searchContext.startHour !== null ? 
                    <div className='time'>
                        <div className='select-title'>
                            <h4>Jusqu'à quelle heure ?</h4>
                        </div>
                        <DatePicker
                            selected={searchContext.endHour} 
                            onChange={hour => getFormattedDate(hour, false)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption=""
                            dateFormat="HH:mm "
                            locale="fr"
                        />
                    </div>
                : null }

                {searchContext.startHour !== null ?
                    <Link to={{pathname: '/search/results'}}>
                        <Next title="Chercher un parent" status='active'/>
                    </Link>
                :   
                    <Next title="Chercher un parent" status='passive'/>
                }

            </div>
        </>
    )
}


export default Search