const { response } = require('express');
const knex = require ('../models/knex')
const bcrypt = require ('bcrypt')

// create data
exports.register = async (req, res, next) => {
    try {
        const insertData = req.body
        const hashedPassword = bcrypt.hashSync(insertData.password, 8 )
        
        let regis = await knex('users').insert({
            email: insertData.email,
            username: insertData.username,
            password: hashedPassword
        }).then(insertId => {
            return insertId
        })

        res.status(201).send({
            message: `user created`,
            id: regis[0]
        })
    } catch (error) {
        return res.status(500).send ({
            error: error
        })
    }
}

// read data
exports.getDetailUser = async (req,res,next) =>{
    try {
        const params = req.params.id

        let getUserData = await knex('users').where({
            id: params
        }).select('*')

        res.status(200).send({
            message:`user data tersedia`,
            data: getUserData[0]
        })

    } catch (error) {
        return res.status(500).send ({
            error: error
        })
    }
}

// delete data
exports.deleteUser = async (req,res,next) =>{
    try {
        const params = req.params.id

        let deleteUser = await knex('users').where({
            id: params
        }).del()

        res.status(200).send({
            message:`delete user berhasil`,
            data: deleteUser[0]
        })

    } catch (error) {
        return res.status(500).send ({
            error: error
        })
    }
}

// update data
exports.updateUser = async (req,res,next) =>{
    try {
        const params = req.params.id
        const update = req.body

        let updateUser = await knex('users').where({
            id: params
        }).update({
            email: update.email,
            username: update.username
        })

        res.status(200).send({
            message:`user update berhasil`,
            data: updateUser
        })

    } catch (error) {
        return res.status(500).send ({
            error: error
        })
    }
}