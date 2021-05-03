// noinspection ExceptionCaughtLocallyJS

const express = require('express'),
    userSchema = require('../model/user'),
    comboSchema = require('../model/combo'),
    commentSchema = require('../model/comment'),
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
                        user.generateAuthToken();
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
        res.status(404).send();
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
        await userSchema.findByIdAndDelete(_id);
        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(500).send()
    }
});

myrouter.post('/combo', async (req, res) => {
    const combo = new comboSchema(req.body.combo);
    combo.save().then(() => {
        res.send(combo);
    }).catch((err) => {
        console.error(err);
        res.send(err);
    })
});
myrouter.get('/combo/:id', async (req, res) => {
    try {
        const combo = await comboSchema.findById(req.params.id);
        if (!combo) {
            throw new Error('Combo not found: ' + req.params.id)
        } else {
            res.send(combo);
        }
    } catch (e) {
        console.error(e);
        res.status(404).send();
    }
})
myrouter.get('/combo/random/:id', async (req, res) => {
    try {
        const combos = await comboSchema.find({});
        if (!combos) {
            throw new Error('Combos not found.')
        } else {
            let searchFor = req.params.id;
            const max = combos.length;
            if (searchFor > max) {
                searchFor = max
            }
            if (searchFor === max) {
                res.send(combos);
            } else {
                let alreadyAdded = [], filteredCombos = [];
                while (filteredCombos.length < searchFor) {
                    const tryIndex = Math.floor(Math.random() * searchFor);
                    if (!alreadyAdded.includes(tryIndex)) {
                        filteredCombos.push(combos[tryIndex])
                        alreadyAdded.push(tryIndex)
                    }
                }
                res.send(filteredCombos);
            }
        }
    } catch (e) {
        console.error(e);
        res.status(404).send();
    }
})
myrouter.get('/combo/user/:id', async (req, res) => {
    try {
        const combos = await comboSchema.find({author: req.params.id});
        if (!combos) {
            throw new Error('Combos not found for user: ' + req.params.id)
        } else {
            res.send(combos);
        }
    } catch (e) {
        console.error(e);
        res.status(404).send();
    }
})
myrouter.delete('/combo/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        await comboSchema.findByIdAndDelete(_id);
        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(500).send()
    }
})

myrouter.post('/comment', async (req, res) => {
    const comment = new commentSchema(req.body.comment);
    comment.save().then(() => {
        res.send(comment);
    }).catch((err) => {
        console.error(err);
        res.send(err);
    })
})
myrouter.get('/comment/:id', async (req, res) => {
    try {
        const comment = await commentSchema.findById(req.params.id);
        if (!comment) {
            throw new Error('Comment not found: ' + req.params.id)
        } else {
            res.send(comment);
        }
    } catch (e) {
        console.error(e);
        res.status(404).send();
    }
})
myrouter.get('/comment/combo/:id', async (req, res) => {
    try {
        const comments = await commentSchema.find({combo: req.params.id});
        if (!comments) {
            throw new Error('Comments not found for combo: ' + req.params.id)
        } else {
            res.send(comments);
        }
    } catch (e) {
        console.error(e);
        res.status(404).send();
    }
})
myrouter.get('/comment/user/:id', async (req, res) => {
    try {
        const comments = await commentSchema.find({author: req.params.id});
        if (!comments) {
            throw new Error('Comments not found for user: ' + req.params.id)
        } else {
            res.send(comments);
        }
    } catch (e) {
        console.error(e);
        res.status(404).send();
    }
})
myrouter.delete('/comment/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        await commentSchema.findByIdAndDelete(_id);
        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(500).send()
    }
})


module.exports = myrouter;