// noinspection ExceptionCaughtLocallyJS

const express = require('express'),
    userSchema = require('../model/user'),
    bcrypt = require('bcryptjs');

myrouter = new express.Router();

myrouter.post('/register', async (req, res) => {
   const user = new userSchema(req.body.user);
   user.save().then(() => {
       res.send(user);
   }).catch((err) => {
       console.error(err);
       res.send(err);
   });
});
myrouter.post('/login', async (req, res) => {
    try {
        const creds = req.body.user;
        const email = creds.email;
        const pw = creds.password;
        const user = await userSchema.findOne({email});
        if (!user) {
            throw new Error('Invalid login.');
        } else {
            await bcrypt.compare(pw, user.password, (err, tr) => {
                try {
                    if (err) {
                        throw new Error('Login error.');
                    } else if (tr) {
                        console.log(`Login success: User ${email}`)
                        const token = user.generateAuthToken();
                        res.send({user: user})
                    } else {
                        throw new Error('Invalid login.');
                    }
                } catch (e) {
                    console.error(e);
                }
            });
        }
    } catch (e) {
        console.error(e);
        res.status(400).send()
    }
});
myrouter.get('/user/:id', async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id);
        if (!user) {
            throw new Error('Person not found: ' + req.params.id)
        } else {
            res.send(user);
        }
    } catch (e) {
        console.error(e);
        res.status(404).send()
    }
});
myrouter.put('/user/:id', async (req, res) => {
    try {
        const user = new userSchema(req.body.user);
        const _id = user.id;
        const dbUser = await userSchema.findByIdAndUpdate(_id, user, {new: true});
        if (!dbUser) {
            throw new Error('Person not found.')
        } else {
            res.send(dbUser);
        }
    } catch (e) {
        console.error(e);
        res.status(404).send()
    }
});
myrouter.delete('/user/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const dbUser = await userSchema.findByIdAndDelete(_id);
        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(500).send()
    }
})

module.exports = myrouter;