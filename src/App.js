import './App.css';
import Authentication from './pages/authentication/authentication'
import HamburgerMenu from './components/hamburger-menu/hamburger-menu';
import { getUserInfoByFirebase, signOut } from './utils/authProcessor'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Pitches from './pages/pitches/pitches';
import React, { Component } from 'react';
import { get, update } from './utils/dataProcessor';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      user: "",
      language: "tc"
    };
  }


  async componentDidMount() {
    let id = await getUserInfoByFirebase().catch(value => { console.log(value) })
    if (id) {
      await this.setIdUser(id)
    }
  }

  setIdUser = async (id) => {
    if (id !== "") {
      let user = await get(`user/${id}`);
      this.setState({
        id: id,
        user: user
      })
    }
    return true
  }

  updateUser = async (user) => {
    await update(`user/${user.id}`, user);
    this.setState({
      user: user
    })
    console.log(this.state)
    return true
  }

  switchLanguage = (e) => {
    switch (e.target.id) {
      case "language":
        this.setState((state) => ({ language: state.language === "en" ? "tc" : "en" }));
        break;

      default:
        break;
    }
  }

  logout = () => {
    signOut()
    this.setState({
      id: "",
      user: ""
    })
  }


  render() {
    
    return (
      <div className="App">
        <Router>
          <HamburgerMenu
            id={this.state.id}
            username={this.state.user === "" ? "" : this.state.user.username}
            switchLanguage={this.switchLanguage}
            language={this.state.language}
            logout={this.logout}
          />
          <Route exact path="/pitches">
            {/* {this.state.user===""
            ?<Authentication id={this.state.id} language={this.state.language} setIdUser={this.setIdUser}/>
            :<Pitches user={this.state.user} language={this.state.language} updateUser={this.updateUser}/>}
             */}
            <Pitches user={this.state.user} language={this.state.language} updateUser={this.updateUser}/>
          </Route>
          <Route exact path="/">
          {/* {this.state.user===""
            ?<Authentication id={this.state.id} language={this.state.language} setIdUser={this.setIdUser}/>
            :<Pitches user={this.state.user} language={this.state.language} updateUser={this.updateUser}/>} */}
            <Authentication id={this.state.id} language={this.state.language} setIdUser={this.setIdUser}/>
          </Route>
          <Route exact path="/auth">
          <Authentication id={this.state.id} language={this.state.language} setIdUser={this.setIdUser}/>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
