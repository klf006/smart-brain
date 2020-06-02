import Clarifai from 'clarifai';

export const particlesOptions = {
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

export const facialApp = new Clarifai.App({
  apiKey: 'af3b8e8ffc3a4fd0bd13a3084e57439a'
});

