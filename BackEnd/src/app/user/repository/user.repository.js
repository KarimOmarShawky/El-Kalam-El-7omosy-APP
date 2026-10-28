import {User} from "../model/user.model.js";
export const findUserByEmail = async (email) => {
    return await User.findOne({ email: String(email) });
};
export const findUserForLogin = async (email) => {
    return await User.findOne({ email: String(email) }).select('+password');
};
export const incrementFailedLoginAttempts = async (email) => {
    return await User.findOneAndUpdate(
        { email: String(email) },
        { $inc: { failedLoginAttempts: 1 } },
        { returnDocument: 'after' },
    );
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

export const checkLockedAccount = async (email) => {
    const user = await User.findOne({ email: String(email) });
    if (!user) {
        throw new Error('User not found');
    }  
  if (user.failedLoginAttempts >= 5 && user.accountLockedUntil > new Date()) {
    return true; // Account is locked
    } 
    return false; // Account is not locked
}