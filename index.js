const express = require('express');
const path = require('path'); 
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const {SelectIds} = require('./queries');
const {SelectUsers} = require('./queries');
const {SelectUserById} = require('./queries');
const {AddUser} = require('./queries');
const {UpdateUser} = require('./queries');
const {GetUsersByDate} = require('./queries');
const {DeleteUser} = require('./queries');

const {SelectUserRole} = require('./queries2');
const {AddUserRole} = require('./queries2');
const {UpdateUserRole} = require('./queries2');
const {SelectAdmins} = require('./queries2');
const {SelectUserRoleById} = require('./queries2');
const {GetUsersByDateRole} = require('./queries2');

const app = express();

//task1

//emfanisi olon ton xrhston
app.get('/users', async (req, res) => {
  try {
      const result = await SelectUsers();
      res.json(result);
  } catch (err) {
      res.status(500).json({ msg: `Something went wrong`});
  }
});



//emfanisi xrhsth me sygkekrimeno id
app.get('/users/:id', async (req, res) => {
id = parseInt(req.params.id);

  try {
      const result = await SelectUserById(id);

      //an den yparxei o xrhsths
      if(!result.length>0){
        res.status(400).json({ msg: `A user with that id does not exist`});}
        else{
      res.json(result);}
  } catch (err) {
      res.status(500).json({ msg: `Something went wrong`});
  }
});

app.use(bodyParser.json());

//prosthiki xrhsth
app.post('/add/user', async (req, res) => {
  try {
   
    
      const LastName = req.body.LastName;

    //an den exei symplhrothei epitheto
    if(!LastName ){
      console.log("d");
      res.status(400).json({ msg: `The new user must have a last name`});
      return;}  

      const FirstName = req.body.FirstName;
      const Age = req.body.Age;
      const DOB = req.body.DateOfBirth;

  
     await AddUser(LastName, FirstName, Age, DOB);
      res.status(200).json({ msg: 'User added' });
  } catch (err) {
    
      res.status(500).json({ msg: 'Something went wrong' });
  }
});

//enhmerosh xrhsth
app.put('/update/user/:id', async (req, res) => {
  try {

    id = parseInt(req.params.id);

      const {LastName, FirstName, Age, DateOfBirth } = req.body;

      //an den yparxei o xrhsths
      const result = await SelectUserById(id);
      
     if(!result.length>0){
        res.status(400).json({ msg: `A user with that id does not exist`});}

        else{
      
      await UpdateUser(id, LastName, FirstName, Age, DateOfBirth);
      res.status(200).json({ msg: 'User updated' });}
  } catch (err) {
      
      res.status(500).json({ msg: 'Something went wrong' });
  }
});

//emfanisi xrhston se ena evros hmeromhnion
app.get('/users/byDate/:Apo/:Mexri', async (req, res) => {
  try {
      const Apo  = req.params.Apo;
      const Mexri = req.params.Mexri;
   
      const result = await GetUsersByDate(Apo, Mexri);
      res.status(200).json(result);
  } catch (err) {
     
      res.status(500).json({ msg: 'Something went wrong' });
  }
});

//diagrafh xristi
app.delete('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  //an den yparxei o xristis
  const result = await SelectUserById(id);

  if(!result.length>0){
    res.status(400).json({ msg: `A user with that id does not exist`});
  return;}
    try {
        const result = await DeleteUser(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong`});
    }
  });

  //task2

  //emfanisi xriston kai rolon (tropopoihsh endpoint A)
  app.get('/userRole', async (req, res) => {
    try {
        const result = await SelectUserRole();
        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong`});
    }
  });

  //prosthiki xristi me rolo (tropopoihsh endpoint C)
  app.post('/add/userRole', async (req, res) => {
    try {
   
    
      const LastName = req.body.LastName;
      const Role = req.body.Role;

    //an den exei symplhrosei ta aparaithta pedia
    if(!LastName || !Role){
      console.log("d");
      res.status(400).json({ msg: `The new user must have a last name and a role`});
      return;}  

      const FirstName = req.body.FirstName;
      const Age = req.body.Age;
      const DOB = req.body.DateOfBirth;

     
     const id = await AddUser(LastName, FirstName, Age, DOB);

     await AddUserRole(id, Role);

      res.status(200).json({ msg: 'User added' });
  } catch (err) {
    
      res.status(500).json({ msg: 'Something went wrong' });
  }
  });

  //enhmerwsh roloy
  app.put('/update/userRole/:id', async (req, res) => {
    try {
  
      id = parseInt(req.params.id);
  
        const Role = req.body.Role;

         //an den yparxei to id
         const result = await SelectUserRoleById(id);

         if(!result.length>0){
           res.status(400).json({ msg: `A user with that id does not exist`});
         return;}
        
        await UpdateUserRole(id, Role);
        res.status(200).json({ msg: 'Role updated' });
    } catch (err) {
        
        res.status(500).json({ msg: 'Something went wrong' });
    }
  });

  //emfanisi admin
  app.get('/admins', async (req, res) => {
    try {
        const result = await SelectAdmins();
        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: `Something went wrong`});
    }
  });

  //emfanisi xrhston sygkekrimenou roloy se ena evros hmeromhnion(tropopoihsh toy endpoint E)
app.get('/users/byDate/:Apo/:Mexri/:Rolos', async (req, res) => {
  try {
      const Apo  = req.params.Apo;
      const Mexri = req.params.Mexri;
      const Role = req.params.Rolos;
   
      const result = await GetUsersByDateRole(Apo, Mexri,Role);
      res.status(200).json(result);
  } catch (err) {
     
      res.status(500).json({ msg: 'Something went wrong' });
  }
});



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));