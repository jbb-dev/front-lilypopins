import React from 'react'
import './profileSelect.css'

const ProfileSelect = (props) => {
 

    return (
            <table>
                <tbody>
                    <tr>
                        <td onClick={event =>  window.location.href=`${props.link.option1}`} className={props.status.option1 === 'active' ? 'active' : 'passive'}>{props.title.option1}</td>
                        <td onClick={event =>  window.location.href=`${props.link.option2}`} className={props.status.option2 === 'active' ? 'active' : 'passive'}>{props.title.option2}</td>
                    </tr>
                </tbody>
            </table>
    )
}

export default ProfileSelect