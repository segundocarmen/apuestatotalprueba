import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseService } from '@addons/response/Response.service';
/**ENTITIES**/
import { UserRole } from '@entities/user-role.entity';
/**CONTROLLER**/
import { UserRoleController } from './user-role.controller';
/**SERVICE**/
import { UserRoleService } from './user-role.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRole])],
    controllers: [UserRoleController],
    providers: [UserRoleService, ResponseService]
})
export class UserRoleModule {}
