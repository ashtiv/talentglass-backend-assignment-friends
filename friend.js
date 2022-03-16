import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const friendschema = new Schema(
    {
        id: Number,
        Name: String,
    }
);
const friend = mongoose.model('friend', friendschema)
export default friend;