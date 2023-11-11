const mysql = require('mysql2')
const dbConfig = require('../config/database')
const pool = mysql.createPool(dbConfig)

const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse')

const getUserinfo = (req, res) => {
    const query = "SELECT * FROM Userinfo ";

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Userinfo successfully fetched');
        })

        connection.release()
})}

const getUser = (req, res) => {
    const id = req.params.id;

    const query = `SELECT * FROM Userinfo WHERE id = ${id}`;

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, {id}, (err, results) => {
            if (err) throw err

            if (results.length > 0) {
                responseSuccess(res, results, 'User successfully fetched')
            } else {
                responseNotFound(res, 'User not found')
                return
            }
        })

        connection.release()
    })
}

const updateUser = (req, res) => {
    const id = req.params.id;
    const { name, email, addres, age, social_media } = req.body;

    const query = `UPDATE Userinfo SET name = ?, email = ?, addres = ?, age = ?, social_media = ? WHERE id = ?`;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [name, email, addres, age, social_media, id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows > 0) {
                responseSuccess(res, null, 'User successfully updated');
            } else {
                responseNotFound(res, 'User not found');
            }

            connection.release();
        });
    });
};

const deleteUser = (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM Userinfo WHERE id = ?';

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows > 0) {
                responseSuccess(res, null, 'User successfully deleted');
            } else {
                responseNotFound(res, 'User not found');
            }

            connection.release();
        });
    });
};

const createUser = (req, res) => {
    const { name, email, addres, age, social_media } = req.body;

    // Validate the request data as needed

    const query = 'INSERT INTO Userinfo (name, email, addres, age, social_media) VALUES (?, ?, ?, ?, ?)';

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [name, email, addres, age, social_media], (err, result) => {
            if (err) throw err;

            const newUserId = result.insertId;

            // Fetch the newly created User
            const fetchQuery = 'SELECT * FROM Userinfo WHERE id = ?';
            connection.query(fetchQuery, [newUserId], (err, newUser) => {
                if (err) throw err;

                responseSuccess(res, newUser, 'User successfully created');
            });

            connection.release();
        });
    });
};



module.exports = {
    getUserinfo,
    getUser,
    updateUser,
    deleteUser,
    createUser,
}