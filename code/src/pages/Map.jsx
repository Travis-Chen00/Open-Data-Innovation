
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import './map.scss'
import axios from 'axios';
import { MarkerClusterer } from '@react-google-maps/api';

const containerStyle = {
    width: '900px',
    height: '500px'
};

const libraries = ["places"];

const ServiceMap = () => {

    const postcode = "EC1V 3PA"; // 英国邮编
    const [location, setLocation] = useState(null);
    const londonCenter = { lat: 51.50718801866831, lng: -0.1278400477978338 };
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/london.json');
            const properties = response.data.slice(0, 2000);
            const postalCodes = properties.map(property => property.Postal_Code);
            // console.log("PostalCodes:", postalCodes);
            const promises = postalCodes.map(postcode =>
                Geocode.fromAddress(postcode).then(
                    response => response.results[0].geometry.location,
                    error => console.error(error)
                )
            );
            const locations = await Promise.all(promises);
            setLocations(locations);
        };

        Geocode.setApiKey("AIzaSyCkT6rPwlprpK8qnwG4SMnnloCsp7NcJkk");
        fetchData();
    }, []);

    const handleClick = (clusterer, locations, index) =>{
        console.log(locations[index].lat);
    }

    const renderMap = () => {
        return (
            <div className='map'>
                <div className='google'><GoogleMap
                mapContainerStyle={containerStyle}
                center={londonCenter}
                zoom={10}
            >
                 <MarkerClusterer>
                 {clusterer =>
                    locations.map((location, index) => (
                        <Marker key={index} position={location} clusterer={clusterer} onClick={() => handleClick(clusterer, locations, index)}/>
                    ))
                }
                 </MarkerClusterer>
            </GoogleMap>
            </div>
            <div className='others'>
                Tools
            </div>
            </div>
        );
    }

    return (
        <div className='map'>
            <LoadScript
                googleMapsApiKey="AIzaSyCkT6rPwlprpK8qnwG4SMnnloCsp7NcJkk"
                language="en"
                libraries={libraries}
                className='google'
            >
                {locations.length > 0 && renderMap()}
            </LoadScript>
        </div>
    )
}

export default ServiceMap;















// cby code
// import React from 'react'
// import { GoogleMap, LoadScriptNext  } from '@react-google-maps/api';
// import './map.scss'
// import Menu from '../components/Menu'

// export default function Map() {
//     const containerStyle = {
//         width: '80%',
//         height: '50%',
//       };

//       const center = {
//         lat: 51.509865, lng: -0.118092
//       };

//   return (
//     <div className='map'>
//         <LoadScriptNext
//         googleMapsApiKey="AIzaSyBPdQXtf2Q3yeCXCxqYeCHnVDn0VlBcxQI"
//         language='EN'
//       >
//         {/* 换地图 可换自己的ApiKey */}
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={12}
//           className='google'
//         >
//           { /* Child components, such as markers, info windows, etc. */ }
//           <></>
//         </GoogleMap>
//       </LoadScriptNext >
//       <Menu />
//     </div>
//   )
// }
