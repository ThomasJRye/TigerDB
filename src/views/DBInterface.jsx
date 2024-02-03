import React, { useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

const DBInterface = ({ match }) => { // Destructure `match` from props
  const [data, setData] = useState(null);
  const id = match.params.id; // Access the `id` parameter

  useEffect(() => {
    // Example of using the `id` to fetch data from an API
    const fetchData = async () => {
      try {
        const response = await ApiService.getDB(id); // Assuming you have a method to fetch data by ID
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]); // Depend on `id` so this effect runs whenever `id` changes

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render your data based on the `id` */}
      <h2>Data for ID: {id}</h2>
      {/* Display your data here */}
    </div>
  );
};

export default DBInterface;
