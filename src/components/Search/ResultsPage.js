import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ResultCard from './ResultCard'
import Header from '../common/Header/Header'
import './resultsPage.css'
import Back from '../common/Buttons/Back'
const { REACT_APP_API_URL } = process.env;




const SearchResults = () => {

    const [searchResults, setSearchResults] = useState([])
  
    // For authentification
    const token = localStorage.token 

  
    const getUsers = () => {
      Axios
      .get(`${REACT_APP_API_URL}/api/search`, { 
        headers : { 'Authorization' : 'Bearer ' + token}
        })
      .then(res => setSearchResults(res.data))
      .catch(err=> console.error(err))
    }
  
    useEffect(() => {
      getUsers()
  }, [])
    
  
    return (
      <>
        <Header className="header" title="Résultats de la recherche" />
        
        <Back title='Précédent' link='/search' />

        <div className="Results-Page">
            
          {searchResults.map(e=> 
            <ResultCard 
              data={e} 
            />
          )
        }
        </div>
      </>
    );
  }

export default SearchResults