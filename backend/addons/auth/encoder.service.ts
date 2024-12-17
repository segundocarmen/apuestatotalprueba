import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncoderService {
    async encodePassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    }

    async checkPassword(
        password: string,
        userPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, userPassword);
    }
}
