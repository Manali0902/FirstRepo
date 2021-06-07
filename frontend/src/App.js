import './App.css';
import Private from './components/Private';
import FirstScreen from './components/FirstScreen';
import Login from './components/login/Login';
import Register from './components/Register';
import UserList from './components/Userlist';
import CreateUser from './components/CreateUser';
import ForgotPassword from './components/login/ForgotPassword';
import ResetPassword from './components/login/ResetPassword';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect
} from "react-router-dom";


function App() {
  const history = useHistory();
  return (
    <div className="App">
      {()=>{
          
          if(window.location.pathname == "/resetpassword"){
            <Redirect to="/register"/>
          }
         
        }}
      <Router>
        
      

        <Switch>

          <Route
            exact path="/"
            render={() => <Redirect to={{ pathname: '/firstscreen'}} />}
          />
          
          <Route path="/firstscreen" >
            {/* <FirstScreen/> */}
            <Private cmp= {FirstScreen}/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>
        
          <Route path="/register">
            <Register/>
          </Route>

          <Route path="/userlist">
            <UserList/>
            {/* <Private cmp={FirstScreen}/> */}
          </Route>

          <Route path="/createuser">
            <CreateUser/>
          </Route>

          <Route path="/forgotpassword">
            <ForgotPassword/>
          </Route>

          <Route path="/resetpassword">
            <ResetPassword/>
          </Route>
          
          
        </Switch>

      </Router>
    </div>
  );
}

export default App;
