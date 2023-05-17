
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import './map.scss'
import axios from 'axios';
import { MarkerClusterer } from '@react-google-maps/api';
import { TreeSelect, Button, Card, Table, Space} from 'antd';
// import { logDOM } from '@testing-library/react';

const { SHOW_PARENT } = TreeSelect;
const { Column} = Table;
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
            {
                title: '>3',
                value: '0-1-4',
                key: '0-1-4',
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
            {
                title: '>3',
                value: '0-2-3',
                key: '0-2-3',
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
    // {
    //     title: 'No. of Bathrooms',
    //     value: '0-5',
    //     key: '0-5',
    //     children: [
    //         {
    //             title: '1',
    //             value: '0-5-0',
    //             key: '0-5-0',
    //         },
    //         {
    //             title: '2',
    //             value: '0-5-1',
    //             key: '0-5-1',
    //         },
    //         {
    //             title: '3',
    //             value: '0-5-2',
    //             key: '0-5-2',
    //         },
    //     ],
    // },
    {
        title: 'Prices',
        value: '0-6',
        key: '0-6',
        children: [
            {
                title: '<200000',
                value: '0-6-0',
                key: '0-6-0',
            },
            {
                title: '200000-600000',
                value: '0-6-1',
                key: '0-6-1',
            },
            {
                title: '>600000',
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

    const [value, setValue] = useState(['0-0-0']);

    const onChange = (newValue) => {
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
            width: '90%',
        },
    };

    const [property, setProperty] = useState()

    
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
            setProperty(properties)
            const locations = await Promise.all(promises);
            setLocations(locations);
        };

        Geocode.setApiKey("AIzaSyCkT6rPwlprpK8qnwG4SMnnloCsp7NcJkk");
        fetchData();
    }, []);

    const handleClick = (clusterer, locations, index) =>{
        console.log(locations[index].lat);
    }

    const [search, setSearch] = useState({
        House_Type: "",
        No_of_Bedrooms: "",
        No_of_Bathrooms: "",
        No_of_Receptions: "",
        City: "",
        Price: ""
    })

    const [result, setResult] = useState([])

    const [disTable, setTable] = useState(null)

    const handleSearch = () =>{
        setTable(true)
        switch (value[0])
        {
        case '0-0-0':
                setSearch((prev) => ({ ...prev, House_Type: "House" }))
            break;
        case '0-0-1':
                setSearch((prev) => ({ ...prev, House_Type: "Flat / Apartment" }))
            break;
        case '0-0-2':
                setSearch((prev) => ({ ...prev, House_Type: "New development" }))
            break;
        case '0-0-3':
                setSearch((prev) => ({ ...prev, House_Type: "Duplex" }))
            break;
        default:
            break;
        }
        switch (value[1])
        {
        case '0-1-1':
                setSearch((prev) => ({ ...prev, No_of_Bedrooms: 1 }))
            break;
        case '0-1-2':
                setSearch((prev) => ({ ...prev, No_of_Bedrooms: 2 }))
            break;
        case '0-1-3':
                setSearch((prev) => ({ ...prev, No_of_Bedrooms: 3 }))
            break;
        case '0-1-4':
                setSearch((prev) => ({ ...prev, No_of_Bedrooms: 4 }))
            break;
        default:
            break;
        }
        switch (value[2])
        {
        case '0-2-0':
                setSearch((prev) => ({ ...prev, No_of_Bathrooms: 1 }))
            break;
        case '0-2-1':
                setSearch((prev) => ({ ...prev, No_of_Bathrooms: 2 }))
            break;
        case '0-2-2':
                setSearch((prev) => ({ ...prev, No_of_Bathrooms: 3 }))
            break;
        case '0-2-3':
                setSearch((prev) => ({ ...prev, No_of_Bathrooms: 4 }))
            break;
        default:
            break;
        }
        switch (value[3])
        {
        case '0-3-0':
                setSearch((prev) => ({ ...prev, No_of_Receptions: 1 }))
            break;
        case '0-3-1':
                setSearch((prev) => ({ ...prev, No_of_Receptions: 2 }))
            break;
        case '0-3-2':
                setSearch((prev) => ({ ...prev, No_of_Receptions: 3 }))
            break;
        default:
            break;
        }
        switch (value[4])
        {
        case '0-4-0':
                setSearch((prev) => ({ ...prev, City: "London" }))
            break;
        case '0-4-1':
                setSearch((prev) => ({ ...prev, City: "Lillie Square" }))
            break;
        case '0-4-2':
                setSearch((prev) => ({ ...prev, City: "Surrey" }))
            break;
        default:
            break;
        }
        switch (value[5])
        {
        case '0-6-0':
                setSearch((prev) => ({ ...prev, Price: 1 }))
            break;
        case '0-6-1':
                setSearch((prev) => ({ ...prev, Price: 2 }))
            break;
        case '0-6-2':
                setSearch((prev) => ({ ...prev, Price: 3 }))
            break;
        default:
            break;
        }
        console.log(search);
        for(let tmp of property){
            if(search.House_Type === tmp.House_Type){
                if(search.No_of_Bedrooms != '' && ((search.No_of_Bedrooms <= 3 && search.No_of_Bedrooms == tmp.No_of_Bedrooms) || (search.No_of_Bedrooms > 3 && search.No_of_Bedrooms <= tmp.No_of_Bedrooms))){
                    if(search.No_of_Bathrooms != '' && ((search.No_of_Bathrooms <= 3 && search.No_of_Bathrooms == tmp.No_of_Bathrooms) || (search.No_of_Bathrooms > 3 && search.No_of_Bathrooms <= tmp.No_of_Bathrooms))){
                        if(search.No_of_Receptions  != '' && ((search.No_of_Receptions <= 3 && search.No_of_Receptions == tmp.No_of_Receptions) || (search.No_of_Receptions > 3 && search.No_of_Receptions <= tmp.No_of_Receptions))){
                            if(search.City != '' &&search.City === tmp.City){
                                if(search.Price != '' && (search.Price === 1 && tmp.Price < 200000) || (search.Price === 2 && tmp.Price >= 200000 && tmp.Price < 600000) || (search.Price === 3 && tmp.Price >= 600000)){
                                    setResult(
                                        prev => ([ ...prev, tmp ])
                                    )
                                }
                                if (search.Price == '' ){
                                    setResult(
                                        prev => ([ ...prev, tmp ])
                                    )
                                }
                            }
                            if (search.City == '')
                            {
                                setResult(
                                    prev => ([ ...prev, tmp ])
                                )
                            }
                        }
                        if (search.No_of_Receptions == '')
                        {
                            setResult(
                                prev => ([ ...prev, tmp ])
                            )
                        }
                    }
                    if (search.No_of_Bathrooms == '')
                    {
                        setResult(
                            prev => ([ ...prev, tmp ])
                        )
                    }
                }
                if (search.No_of_Bedrooms == '')
                {
                    setResult(
                        prev => ([ ...prev, tmp ])
                    )
                }
            }
        }
    }

    const renderMap = () => {
        return (
            <div className='map'>
               <div className='google'>
                    <GoogleMap
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
            <TreeSelect {...tProps} />
            <Button style={{margin:"10px"}} onClick={handleSearch}>Search</Button>
                          <Card className='r-card'>
        <Table dataSource={result}>
      <Column       
      title='Property_Name' 
      dataIndex='Property_Name'/>
      <Column       title='Price'
      dataIndex='Price'></Column>
            <Column             title='House_Type'
      dataIndex='House_Type'></Column>
                  <Column             title='Area_in_sq_ft'
      dataIndex='Area_in_sq_ft'></Column>
                        <Column             title='No_of_Bedrooms'
      dataIndex='No_of_Bedrooms'></Column>
                        <Column             title='No_of_Bathrooms'
      dataIndex='No_of_Bathrooms'></Column>
                        <Column             title='No_of_Receptions'
      dataIndex='No_of_Receptions'></Column>
                        <Column             title='Location'
      dataIndex='Location'></Column>
                        <Column             title='City'
      dataIndex='City'></Column>
                              <Column             title='Postal_Code'
      dataIndex='Postal_Code'></Column>
                                    <Column             title='Crime Rate'
      dataIndex='Crime Rate'></Column>
      </Table>
            </Card>
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
