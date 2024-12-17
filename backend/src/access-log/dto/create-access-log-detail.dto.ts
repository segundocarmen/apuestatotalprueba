import { AccessLog } from '@entities/access-log.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

const entity = 'access log detail';

export class CreateAccessLogDetailDto {
    @ApiProperty({
        description: `Log of ${entity}`,
        example: 'xxxxxxxxxx'
    })
    @IsString()
    @IsUUID('4')
    readonly accessLog: AccessLog;

    @ApiProperty({
        description: `Path of ${entity}`,
        example: 'xxxxxxxxxx'
    })
    @IsString()
    readonly path: string;

    @ApiProperty({
        description: `Order of ${entity}`,
        example: 0
    })
    @IsString()
    readonly order: number;
}
