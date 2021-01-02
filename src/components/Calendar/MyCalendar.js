import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './myCalendar.css'
import Header from "../common/Header/Header"
import BackHome from '../common/Buttons/BackHome';
import CalendarEventModal from '../common/Modals/CalendarEventModal';

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment/locale/fr'

const localizer = momentLocalizer(moment);

const { REACT_APP_API_URL } = process.env;
 
const MyCalendar = () => {

    const token = localStorage.token

    const [showEventModal, setShowEventModal] = useState(false)

    const [myDemands, setMyDemands] = useState([])

    const [myKidSitting, setMyKidSitting] = useState([])

    const [events, setEvents] = useState([]) // Demands + Kidsittings

    const [selectedEvent, setSelectedEvent] = useState(null)

    const messages = {
        allDay: 'journée',
        previous: 'précédent',
        next: 'suivant',
        today: 'aujourd\'hui',
        month: 'mois',
        week: 'semaine',
        day: 'jour',
        agenda: 'Agenda',
        date: 'date',
        time: 'heure',
        event: 'événement', // Or anything you want
        showMore: total => `+ ${total} événement(s) supplémentaire(s)`
      }
    
    const getMyPlanning = async () => {
        
        // Get all demands from user
        let response = await Axios.get(`${REACT_APP_API_URL}/api/demands/my-demands`, {headers : { 'Authorization' : 'Bearer ' + token}})
        let demands = response.data
        setMyDemands(demands)

        // Then extract only important info in order to populate calendar - modify the date format 
        let cleanInfo = []
        let cleanDemands = demands.map(demand => {
            let cleanDemand = {
                start : new Date(demand.beginAt),
                end : new Date(demand.endAt),
                title : `${(new Date(demand.beginAt)).getHours()}:${(new Date(demand.beginAt)).getMinutes()} Parent : ${demand.Users[0].firstname}`,
                isMyDemand : true, // to display with a specific color on the calendar
                }
            cleanInfo.push(Object.assign(demand, cleanDemand))})


        // Get all kid sittings from user
        let otherResponse = await Axios.get(`${REACT_APP_API_URL}/api/demands/kidsitting/all`, {headers : { 'Authorization' : 'Bearer ' + token}})
        let kidSittings = otherResponse.data
        setMyKidSitting(kidSittings)
        
        // Then extract only important info in order to populate calendar - modify the date format 
        let cleanKidSittings = kidSittings.map(demand => {
            let cleanDemand = {
                start : new Date(demand.beginAt),
                end : new Date(demand.endAt),
                title : `${(new Date(demand.beginAt)).getHours()}:${(new Date(demand.beginAt)).getMinutes()} Parent : ${demand.Users[0].firstname}`,
                isMyDemand : false,
                }
            cleanInfo.push(Object.assign(demand, cleanDemand))})

        // Put all the cleaned demands and kidsittings in state
        setEvents(cleanInfo)    
    }

    // Allow to display events in calendar with specific colors depending if it's my demands or my kidsittings
    const eventStyleGetter = (event, start, end, isMyDemand) => {
        let newStyle = {
            backgroundColor: '#3174ad',
        };

        if (event.isMyDemand) {
            newStyle.backgroundColor = '#ff3dc2bb'
        }
        return {
            style: newStyle
        };
    }

    const handleModal = () => setShowEventModal(!showEventModal)
    

    useEffect(() => {
        getMyPlanning()
      }, []);


    return (
        <div>
            <Header className="header" title="Mon planning" />
            <BackHome />
            <div className='legend'>
                <div className='legend-left'>
                    <div className='legend-color-left'></div>
                    <p className='legend-text'>Mes demandes</p>
                </div>
                <div className='legend-right'>
                    <div className='legend-color-right'></div>
                    <p className='legend-text'>Mes gardes à faire</p>
                </div>
            </div>
            <div className="container-calendar">
                <div style={{ height: 700 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        views={["month"]}
                        messages={messages}
                        defaultDate={new Date()}
                        culture="fr"
                        onSelectEvent={event => {
                            setSelectedEvent(event) // charge l'évenement sélectioné avant de créer la modale
                            handleModal() // affiche la modale
                        }}
                        eventPropGetter={eventStyleGetter} // custom CSS for events displayed on calendar
                    />   
                    {showEventModal && 
                        <CalendarEventModal handleModal={handleModal} isOpen={showEventModal} data={selectedEvent} />
                    }    
                </div>
            </div>
        </div>    
    )
}

export default MyCalendar;