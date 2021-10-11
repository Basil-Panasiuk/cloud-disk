import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Registration from './authorization/Registration';
import Login from './authorization/Login';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { auth } from '../actions/user';
import Disk from './disk/Disk';
// import Profile from './profile/Profile';


function App() {
  const { isAuth } = useTypedSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth ?
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Redirect to="/" />
            </Switch>
            :
            <Switch>
              <Route path="/" component={Disk} exact />
              {/* <Route path="/profile" component={Profile} exact /> */}
              <Redirect to="/" />
            </Switch>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
