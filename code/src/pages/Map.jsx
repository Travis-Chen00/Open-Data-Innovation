import React from 'react'
import { GoogleMap, LoadScriptNext  } from '@react-google-maps/api';
import './map.scss'
import Menu from '../components/Menu'

export default function Map() {
    const containerStyle = {
        width: '80%',
        height: '50vh',
      };

      const center = {
        lat: 51.509865, lng: -0.118092
      };

  return (
    <div className='map'>
        <LoadScriptNext 
        googleMapsApiKey="AIzaSyBPdQXtf2Q3yeCXCxqYeCHnVDn0VlBcxQI"
        language='EN'
      >
        {/* 换地图 可换自己的ApiKey */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          className='google'
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScriptNext >
      <Menu />
    </div>
  )
}
