import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { User } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common/dto';


@Injectable()
export class UsersService {

  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ){}

  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...userData } = createUserDto;
      const hashedPassword = bcrypt.hashSync( password, 10 );

      const user = this.userRepository.create({
        ...userData,
        password: hashedPassword
      });

      await this.userRepository.save( user )

      return user

    } catch ( error ) {
      this.handleDbExceptions( error );
    }

  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit=10, offset=0 } = paginationDto

    const users = await this.userRepository.find({
      take: limit,
      skip: offset
    });

    console.log( users )

    return users;
  }

  async findOne( id: string ) {
    const user = await this.userRepository.findOneBy({ id })

    if ( !user ) throw new NotFoundException(`User with id ${ id } not found.`);

    return user;

  }

  async update( id: string, updateUserDto: UpdateUserDto ) {
    let userUdpate: UpdateUserDto;
    let { password, ...toUpdate } = updateUserDto;

    if ( password ) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userUdpate = { ...toUpdate, password: hashedPassword };
    } else {
      userUdpate = { ...toUpdate }
    }

    const user = await this.userRepository.preload({
      id,
      ...userUdpate,
    });

    try {
      await this.userRepository.save(user);

      delete user.password;
      return user;
    } catch (error) {
      this.handleDbExceptions(error);
    }

  }

  async remove( id: string ) {
    const user = await this.findOne( id );
    await this.userRepository.remove( user );
  }

  async changeStatus( id: string ) {
    let user = await this.findOne( id );

    user.isActive = !user.isActive;

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDbExceptions(error);
    }
    
  }

  private handleDbExceptions( error: any ): never {
    if( error.code === '23505' )
      throw new BadRequestException( error.detail );

    throw new InternalServerErrorException('Server Error');
  }
}
