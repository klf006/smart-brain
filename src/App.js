import React, { Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: 'af3b8e8ffc3a4fd0bd13a3084e57439a'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
  }  
  onInputChange = (event) => {
    this.setState(input: event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict(Clarifai.COLOR_MODEL, this.state.input).then(
      function(response) {
        console.log(response);
        // do something with response
      },
      function(err) {
        // there was an error
      }
    );
  }
    
  
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params = {particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}  
          onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageURL={this.state.imageURL} />
         
      </div>
    );
  }
}

export default App;
