import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, Container, Image, InputGroup} from 'react-bootstrap'
import Axios from "axios";
import Header from '../Header/Header'
import Back from '../Buttons/Back'
import './conversation.css'

const { REACT_APP_API_URL } = process.env;

const Conversation = (props) => {

    const token = localStorage.token 

    const otherUserId = Number(props.match.params.id)

    const [myId, setMyId] = useState(null)

    // the full conversation
    const [conversation, setConversation] = useState(null)
    // the message to send
    const [myMessage, setMyMessage] = useState('')
    // the last message to display by scrolling bottom
    const divRef = useRef(null);

    const scrollToBottom = () => {
        if (divRef.current) {
            divRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const options = { 
        year: "numeric", 
        month: "long", 
        day: "2-digit",
        hour : "numeric",
        minute : "numeric"
    };
 
    // get all conversations between current user and the other one
    async function getConversations () {
        await Axios.get(`${REACT_APP_API_URL}/api/conversations/${otherUserId}`, { 
            headers : { 'Authorization' : 'Bearer ' + token}
          })
          .then((res) => setConversation(res.data))
          .catch((error)=> console.log(error))
    }

    const getMyId = () => {
        Axios.get(`${REACT_APP_API_URL}/api/users/myId`, { 
            headers : { 'Authorization' : 'Bearer ' + token}
          })
          .then((res) => setMyId(res.data))
          .catch((error)=> console.log(error))
   
    }

    const sendMyMessage = (e) => {
        e.preventDefault()
        Axios
        .post(`${REACT_APP_API_URL}/api/conversations/user/${otherUserId}/newMessage`, { message : myMessage} , 
            { 
          headers : { 'Authorization' : 'Bearer ' + token}
            })
        .then(window.location.reload())
        .catch((error)=> console.log(error))
      }

    useEffect(() => {
        getConversations()
        getMyId()
      }, []);

    useEffect(() => {
        scrollToBottom() 
    }, [conversation])

    return (
        <>

            <Header className="header" title="Vos échanges" />
            <Back title='Précédent'/>

            <div className="main-conversation">

            {conversation !== null && conversation.Messages.length > 0 ?
                    <div className="d-flex flex-column flex-grow-1 msgConversation"> 
                        <Form.Group className="m-1" >                  
                        {conversation.Messages.map(message => message.senderId === myId ?
                            <div key={message.id}>
                                <div className='myUser' >
                                    <p id='dateMsg'>{new Date(message.createdAt).toLocaleDateString("fr-FR", options)}</p>
                                    <h5> Moi : </h5>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                            : 
                            <div key={message.id}>
                                <div className='otherUser' key={message.id} >
                                    <p id='dateMsg'>{new Date(message.createdAt).toLocaleDateString("fr-FR", options)}</p>
                                    <h5>{conversation.Users[0].firstname}</h5>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        )
                            }
                        </Form.Group>
                        <div ref={divRef} />
                    </div>

                :
                    <p style={{'text-align' : 'center'}}>Aucune conversation trouvée</p>
                }
            </div>


            <div className="main-message">
                <form className="message_forms" onSubmit={e=> sendMyMessage(e)}>
                    <label>
                        <textarea
                            className="register_input_text"
                            type="text"
                            placeholder="Votre message"
                            value={myMessage}
                            onChange={(e) => {setMyMessage(e.target.value) }}
                        />
                    </label>
                    <div className='send-my-message-button'>
                        <button type='submit' id="send-my-message">Envoyer</button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default Conversation;