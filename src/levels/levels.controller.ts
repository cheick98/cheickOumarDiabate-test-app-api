import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common'
import { LevelsService } from './levels.service'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateLevelDto } from './dto/create-level.dto'
import { UpdateLevelDto } from './dto/update-level.dto'
import { JwtAuthGuard } from 'src/auth/jwt.service'

@ApiBearerAuth()
@ApiTags('Niveaux')
@Controller('levels')
export class LevelsController {
    constructor(private readonly levelsService: LevelsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateLevelDto) {
        return this.levelsService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.levelsService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateLevelDto
    ) {
        return this.levelsService.update(id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.levelsService.remove(id)
    }
}
