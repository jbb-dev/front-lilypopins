import React, { useState, useEffect } from 'react';
import Axios from 'axios';
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

    const [events, setEvents] = useState([])

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
    
    const getMyDemands = async () => {
        
        // Get all demands from user
        let response = await Axios.get(`${REACT_APP_API_URL}/api/demands/my-demands`, {headers : { 'Authorization' : 'Bearer ' + token}})
        let data = response.data
        setMyDemands(data)

        // Then extract only important info in order to populate calendar
        let cleanInfo = []
        let cleanDemands = data.map(demand => {
            let cleanDemand = {
                start : new Date(demand.beginAt),
                end : new Date(demand.endAt),
                title : 'test'
                }
            cleanInfo.push(cleanDemand)})
        setEvents(cleanInfo)
    }

    const handleModal = () => setShowEventModal(!showEventModal)
    

    useEffect(() => {
        getMyDemands()
      }, []);


    return (
        <div>
            <Header className="header" title="Mon planning" />
            <BackHome />
            <CalendarEventModal />
            <div style={{ height: 700 }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    step={5}
                    timeslots={3}
                    view="week"
                    views={["week"]}
                    messages={messages}
                    defaultDate={new Date()}
                    culture="fr"
                    min={new Date(0, 0, 0, 7, 0, 0)} // start time 7:00
                    max={new Date(0, 0, 0, 23, 0, 0)} // end time 23:00
                    onSelectEvent={event => alert(event)}               
                />                
            </div>
        </div>    
    )
}

export default MyCalendar;