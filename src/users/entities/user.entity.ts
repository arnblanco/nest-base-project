import { ApiProperty } from '@nestjs/swagger';

import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Roles } from "../enum";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'Unique identifier for the user (UUID)',
        example: '123e4567-e89b-12d3-a456-426655440000',
    })
    id: string;

    @Column('text', {
        unique: true,
        nullable: false,
    })
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
    })
    email: string;

    @Column('text', {
        select: false,
        nullable: false,
    })
    @ApiProperty({
        description: 'User password (not selected by default)',
        example: 'MySecretPassword123',
    })
    password: string;

    @Column('text')
    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe',
    })
    fullName: string;

    @Column('bool', {
        default: true,
    })
    @ApiProperty({
        description: 'Indicates whether the user account is active',
        example: true,
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: [Roles.USER],
    })
    @ApiProperty({
        description: 'Roles assigned to the user',
        enum: Roles,
        isArray: true,
        example: ['user', 'admin'],
    })
    roles: Roles[];

    @BeforeInsert()
    checkFieldBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldBeforeUpdate() {
        this.email = this.email.toLowerCase().trim();
    }

}
