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
import { ProgramsService } from './programs.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CreateProgramDto } from './dto/create-program.dto'
import { UpdateProgramDto } from './dto/update-program.dto'
import { JwtAuthGuard } from 'src/auth/jwt.service'

@ApiBearerAuth()
@ApiTags('Programmes')
@Controller('programs')
export class ProgramsController {
    constructor(private readonly programsService: ProgramsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateProgramDto) {
        return this.programsService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.programsService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProgramDto
    ) {
        return this.programsService.update(id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.programsService.remove(id)
    }
}
