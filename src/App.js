import React, { Component } from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import List from './List.js';



function Bio(props){
  return <p>umur {props.age} - Select your character!</p>;
}
function Greeting(input) {
  return <container>
  <h1>Hello {input.name}</h1> 
  <p><Bio age={input.age}/></p> 
  </container> 
}

// function Clicker(){
//   function handleClick(e) {
//     alert('berhasil diklik')
//     e.preventDefault() //agar tidak reload halaman
//   }
//   return(
//     <a href="#" onClick={handleClick}>Klik disini</a>
//   )
// }

//Untuk timer
class Timer extends Component{
  constructor(props){
    super(props)
    this.state = {
      time : props.start,
      judul : props.judul
    }
  }

  //Lifecycle
  componentDidMount(){
    this.addInterval = setInterval(()=> this.increase(), 1000)
  }

  componentWillMount(){
    clearInterval(this.addInterval)
  }

  increase(){
    //Mengupdate state setiap detik
    this.setState((state, props)=>({
      time:parseInt(state.time) + 1
    }))
  }


  render(){
  return(<div>
    <p>{this.state.judul}{this.state.time}</p>
    </div>);
  }
}

class Toggle extends Component{
  constructor(props){
    super(props)
    this.state = {
      toogleStatus : true
    }

    this.handleClick = this.handleClick.bind(this)
  }

    handleClick(){
      this.setState(state =>({
        toogleStatus : !state.toogleStatus
      }))
    }
    
    render(){
      return (
        <button onClick={this.handleClick}>
          {/* " ? " adalah if    ":" adalah else */}
          {this.state.toogleStatus ? 'ON' : 'OFF'} 
          
          <p>Kondisi lampu sekarang {this.state.toogleStatus ? 'menyala' : 'mati'}</p>
        </button>
      )
    }
  
}

class Todolist extends Component{
  constructor(props){
    super(props)
    this.state = {
      todoItem : "",
      items : []
    }
  }

    handleSubmit = (event) =>{
      event.preventDefault()
      this.setState({
          items   : [...this.state.items, this.state.todoItem],
          todoItem : ""
      })
    }

    handleChange = (event) => {
      event.preventDefault()
      this.setState({
        todoItem : event.target.value
        
      })
    }

    render(){
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
              <input value={this.state.todoItem} onChange={this.handleChange}></input>
                <button>Add</button>
          </form>
          <List items={this.state.items}/>
        </div>
      );
    }
}


// function App() {
//   return (
//     <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       {/* <Clicker/> */}
//       <Greeting name="Helmi Effendi" age="20"/>
//       <Greeting name="Effendi" age="25"/>
//       <Todolist/>
//       <Timer start="0" judul="Timer : "/>
//       <Timer start="5"/>
//       <Toggle/>
//     </header>
//     </div>
//   );
// }

class Api extends Component{
  constructor(props) {
    super(props)
    this.state ={
      items:[],
      isLoading : true //var kondisi jika sedang loading
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then(data=>this.setState({items : data, isLoading : false}))
  }

  render() {
    const {items, isLoading} = this.state
    if (isLoading) {
      return <p>Loading...</p>
    }

    return (
        <ul>{items.map((item, index)=>
          <li key={index}>{item.name}</li>)}
        </ul>
    )
  };
}

function Home() {
  return <div><h2>Tampilan Home</h2>
            {/* <Clicker/> */}
            <Todolist/>
            <Timer start="0" judul="Timer : "/>
            <Timer start="5"/>
            <Toggle/>   
            <Greeting name="Effendi" age="-"/>
            <Greeting name="Helmi Effendi" age="10"/>
         </div>
}



class ListView extends React.Component{
  render() {
    return (
      <React.Fragment>
          <h2>Tampilan List View</h2>
          <Api></Api> <br/>
          <p><Link to='users/helmi'>Helmi</Link></p>
          <p><Link to='users/effendi'>Effendi</Link></p>
      </React.Fragment>  
    )
  };
}

function DetailView({match}) {
  return <h2>Ini Halaman {match.params.name}</h2>
}

function NoMatch() {
  return <h2>404, Not Found</h2>
}

class App extends Component{
  constructor(props){
    super(props)
    this.state ={
      items:[]
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(data=>this.setState({items : data}))
  }

  render(){
    return(
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <nav>
              <li><Link to='/react-deploy'>Home</Link></li>
              <li><Link to='/users'>User</Link></li>
            </nav>
          <main>
            <Switch>
              <Route path="/react-deploy" exact component={Home}></Route>
              <Route path="/" exact component={Home}></Route>
              <Route path="/users" exact component={ListView}></Route>
              <Route path="/users/:name" exact component={DetailView}></Route>
              <Route component={NoMatch}></Route>
            </Switch>
          </main>
          </header>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
