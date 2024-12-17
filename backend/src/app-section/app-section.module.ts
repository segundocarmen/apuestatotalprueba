import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
/**ADDONS**/
import { ResponseService } from '@addons/response/Response.service';
/**ENTITIES**/
import { AppSection } from '@entities/app-section.entity';
/**CONTROLLER**/
import { AppSectionController } from './app-section.controller';
/**SERVICE**/
import { AppSectionService } from './app-section.service';

@Module({
    imports: [TypeOrmModule.forFeature([AppSection])],
    controllers: [AppSectionController],
    providers: [AppSectionService, ResponseService]
})
export class AppSectionModule {}
