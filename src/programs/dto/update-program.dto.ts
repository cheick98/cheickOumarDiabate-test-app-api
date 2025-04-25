import { IsOptional, IsString } from 'class-validator'

export class UpdateProgramDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    sigle?: string

    @IsOptional()
    @IsString()
    description?: string
}
