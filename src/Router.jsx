import React, { useState, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import Home from './components/Home/Home'
import Login from './components/Connexion/Login'
import Register from './components/Connexion/Register'
import RegisterStep2 from './components/Connexion/Register2'
import RegisterStep3 from './components/Connexion/Register3'
import RegisterStep4 from './components/Connexion/Register4'
import RegisterStep5 from './components/Connexion/Register5'
import SearchResults from './components/Search/SearchResults'
import ResultDetails from './components/Search/ResultDetails'
import Select from './components/Search/Select'
import MyProfile from './components/Profile/MyProfile'
import MyChildren from './components/Profile/MyChildren'
import ChildForm from './components/Profile/ChildForm'

import { UserContext } from './context/UserContext'
import { userProfileContext } from './context/UserContext'
import { ChildrenContext } from './context/ChildrenContext';
import { childrenProfileContext } from './context/ChildrenContext';


const Router = () => {

    //Appel des différents contexts qui vont partager ensuite l'information entre les composants concernés
    const [userProfile, setUserProfile] = useState(userProfileContext)
    const [childrenProfile, setChildrenProfile] = useState(childrenProfileContext)

    //Appel des différents providers de contexts qui vont ensuite distribuer l'information à travers le routeur
    const providerUserProfile = useMemo(() => ({userProfile, setUserProfile}), [userProfile, setUserProfile])
    const providerChildrenProfile = useMemo(() => ({childrenProfile, setChildrenProfile}), [childrenProfile, setChildrenProfile])

    return (
        <>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/select" component={Select} />
                <Route exact path="/search/results" component={SearchResults} />
                <Route exact path="/search/results/:id" component={ResultDetails} />
                <Route exact path="/my-profile" component={MyProfile} />
                <UserContext.Provider value={providerUserProfile}>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/register-step2" component={RegisterStep2} />
                    <Route exact path="/register-step3" component={RegisterStep3} />
                        <ChildrenContext.Provider value={providerChildrenProfile}>
                            <Route exact path="/register-step4" component={RegisterStep4} />
                            <Route exact path="/register-step5" component={RegisterStep5} />
                            <Route exact path="/my-children" component={MyChildren} />
                            <Route exact path="/add-my-child" component={ChildForm} />
                        </ChildrenContext.Provider>
                </UserContext.Provider>

            </Switch>
        </>

    )
}

export default Router;