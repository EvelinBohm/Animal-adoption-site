
const fetchAnimalList = async () => {

      const apiRes = await fetch(`http://localhost:3000/animals`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
          }
        });
  
      if (!apiRes.ok) {
        throw new Error(`Could not get favorite list`);
      }
      return apiRes.json();
    };
    
    export default fetchAnimalList;
    