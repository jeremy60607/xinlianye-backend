import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UpdateAtService } from '../../app/update-at/update-at.service';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { UpdateAtDTO } from '../../common/dto/update-at/update-at.dto';
import { Admin } from 'typeorm';
import { AdminUpdateAtService } from './admin-update-at.service';

@Controller('v1/admin/update-at')
export class AdminUpdateAtController {
  constructor(private readonly adminUpdateAtService: AdminUpdateAtService) {}

  @UseGuards(AuthGuard('admin-auth'))
  @Get()
  async getNewestUpdateAt() {
    const updateAt = await this.adminUpdateAtService.findOneBy();
    return updateAt ? plainToClass(UpdateAtDTO, { date: updateAt.date }) : null;
  }

  @UseGuards(AuthGuard('admin-auth'))
  @Put()
  async updateNewestUpdateAt(@Body('date') date: Date) {
    await this.adminUpdateAtService.updateUpdateAt(date);
  }
}
