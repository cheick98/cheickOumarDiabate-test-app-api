import {
    IsString,
    IsEmail,
    IsDate,
    IsNotEmpty,
    IsPhoneNumber,
    IsInt,
    IsIn,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateStudentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nom: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    prenom: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty({ example: 'MASCULIN', enum: ['MASCULIN', 'FEMININ'] })
    @IsString()
    @IsIn(['MASCULIN', 'FEMININ'], { message: "Le sexe doit être 'MASCULIN' ou 'FEMININ'" })
    sexe: string

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    dateNaissance: Date

    @ApiProperty()
    @IsPhoneNumber()
    phone: string

    @ApiProperty()
    @IsInt()
    programId: number

    @ApiProperty()
    @IsInt()
    levelId: number
}
