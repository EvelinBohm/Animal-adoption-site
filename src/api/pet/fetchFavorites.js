
const fetchFavoriteList = async ({ queryKey }) => {
  const userId = queryKey[1];

    if(!userId){
        return [];
    }
   
  
    const apiRes = await fetch(`http://localhost:3000/animal/favorite/${userId.userId}`, {
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
  
  export default fetchFavoriteList;
  