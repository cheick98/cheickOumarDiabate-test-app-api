import * as bcrypt from 'bcrypt'
import { PrismaClient } from 'generated/prisma'

const prisma = new PrismaClient()

async function main() {
    // ➤ 1. Créer un utilisateur admin
    const passwordHash = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin',
            password: passwordHash,
            role: 'ADMIN'
        }
    })

    // ➤ 2. Créer des programmes
    const programs = await prisma.program.createMany({
        data: [
            { name: 'Informatique', sigle: 'INFO', description: 'Programme Info' },
            { name: 'Gestion', sigle: 'GEST', description: 'Programme Gestion' },
            { name: 'Design', sigle: 'DSGN', description: 'Programme Design' }
        ]
    })

    const createdPrograms = await prisma.program.findMany()

    // ➤ 3. Créer des niveaux associés aux programmes
    const levels = await prisma.level.createMany({
        data: [
            { name: 'Licence 1', sigle: 'L1', index: 1, programId: createdPrograms[0].id },
            { name: 'Licence 2', sigle: 'L2', index: 2, programId: createdPrograms[0].id },
            { name: 'Bachelor', sigle: 'B1', index: 1, programId: createdPrograms[1].id },
            { name: 'Master 1', sigle: 'M1', index: 1, programId: createdPrograms[2].id }
        ]
    })

    const createdLevels = await prisma.level.findMany()

    // ➤ 4. Créer 10 étudiants répartis
    const sexes = ['MASCULIN', 'FEMININ']

    for (let i = 1; i <= 10; i++) {
        const program = createdPrograms[i % createdPrograms.length]
        const level = createdLevels[i % createdLevels.length]

        await prisma.student.create({
            data: {
                nom: `Nom${i}`,
                prenom: `Prenom${i}`,
                email: `etudiant${i}@test.com`,
                sexe: sexes[i % 2],
                phone: `+22177000000${i}`,
                dateNaissance: new Date(`199${i % 10}-01-01`),
                program: { connect: { id: program.id } },
                level: { connect: { id: level.id } }
            }
        })
    }

    console.log('✅ Seed terminé avec succès')
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())
