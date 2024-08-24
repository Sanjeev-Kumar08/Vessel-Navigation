import React from 'react';
import MapComponent from './Components/MapComponent/MapComponent'
import './App.css'

const App = () => {

  return (
    <div className="App">

      <div className="headerContainer">
        <div className="location-card">

          <div className="location-start">
            <h4>Starting</h4>
            <p><span>Lat:</span>22.1696</p>
            <p><span>Long:</span> 91.4996</p>
          </div>

          <div className="location-speed">
            <p>
              <span>Speed:</span> 20kmph
            </p>
          </div>

          <div className="location-end">
            <h4>Ending</h4>
            <p><span>Lat:</span> 22.2637</p>
            <p><span>Long:</span> 91.7159</p>
          </div>

        </div>
      </div>

      <div className='mapComponent'>
        <MapComponent/>
      </div>

    </div>
  );
};

export default App;
