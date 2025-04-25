import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateLevelDto } from './dto/create-level.dto'
import { UpdateLevelDto } from './dto/update-level.dto'

@Injectable()
export class LevelsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateLevelDto) {
        // Vérifie que le programme existe
        const program = await this.prisma.program.findUnique({
            where: { id: data.programId }
        })

        if (!program) {
            throw new NotFoundException('Programme non trouvé')
        }

        return await this.prisma.level.create({
            data: {
                name: data.name,
                sigle: data.sigle,
                index: data.index,
                program: { connect: { id: data.programId } }
            }
        })
    }

    async findAll() {
        return await this.prisma.level.findMany({
            include: { program: true }
        })
    }

    async update(id: number, data: UpdateLevelDto) {
        const existing = await this.prisma.level.findUnique({ where: { id } })
        if (!existing) throw new NotFoundException('Niveau non trouvé')

        return await this.prisma.level.update({
            where: { id },
            data
        })
    }

    async remove(id: number) {
        const existing = await this.prisma.level.findUnique({ where: { id } })
        if (!existing) throw new NotFoundException('Niveau non trouvé')

        return await this.prisma.level.delete({ where: { id } })
    }
}
