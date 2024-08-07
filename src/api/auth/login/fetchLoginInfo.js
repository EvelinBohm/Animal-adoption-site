const fetchLoginInfo = async ({ email, password }) => {
    const apiRes = await fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
  
    if (!apiRes.ok) {
      throw new Error(`Login fetch not ok`);
    }
  
    return apiRes.json();
  };
  
  export default fetchLoginInfo;
  