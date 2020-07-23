import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios'
import ResultCard from './ResultCard'
import Header from '../common/Header/Header'
import './results.css'



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
            <div className="Result-filterbarTop">
                <Link to='home'>
                    <button className="Result-filterbar-button">
                    Accueil
                    </button>
                </Link>
            </div>

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