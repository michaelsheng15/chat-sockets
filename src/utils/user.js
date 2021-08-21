const users = [];

const addUser = ({ id, username, room }) => {
  //clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  //Check name is unique
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username; //checks for unique room and unqiue name
  });

  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  //Stores user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => {
    //stores index of user with the id we are removing
    return user.id === id;
  });

  if (index !== -1) {
    //if a user with same ID is found, then remove
    return users.splice(index, 1)[0]; //creating an array with the element removed
  }
};

const getUser = (id) => {
  const result = users.find((user) => {
    if (user.id === id) {
      return user;
    }
  });

  return result
};

const getUsersInRoom = (room) =>{
     return users.filter((user)=> user.room === room)


}

module.exports = {addUser, removeUser, getUser, getUsersInRoom}