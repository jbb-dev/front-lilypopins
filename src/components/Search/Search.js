import React, { useState, useContext } from 'react' 
import { Link } from 'react-router-dom'
import Header from '../common/Header/Header'
import Back from '../common/Buttons/Back'
import './search.css'
import Next from '../common/Buttons/Next'
import { SearchContext } from '../../context/SearchContext'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import fr from "date-fns/locale/fr"
import { set } from 'date-fns'
registerLocale("fr", fr)
 
const Search = () => {

    const { searchContext, setSearchContext } = useContext(SearchContext)

    const [startDate, setStartDate] = useState(null)
    const [startHour, setStartHour] = useState(null)
    const [endHour, setEndHour] = useState(null)

    const convertDateToDay = date => {
        let jourSemaine = date.getDay();
        // let jourMois = date.getDate();
        // let mois = date.getMonth();
        // let annee = date.getFullYear();
        // let heures = date.getHours();
        // let heuresUTC = date.getUTCHours();
        // let minutes = date.getMinutes();
        // let secondes = date.getSeconds();
        // let ms = date.getMilliseconds();
        return jourSemaine
    }
    

    return (
        <>
            <Header title='Faire garder mon enfant'/>
                <div className='button-back'>
                    <Back title='Accueil' link='/home' />
                </div>
                <div className="select-page">

                    <div className='select-title'>
                        <h4>A quelle date souhaitez-vous faire garder votre enfant ?</h4>
                    </div>
                    <div className='date'>
                        <DatePicker 
                            inline
                            selected={startDate} 
                            onChange={date => {
                                setStartDate(date)
                                setSearchContext({...searchContext, date : date})
                            }}
                            dateFormat="dd/MM/yyyy"
                            locale="fr"                
                        />
                    </div>

                {startDate !== null ? 
                    <div className='time'>
                        <div className='select-title'>
                            <h4>A partir de quelle heure ?</h4>
                        </div>
                            <DatePicker
                                onChange={hour => {
                                    setStartHour(hour)
                                    setSearchContext({...searchContext, startHour: hour }) 
                                }}
                                showTimeSelect
                                showTimeSelectOnly
                                selected={startHour} 
                                timeIntervals={15}
                                timeCaption=""
                                dateFormat="h:mm "
                                dateFormat="HH:mm "
                                locale="fr"
                            />
                    </div>
                : null }

                {startHour !== null ? 
                    <div className='time'>
                        <div className='select-title'>
                            <h4>Jusqu'à quelle heure ?</h4>
                        </div>
                        <DatePicker
                            selected={endHour}
                            onChange={hour => {
                                setEndHour(hour)
                                setSearchContext({...searchContext, endHour: hour }) 
                                }}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption=""
                            dateFormat="h:mm "
                            dateFormat="HH:mm "
                            locale="fr"
                        />
                    </div>
                : null }

                {endHour !== null ?
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