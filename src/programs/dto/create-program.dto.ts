import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateProgramDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    sigle: string

    @IsOptional()
    @IsString()
    description?: string
}
