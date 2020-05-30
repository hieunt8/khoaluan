var users = [];

const addUser = async ({ id, name, room }) => {
  if (name || room) {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
  }

  const existingUser = users.find((user) => user.room === room && user.name === name);
  // users.find((user)=>{
  //   if(user.room === room && user.name ===name){
  //     return user;
  //   }
  // })
  if (!name || !room) return  { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };
  users.push(user);
  return { user };
}

const removeUser = (id) => {
  let index=-1;
   index = users.find((user) => user.id === id);
  // console.log(user);
  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => {
  if (user.id === id) {
    // console.log(user.room);
    return user;
  }

});

const getUsersInRoom = (room) => users.find((user) => {
  // console.log(room);
  if (user.room === room) {
    return user;
  }
});

module.exports = { addUser, removeUser, getUser, getUsersInRoom };