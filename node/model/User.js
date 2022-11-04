import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        require: false,
    },
    lastname: {
        type: String,
        require: false,
    },
    address: {
            add_line1 : {type:String},
            add_line2: {type:String},
            state: {type:String},
            city: {type:String}
    },
    mobileno: {
        type: Number,
        require: false,
    },
    email: {
        type: String,
        require: false,
    },
    password: {
        type: String,
        require: false,
    }


});
const userdata = mongoose.model("`user`", userSchema);

export default userdata;