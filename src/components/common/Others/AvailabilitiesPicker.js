import React, { useContext } from 'react'
import { Label, Input } from 'reactstrap';
import SlidingButton from '../Buttons/SlidingButton';
import './availabilitiesPicker.css'
import { UserContext } from '../../../context/UserContext'
import TimeOptions from './TimeOptions';


const AvailabilitiesPicker = (props) => {
    const {text, id, onClick, startTime, endTime, setStartTime, setEndTime, isAvailable, setIsAvailable} = props

    return (
            <>
                <div className='day-wrapper'>
                    <SlidingButton 
                        text={text}
                        id={id}
                        onClick={onClick}
                        isAvailable={isAvailable}
                        setIsAvailable={setIsAvailable}
                    />
                    <div className='day-time-content'>
                        <div className='day-time-select'>
                            <Label for="startDay" >De</Label>
                            <Input type="select" name="startDay" id="startDay" value={startTime} onChange={setStartTime} style={{ width: '90px', border : 'none'}} >
                                <TimeOptions />
                            </Input>
                        </div>
                        <div className='day-time-select'>
                            <Label for="endDay" >À</Label>
                            <Input type="select" name="endDay" id="endDay" value={endTime} style={{ width: '90px', border : 'none'}} onChange={setEndTime}>
                                <TimeOptions />
                            </Input>
                        </div>
                    </div>
                </div>       
            </>

    )
}

export default AvailabilitiesPicker;