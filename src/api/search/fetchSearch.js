
const fetchSearchResult = async ({ queryKey }) => {
  const searchParam=queryKey[1];
 

  const apiRes = await fetch(`http://localhost:3000/animals/search/${searchParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
      }
    });

  if (!apiRes.ok) {
    throw new Error(`Could not get searched list`);
  }
  return apiRes.json();
};

export default fetchSearchResult;
