import React, {Component} from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';


class App extends Component {
  //state changes and affects the app
  constructor(){
    super()//calls constructor of Component since 'this' cant be used before super
    this.state = {
      robots: [],
      searchfield: ''

    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>{
      return response.json();
    })
    .then(users => {
      this.setState({robots:users})
    });

  }

  onSearchChange = (event) =>{
    this.setState({searchfield: event.target.value })
  }

  render(){
    const{robots, searchfield} = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    if(robots.length === 0){
      return <h1> Please wait a moment. </h1>
    }else{
      return(
        <div className = 'tc'>
          <h1 className= 'f1'> Robofriends </h1>
          <SearchBox searchChange= {this.onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
          
        </div>
    
      );

    }
    

  }
  
}
export default App;