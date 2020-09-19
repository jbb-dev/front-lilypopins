import React, { useState } from 'react' 
import { Link } from 'react-router-dom'
import Header from '../common/Header/Header'
import Back from '../common/Buttons/Back'
import './select.css'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ButtonValidate from '../common/Buttons/Validate'
import fr from "date-fns/locale/fr"
registerLocale("fr", fr);

const Select = () => {

    const [startDate, setStartDate] = useState(null)
    // const correctDate = startDate.toLocaleDateString()

    const [startHour, setStartHour] = useState(null)
    const [endHour, setEndHour] = useState(null)

    const convertDate = date => {
        let d = date
        let utcDate = d.getUTCDate() 
        let month = d.getUTCMonth() + 1 // Since getUTCMonth() returns month from 0-11 not 1-12
        let year = d.getUTCFullYear()
        let dateStr = date + "/" + month + "/" + year;
        return utcDate
    }


    return (
        <>
            <Header title='Faire garder mon enfant'/>
                <div className='button-back'>
                    <Back title='Accueil' link='/home' />
                    <button onClick={() => console.log(convertDate(startDate))}>Clic</button>
                </div>
                {/* <button onClick={() => console.log(startDate)}>StartDate</button> */}
                <div className="select-page">

                    <div className='select-title'>
                        <h4>A quelle date souhaitez-vous faire garder votre enfant ?</h4>
                    </div>
                    <div className='date'>
                        <DatePicker 
                            inline
                            selected={startDate} 
                            onChange={date => setStartDate(date)}
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
                                onChange={hour => setStartHour(hour)}
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
                            onChange={hour => setEndHour(hour)}
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
                        <ButtonValidate title="Chercher un parent" status='active'/>
                    </Link>
                : null }

            </div>
        </>
    )
}


export default Select 