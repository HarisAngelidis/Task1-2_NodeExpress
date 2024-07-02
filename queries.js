const mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ForTheWin100",
    database: "users"
});

 //ta queries gia to 1o task

 //epilogh olwn twn xrhstwn
function SelectUsers() {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM Users", function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//epilogh toy xrhsth me sygkekrimeno id
function SelectUserById(id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM Users WHERE UserId=${id}`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//prosthiki xrhsth
function AddUser(id, lastname, firstname, age, dateofbirth) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Users (UserId, LastName, FirstName, Age, DateOfBirth) VALUES (?, ?, ?, ?, ?)`;
        const values = [id, lastname, firstname, age, dateofbirth];
        con.query(query, values, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//evresi twn id
function SelectIds() {
    return new Promise((resolve, reject) => {
        con.query("SELECT UserId FROM Users", function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//enhmerwsh xrhsth
function UpdateUser(id, lastname, firstname, age, dateofbirth) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE Users SET LastName = ?, FirstName = ?, Age = ?, DateOfBirth = ? WHERE UserId = ?`;
        con.query(query, [lastname, firstname, age, dateofbirth, id], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//epilogh xrhstwn se evros hmeromhnias
function GetUsersByDate(ApoDate, MexriDate) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Users WHERE DateOfBirth BETWEEN ? AND ?`;
        con.query(query, [ApoDate, MexriDate], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//diagrafh xrhsth
function DeleteUser(id) {
    return new Promise((resolve, reject) => {
        con.query(`DELETE FROM Users WHERE UserId=${id}`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { SelectIds,SelectUsers,SelectUserById,AddUser,UpdateUser,GetUsersByDate,DeleteUser};
