
const fs = require('fs');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const middlewares = jsonServer.defaults();

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync('userDb.json', 'UTF-8'));
const favoriteAnimalFile = 'favoriteAnimals.json';
const animalsFile = 'animals.json';


server.use(middlewares);
server.use(bodyParser.json());
server.use(cors());

const SECRET_KEY = '123456789';
const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// // Verify the token
// function verifyToken(token) {
//   return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
// }

// Check if the user exists in database
function getAuthenticatedUser({ email, password }) {
  const userIndex=userdb.users.findIndex(user => user.email === email && user.password === password);
  if(userIndex!==-1){
      return userdb.users[userIndex];
  }
  return null;
}

// Login endpoint
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const authenticatedUser=getAuthenticatedUser({ email, password });
  if (!authenticatedUser) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  const userId=authenticatedUser.id;
  const userFirstName=authenticatedUser.firstName;
  const userLastName=authenticatedUser.lastName;
  const access_token = createToken({ email, userId ,userFirstName,userLastName});
  res.status(200).json({ access_token });
});


/// Register endpoint
server.post('/auth/register', (req, res) => {
    const newUser = req.body;
    if (hasAccount(newUser.email)) {
      const status = 401;
      const message = 'A user with the given email address already exists';
      res.status(status).json({ status, message });
      return;
    }
    let existingUsers = userdb.users;
    existingUsers.push(newUser);
    saveUsers(existingUsers);
  
    const access_token = createToken({ email: newUser.email, password: newUser.password });
    res.status(200).json({ access_token });
  });
  
// Helper function to write users to the file
function saveUsers(users) {
    const data = { users: users };
    fs.writeFileSync('users.json', JSON.stringify(data, null, 2), 'utf8');
  }
// Check if the user email exists in database
function hasAccount({ email }) {
    return userdb.users.findIndex(user => user.email === email) !== -1;
  
}

//animals
function readAnimals() {
  const data = fs.readFileSync(animalsFile, 'utf8');
  return JSON.parse(data);
}

// Get all animals 
server.get('/animals', (req,res) => {
  const animals = readAnimals();
  if (!animals) {
    return res.status(404).json({ message: "No animals were found" });
  }
  res.json(animals);
});

// Get an animals 
server.get('/animals/:id', (req,res) => {
  const id = req.params.id;
  const animals = readAnimals();
  const animal = animals.pets.find(animal => animal.id === parseInt(id));
  if (!animal) {
    return res.status(404).json({ message: "No animal with the given id was found" });
  }
  res.json(animal);
});




// favorite list

// Helper function to write favorite animals to the file
function saveFavoriteAnimals(favoriteAnimals) {
  fs.writeFileSync(favoriteAnimalFile, JSON.stringify(favoriteAnimals, null, 2), 'utf8');
}

// Helper function to read favorite animals from the file
function readFavoriteAnimals() {
  if (fs.existsSync(favoriteAnimalFile)) {
    const data = fs.readFileSync(favoriteAnimalFile, 'utf8');
    return JSON.parse(data);
  } else {
    return {}; // Return an empty object if the file doesn't exist
  }
}

// Get favorite animals for a user
server.get('/animal/favorite/:id', (req, res) => {
  const userId = req.params.id;
  const favoriteAnimals = readFavoriteAnimals();
  if (!favoriteAnimals[userId]) {
    return res.json([]);
  }
  res.json(favoriteAnimals[userId]);
});

// Add a favorite animal for a user
server.post('/animal/favorite', (req, res) => {
  const { userId, newAnimal } = req.body;
  const favoriteAnimals = readFavoriteAnimals();
  
  if (!favoriteAnimals[userId]) {
    favoriteAnimals[userId] = [];
  }

  favoriteAnimals[userId].push(newAnimal);
  saveFavoriteAnimals(favoriteAnimals);
  res.status(200).json(favoriteAnimals[userId]);
});


// Delete a favorite animal for a user
server.delete('/animal/favorite/:userId/:animalId', (req, res) => {
  const userId = req.params.userId;
  const animalId = parseInt(req.params.animalId, 10);
  const favoriteAnimals = readFavoriteAnimals();
  
  if (!favoriteAnimals[userId]) {
    return res.status(404).json({ message: "No favorite animals found for this user" });
  }
  
  favoriteAnimals[userId] = favoriteAnimals[userId].filter(animal => animal.id !== animalId);
  saveFavoriteAnimals(favoriteAnimals);
  res.status(200).json(favoriteAnimals[userId]);
});

// search
server.get('/animals/search/:searchParam', (req, res) => {
  const searchParam = req.params.searchParam.toLowerCase();
  const animals = readAnimals();
  let foundAnimals = [];
  
  if (searchParam) {
    foundAnimals = animals.pets.filter(animal => {
      const matchesBreed = animal.breed.toLowerCase().includes(searchParam);
      const matchesCity = animal.city.toLowerCase() === searchParam;
      const matchesState = animal.state.toLowerCase() === searchParam;
      const matchesAnimal = animal.animal.toLowerCase() === searchParam;

      return matchesBreed || matchesCity || matchesState || matchesAnimal;
    });
  }

  res.json(foundAnimals);
});


// Middleware to verify token
// server.use(/^(?!\/auth).*$/, (req, res, next) => {
//   if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
//     const status = 401;
//     const message = 'Error in authorization format';
//     res.status(status).json({ status, message });
//     return;
//   }
//   try {
//     verifyToken(req.headers.authorization.split(' ')[1]);
//     next();
//   } catch (err) {
//     const status = 401;
//     const message = 'Error: access_token is revoked';
//     res.status(status).json({ status, message });
//   }
// });



server.listen(3000, () => {
  console.log('Mock server running at http://localhost:3000');
});
