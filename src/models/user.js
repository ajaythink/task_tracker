import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },

});

const User =mongoose.models.user || mongoose.model('user', userSchema);

export default User;


//mongodb+srv://ajaynice:<db_password>@firstcluster.5om5u.mongodb.net/