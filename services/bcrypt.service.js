import bcrypt from 'bcrypt';

export const generateHash = async (data) => await bcrypt.hash(data, await bcrypt.genSalt(10));
export const compareHash = async (data, hash) => await bcrypt.compare(data, hash);
