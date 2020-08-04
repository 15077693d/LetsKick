import './App.css';
import Authentication from './pages/authentication/authentication'
import HamburgerMenu from './components/hamburger-menu/hamburger-menu';
import { getUserInfoByFirebase, signOut } from './utils/authProcessor'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Pitches from './pages/pitches/pitches';
import React, { Component } from 'react';
import { get, update } from './utils/dataProcessor';
import LoadingAnimation from './components/loading-animation/loading-animation';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
    // this.setState({
    //   loading:false
    // })
  }

  setIdUser = async (id, signUp) => {
    if (id !== "") {
      let user = await get(`user/${id}`);
      if (signUp) {
        this.setState({
          id: id,
        })
      } else {
        this.setState({
          id: id,
          user: user
        })
      }
    }
    return true
  }

  updateUser = async (user) => {
    await update(`user/${user.id}`, user);
    this.setState({
      user: user
    })
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
    let element;
    if (this.state.loading) {
      element = <LoadingAnimation />
    } else {
      element = this.state.user === ""
        ? <Authentication id={this.state.id} language={this.state.language} setIdUser={this.setIdUser} />
        : <Pitches user={this.state.user} language={this.state.language} updateUser={this.updateUser} />
    }
    return (
      <div className="App">
        <Router>
          {this.state.loading?null:<HamburgerMenu
            id={this.state.id}
            username={this.state.user === "" ? "" : this.state.user.username}
            switchLanguage={this.switchLanguage}
            language={this.state.language}
            logout={this.logout}
          />}
          <Route exact path="/pitches">
            {element}
          </Route>
          <Route exact path="/">
            {element}
          </Route>
          <Route exact path="/auth">
            <Authentication id={this.state.id} language={this.state.language} setIdUser={this.setIdUser} />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
