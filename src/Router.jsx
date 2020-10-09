import React, { useState, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import Home from './components/Home/Home'
import Login from './components/Connexion/Login'
import Register from './components/Connexion/Register'
import RegisterStep2 from './components/Connexion/Register2'
import RegisterStep3 from './components/Connexion/Register3'
import ResultsPage from './components/Search/ResultsPage'
import ResultDetails from './components/Search/ResultDetails'
import Search from './components/Search/Search'
import MyProfile from './components/Profile/MyProfile'
import MyChildren from './components/Profile/MyChildren'
import NewChildForm from './components/Profile/NewChildForm'
import ChildProfile from './components/Profile/ChildProfile'
import FollowUp from './components/Suivi/FollowUp'

import { UserContext } from './context/UserContext'
import { userProfileContext } from './context/UserContext'
import { ChildrenContext } from './context/ChildrenContext'
import { childrenProfileContext } from './context/ChildrenContext'
import { SearchContext } from './context/SearchContext'
import { userSearchContext } from './context/SearchContext'


const Router = () => {

    //Appel des différents contexts qui vont partager ensuite l'information entre les composants concernés
    const [userProfile, setUserProfile] = useState(userProfileContext)
    const [childrenProfile, setChildrenProfile] = useState(childrenProfileContext)
    const [searchContext, setSearchContext] = useState(userSearchContext)

    //Appel des différents providers de contexts qui vont ensuite distribuer l'information à travers le routeur
    const providerUserProfile = useMemo(() => ({userProfile, setUserProfile}), [userProfile, setUserProfile])
    const providerChildrenProfile = useMemo(() => ({childrenProfile, setChildrenProfile}), [childrenProfile, setChildrenProfile])
    const providerSearchContext = useMemo(() => ({searchContext, setSearchContext}), [searchContext, setSearchContext])

    return (
        <>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/my-profile" component={MyProfile} />
                <Route exact path="/my-children/:childId" component={ChildProfile} />
                <Route exact path="/follow-up" component={FollowUp} />
                <UserContext.Provider value={providerUserProfile}>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/register-step2" component={RegisterStep2} />
                    <Route exact path="/register-step3" component={RegisterStep3} />
                        <ChildrenContext.Provider value={providerChildrenProfile} >
                            <Route exact path="/my-children" component={MyChildren} />
                            <Route exact path="/add-my-child" component={NewChildForm} />
                                <SearchContext.Provider value={providerSearchContext} >
                                    <Route exact path="/search" component={Search} />
                                    <Route exact path="/search/results" component={ResultsPage} />
                                    <Route exact path="/search/results/:id" component={ResultDetails} />
                                </SearchContext.Provider>
                        </ChildrenContext.Provider>
                </UserContext.Provider>
            </Switch>
        </>

    )
}

export default Router;