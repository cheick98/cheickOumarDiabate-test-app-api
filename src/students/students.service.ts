import {
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateStudentDto } from './dto/create-student.dto'

@Injectable()
export class StudentsService {
    constructor(private readonly prisma: PrismaService) { }

    // 🔹 Créer un étudiant
    async create(data: CreateStudentDto) {
        const { programId, levelId, ...studentData } = data

        // Vérifie si le programme existe
        const program = await this.prisma.program.findUnique({
            where: { id: programId }
        })
        if (!program) {
            throw new NotFoundException(`Programme introuvable (id: ${programId})`)
        }

        // Vérifie si le niveau existe
        const level = await this.prisma.level.findUnique({
            where: { id: levelId }
        })
        if (!level) {
            throw new NotFoundException(`Niveau introuvable (id: ${levelId})`)
        }

        // Crée l'étudiant
        const student = await this.prisma.student.create({
            data: {
                ...studentData,
                program: { connect: { id: programId } },
                level: { connect: { id: levelId } }
            },
            include: {
                program: true,
                level: true
            }
        })

        return {
            message: 'Étudiant créé avec succès',
            data: student
        }
    }

    // 🔹 Lister tous les étudiants
    async getAll() {
        return await this.prisma.student.findMany({
            include: {
                program: true,
                level: true
            },
            orderBy: { nom: 'asc' }
        })
    }

    // 🔹 Voir un étudiant par son ID
    async getOne(studentId: number) {
        const student = await this.prisma.student.findUnique({
            where: { id: studentId },
            include: {
                program: true,
                level: true
            }
        })

        if (!student) {
            throw new NotFoundException(`Étudiant introuvable (id: ${studentId})`)
        }

        return student
    }
}
