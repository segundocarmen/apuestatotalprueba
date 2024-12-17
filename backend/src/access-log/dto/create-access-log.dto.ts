import { User } from '@entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

const entity = 'access log';

export class CreateAccessLogDto {
    @ApiProperty({
        description: `User of ${entity}`,
        example: 'xxxxxxxxxx'
    })
    @IsString()
    @IsUUID('4')
    readonly user: User;

    @ApiProperty({
        description: `Token of ${entity}`,
        example: 'xxxxxxxxxx'
    })
    @IsString()
    readonly token: string;

    @ApiProperty({
        description: `LocalTime of ${entity}`,
        example: 'xxxxxxxxxx'
    })
    @IsString()
    readonly localTime: string;
}
