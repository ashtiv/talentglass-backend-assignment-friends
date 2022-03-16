import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import friend from './friend.js';
const app = express();
app.use(express.json());
app.use(cors({ credentials: true }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})
const port = process.env.PORT || 5000;
const connection_url = 'mongodb+srv://ashtiv:WrixhsPValSHLRha@cluster0.saetc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
const db = mongoose.connection;
app.get('/', (req, res) => { res.send('Welcome to server') })
app.get('/friends', (req, res) => {
    const fetchdata = async () => {
        friend.find((err, data) => {
            if (err) {
                res.send(err)
            } else {
                var newarray = [];
                for (var i = 0; i < data.length; i++) {
                    const newobj = {
                        "id": data[i].id,
                        "Name": data[i].Name
                    }
                    newarray.push(newobj);
                }
                res.send(newarray);
            }
        })
    }
    fetchdata();
})
app.post('/friends', (req, res) => {
    const obj = new friend(req.body)
    console.log(obj, " oobbjj");
    obj.save();
    var newobj = {};
    newobj = {
        "id": obj.id,
        "Name": obj.Name
    }
    res.send(newobj)
})
app.get('/friends/:id', (req, res) => {
    const id = req.params.id;
    const fetchdata = async () => {
        friend.find({ id: id }, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                var newobj = {};
                newobj = {
                    "id": data[0].id,
                    "Name": data[0].Name
                }
                res.send(newobj);
            }
        })
    }
    fetchdata();
})
app.listen(port, () => console.log(`Listening on localhost:${port}`));