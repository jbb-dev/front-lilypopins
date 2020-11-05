import React, {useState} from 'react'
import Header from './common/Header/Header'
import Axios from 'axios'



const Apimo = () => {

    // API CONFIG
    const PROVIDER = 2870
    const AGENCY = 2188
    const TOKEN = '271c166cb08cab1338b01cefebe6ffd1da8de96d'

    const [list, setList] = useState(null)


    const getPropertiesList = () => {
        Axios
        .get(`https://api.apimo.pro/agencies/${AGENCY}/properties` , {
            headers : { 'Authorization' : 'Bearer ' + TOKEN }
        })
        .then(response => setList(response))
        .catch((error)=> console.log(error))
    }



    return (
        <>
            <Header title='APIMO'/>

            <h1>APIMO</h1>
            <button onClick={() => getPropertiesList()}>LIST</button>

            <div className="card" style={{'width' : '18rem'}}>
                <img className="card-img-top" src="..." alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>

        </>
    )
}

export default Apimo;