import React, { useState, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Connexion/Login'
import Register from './components/Register'
import RegisterStep2 from './components/Register2'
import RegisterStep3 from './components/Register3'
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
                <UserContext.Provider value={providerUserProfile}>
                    <Route exact path="/register" component={Register} />
                        <ChildrenContext.Provider value={providerChildrenProfile}>
                            <Route exact path="/register-step2" component={RegisterStep2} />
                            <Route exact path="/register-step3" component={RegisterStep3} />
                        </ChildrenContext.Provider>
                </UserContext.Provider>
                <Route exact path="/home" component={Home} />

            </Switch>
        </>

    )
}

export default Router;