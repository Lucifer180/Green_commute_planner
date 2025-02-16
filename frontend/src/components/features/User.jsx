import React from 'react';
import { data } from 'react-router-dom';

const User = () => {
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/users');
            console.log(response.data); 
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
      
        fetchUserData();
      }, []);      
  return (
    <div>{data}</div>
  )
}

export default User