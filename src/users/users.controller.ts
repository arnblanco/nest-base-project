import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { PaginationDto } from '../common/dto';
import { CreateUserDto, UpdateUserDto } from './dto';

import { UsersService } from './users.service';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create( createUserDto );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne( id );
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update( id, updateUserDto );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove( id );
  }

  @Post(':id/status')
  userStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.changeStatus( id );
  }

}
