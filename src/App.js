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
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.heigth);
    console.log(width, height);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.calculateFaceLocation(response))
      .catch(err => console.log(err));
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
        <FaceRecognition imageUrl={this.state.imageUrl} />
         
      </div>
    );
  }
}

export default App;
