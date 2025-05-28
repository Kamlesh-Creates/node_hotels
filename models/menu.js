const mongoose=require('mongoose');
const menuschema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
});

const menu=mongoose.model('menu',menuschema);
module.exports=menu;