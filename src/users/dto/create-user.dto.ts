import { ApiProperty } from "@nestjs/swagger";

import { IsArray, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

import { Roles } from "../enum";


export class CreateUserDto {

    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe',
    })
    @IsString()
    @MinLength(1)
    fullName: string;

    @ApiProperty({
        description: 'User password',
        minimum: 6,
        maximum: 50,
        example: 'MyPassword123',
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have an uppercase letter, a lowercase letter, and a number',
    })
    password: string;

    @ApiProperty({
        description: 'Roles assigned to the user',
        enum: Roles,
        isArray: true,
        example: ['user', 'admin'],
    })
    @IsString({ each: true })
    @IsArray()
    roles: Roles[];

}