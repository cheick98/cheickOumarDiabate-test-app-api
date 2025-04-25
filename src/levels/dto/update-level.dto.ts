import { IsInt, IsOptional, IsString } from 'class-validator'

export class UpdateLevelDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    sigle?: string

    @IsOptional()
    @IsInt()
    index?: number

    @IsOptional()
    @IsInt()
    programId?: number
}
