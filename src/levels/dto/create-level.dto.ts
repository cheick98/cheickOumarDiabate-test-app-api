import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateLevelDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    sigle: string

    @IsNotEmpty()
    @IsInt()
    index: number

    @IsNotEmpty()
    @IsInt()
    programId: number
}
