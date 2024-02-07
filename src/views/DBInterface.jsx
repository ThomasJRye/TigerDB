import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import ApiService from '../services/ApiService';
import { useAuth0 } from "@auth0/auth0-react";
import BarChart from './BarChart';
const DBInterface = ({ match }) => {
  const [data, setData] = useState(null);
  const id = match.params.id;
  const { getAccessTokenSilently } = useAuth0();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await ApiService.getDB(getAccessTokenSilently, id);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [getAccessTokenSilently, id]);

 

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  
  return (
    <BarChart />
  );
};

export default DBInterface;
