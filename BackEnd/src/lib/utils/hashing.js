import bcrypt from 'bcrypt';

export const hashPassword = (password, rounds) => {
    return bcrypt.hash(password, rounds);
};

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};