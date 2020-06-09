import React from 'react'
import logo from './logo.svg'
import './App.css'
import * as Api from '../src/api/api'
import {getCounter} from "./utils/universalCounter"
import {connect} from "react-redux";
import store, {AppStateType} from "./redux/store"
import {actions as actionsApiReducer} from "./redux/clientSideApiReducer"
import {login, logout} from './redux/authReducer'

const App: React.FC<typeof mapDispatchToProps> = (props) => {

  // @ts-ignore
  window.api = Api
  // @ts-ignore
  window.counter = getCounter
  // @ts-ignore
  window.store = store
  // @ts-ignore
  window.login = login
  // @ts-ignore
  window.logout = logout

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={()=>{
          alert('')
          props.addIdToDeleted('users', 1)
        }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const mapStateToProps = (state: AppStateType) => {
  return {

  }
};

const mapDispatchToProps = {
  addIdToDeleted: actionsApiReducer.addIdToDeleted
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
