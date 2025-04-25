import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProgramDto } from './dto/create-program.dto'
import { UpdateProgramDto } from './dto/update-program.dto'

@Injectable()
export class ProgramsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateProgramDto) {
        return await this.prisma.program.create({ data })
    }

    async findAll() {
        return await this.prisma.program.findMany()
    }

    async update(id: number, data: UpdateProgramDto) {
        const existing = await this.prisma.program.findUnique({ where: { id } })
        if (!existing) throw new NotFoundException('Programme non trouvé')

        return await this.prisma.program.update({
            where: { id },
            data
        })
    }

    async remove(id: number) {
        const existing = await this.prisma.program.findUnique({ where: { id } })
        if (!existing) throw new NotFoundException('Programme non trouvé')

        return await this.prisma.program.delete({ where: { id } })
    }
}
