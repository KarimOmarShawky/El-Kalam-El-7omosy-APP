import {User} from '../../user/model/user.model.js';


export const createUser = async (userData) => {
   return await User.create(userData)
}