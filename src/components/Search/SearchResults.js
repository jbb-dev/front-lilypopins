import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios'
import ResultCard from './ResultCard'
import Header from '../common/Header/Header'
import './results.css'
import Back from '../common/Buttons/Back'




const SearchResults = () => {

    const [searchResults, setSearchResults] = useState([])
  
  
    const getUsers = () => {
      Axios
      .get(`http://localhost:4000/api/users`)
      .then(res => setSearchResults(res.data))
      .catch(err=> console.error(err))
    }
  
    useEffect(() => {
      getUsers()
  }, [])
    
  
    return (
      <>
        <Header className="header" title="Résultats de la recherche" />
        
          <div className="Result-Page">
          
          <Back title='Précédent' link='/select' />
        
        {searchResults.map(e=> 
          <ResultCard 
            fullResult={e} 
          />
          )
        }
  
        </div>
      </>
    );
  }

export default SearchResults