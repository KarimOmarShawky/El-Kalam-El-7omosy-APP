import {User} from "../model/user.model.js";
export const findUserByEmail = async (email) => {
    return await User.findOne({ email: String(email) });
};
export const updateUser = async (email, updatedData) =>{
    return await User.findOneAndUpdate(
        { email },
        updatedData,
        { returnDocument: 'after' },
    )
}

export const findUserByID = async(id) => {
    return await User.findOne({_id : id , isDeleted: false} , {password:0} , {})

}