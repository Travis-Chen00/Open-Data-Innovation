
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import './map.scss'
import axios from 'axios';

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
            const properties = response.data.slice(0, 20);
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
        // Geocode.fromAddress(postcode).then(
        //     response => {
        //         const { lat, lng } = response.results[0].geometry.location;
        //         setLocation({ lat, lng });
        //     },
        //     error => {
        //         console.error(error);
        //     }
        // );
        fetchData();
    }, []);

    const renderMap = () => {
        return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={londonCenter}
                zoom={12}
            >
                {locations.map((location, index) => (
                    <Marker key={index} position={location} />
                ))}
            </GoogleMap>
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
