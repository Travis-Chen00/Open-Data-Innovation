
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import './map.scss'
import axios from 'axios';
import { MarkerClusterer } from '@react-google-maps/api';
import 'antd/dist/antd.min.css'
import { TreeSelect } from 'antd';


const { SHOW_PARENT } = TreeSelect;

const treeData = [
    {
        title: 'Type',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'House',
                value: '0-0-0',
                key: '0-0-0',
            },
            {
                title: 'Flat / Apartment',
                value: '0-0-1',
                key: '0-0-1',
            },
            {
                title: 'New development',
                value: '0-0-2',
                key: '0-0-2',
            },
            {
                title: 'Duplex',
                value: '0-0-3',
                key: '0-0-3',
            },
        ],
    },
    {
        title: 'No. of Bedrooms',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: '1',
                value: '0-1-1',
                key: '0-1-1',
            },
            {
                title: '2',
                value: '0-1-2',
                key: '0-1-2',
            },
            {
                title: '3',
                value: '0-1-3',
                key: '0-1-3',
            },
        ],
    },
    {
        title: 'No. of Bathrooms',
        value: '0-2',
        key: '0-2',
        children: [
            {
                title: '1',
                value: '0-2-0',
                key: '0-2-0',
            },
            {
                title: '2',
                value: '0-2-1',
                key: '0-2-1',
            },
            {
                title: '3',
                value: '0-2-2',
                key: '0-2-2',
            },
        ],
    },
    
    {
        title: 'No. of Receptions',
        value: '0-3',
        key: '0-3',
        children: [
            {
                title: '1',
                value: '0-3-0',
                key: '0-3-0',
            },
            {
                title: '2',
                value: '0-3-1',
                key: '0-3-1',
            },
            {
                title: '3',
                value: '0-3-2',
                key: '0-3-2',
            },
        ],
    },
    {
        title: 'City',
        value: '0-4',
        key: '0-4',
        children: [
            {
                title: 'London',
                value: '0-4-0',
                key: '0-4-0',
            },
            {
                title: 'Lillie Square',
                value: '0-4-1',
                key: '0-4-1',
            },
            {
                title: 'Surrey',
                value: '0-4-2',
                key: '0-4-2',
            },
        ],
    },
    {
        title: 'No. of Bathrooms',
        value: '0-5',
        key: '0-5',
        children: [
            {
                title: '1',
                value: '0-5-0',
                key: '0-5-0',
            },
            {
                title: '2',
                value: '0-5-1',
                key: '0-5-1',
            },
            {
                title: '3',
                value: '0-5-2',
                key: '0-5-2',
            },
        ],
    },
    {
        title: 'Prices',
        value: '0-6',
        key: '0-6',
        children: [
            {
                title: '1-1000',
                value: '0-6-0',
                key: '0-6-0',
            },
            {
                title: '2-1000',
                value: '0-6-1',
                key: '0-6-1',
            },
            {
                title: '3-1000',
                value: '0-6-2',
                key: '0-6-2',
            },
        ],
    },
];


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

    // --------------------------------筛选------------------------------------------
    const [value, setValue] = useState(['0-0-0']);

    const onChange = (newValue) => {
        console.log('onChange ', value);
        setValue(newValue);
    };

    const tProps = {
        treeData,
        value,
        onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Please select',
        style: {
            width: '100%',
        },
    };

    // --------------------------------筛选------------------------------------------

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/london.json');
            const properties = response.data.slice(0, 100);
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

    const handleClick = (clusterer, locations, index) => {
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
                                <Marker key={index} position={location} clusterer={clusterer} onClick={() => handleClick(clusterer, locations, index)} />
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
        <div>
            <TreeSelect {...tProps} />
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


