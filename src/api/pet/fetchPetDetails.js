const fetchPetDetails = async ({ queryKey }) => {
    const id = queryKey[1];
  
    const apiRes = await fetch(`http://localhost:3000/animals/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
      }
    });
  
    if (!apiRes.ok) {
      throw new Error(`details/${id} fetch not ok`);
    }
    return apiRes.json();
  };
  
  export default fetchPetDetails;