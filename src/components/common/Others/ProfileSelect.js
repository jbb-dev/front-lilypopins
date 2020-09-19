import React from 'react'
import './profileSelect.css'

const ProfileSelect = (props) => {


    return (
            <table>
                    <tr>
                        <td onClick={event =>  window.location.href='/my-profile'} className={props.status.me === 'active' ? 'active' : 'passive'}>Moi</td>
                        <td onClick={event =>  window.location.href='/my-children'} className={props.status.children === 'active' ? 'active' : 'passive'}>Mes enfants</td>
                    </tr>
            </table>
    )
}

export default ProfileSelect