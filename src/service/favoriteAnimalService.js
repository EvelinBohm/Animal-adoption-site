export const addFavoriteAnimal = async ({ userId, newAnimal }) => {
    const response = await fetch('http://localhost:3000/animal/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({ userId, newAnimal })
    });
  
    if (!response.ok) {
      throw new Error('Failed to add favorite animal');
    }
  
    return response.json();
  };

  export const deleteFavoriteAnimal = async ({ userId, animalId }) => {
    const response = await fetch(`http://localhost:3000/animal/favorite/${userId}/${animalId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({ userId, animalId })
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete favorite animal');
    }
  
    return response.json();
  };