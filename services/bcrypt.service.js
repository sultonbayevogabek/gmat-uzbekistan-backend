import bcrypt from 'bcrypt';

export class BcryptService {
    async generateHash(data) {
        return await bcrypt.hash(data, await bcrypt.genSalt(10));
    }

    async compareHash(data, hash) {
        return await bcrypt.compare(data, hash);
    }
}
