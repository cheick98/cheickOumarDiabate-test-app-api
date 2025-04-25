import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from '@nestjs/common'
import { StudentsService } from './students.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt.service'

@ApiTags('Étudiants')
@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() data: CreateStudentDto) {
        return this.studentsService.create(data)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.studentsService.getAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.studentsService.getOne(id)
    }
}
