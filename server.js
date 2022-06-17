const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const path=require('path');

mongoose.connect('mongodb://localhost:27017/formData', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo Connection open');
    })
    .catch(err => {
        console.log(err);
    });

const dataSchema= new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    comment:{
        type:String
    }
})
const Data=mongoose.model('Data', dataSchema);

app.get('/form', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/form', async (req, res)=>{
    const data=await new Data(req.body);
    console.log(data);
    await data.save();
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.listen(3000, (req, res)=>{
    console.log("Listening to port 3000");
})