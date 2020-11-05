import React, { useState, useEffect } from 'react'
import Axios from "axios";
import Header from '../Header/Header'
import Back from '../Buttons/Back'
import './conversation.css'


const Conversation = (props) => {

    const token = localStorage.token 

    const conversationId = Number(props.match.params.id)

    const [conversation, setConversation] = useState(null)

    // get all conversations between current user and the other one
    const getConversations = () => {
        Axios.get(`http://localhost:4000/api/conversations/${conversationId}`, { 
            headers : { 'Authorization' : 'Bearer ' + token}
          })
          .then((res) => setConversation(res.data))
          .catch((error)=> console.log(error))
    }

    useEffect(() => {
        getConversations()
      }, []);

    return (
        <>

            <Header className="header" title="Vos échanges" />
            
            <div className="main-conversation">

                <Back title='Précédent'/>

             {conversation !== null ?
                    conversation.Messages.map(message => (
                        <p>{message.text}</p>
                    ))
                :
                    <p style={{'text-align' : 'center'}}>Aucune conversation trouvée</p>
                }
            </div>
        </>
    )
}


export default Conversation;