import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ConstructionSiteService } from '../construction-site/construction-site.service';
import { UpdateAtService } from './update-at.service';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { UpdateAtDTO } from '../../common/dto/update-at/update-at.dto';

@Controller('v1/update-at')
export class UpdateAtController {
  constructor(private readonly updateAtService: UpdateAtService) {}

  @UseGuards(AuthGuard('user-auth'))
  @Get()
  async getNewestUpdateAt() {
    const updateAt = await this.updateAtService.findOneBy();
    return updateAt ? plainToClass(UpdateAtDTO, { date: updateAt.date }) : null;
  }

  @UseGuards(AuthGuard('user-auth'))
  @Put()
  async updateNewestUpdateAt(@Body('date') date: Date) {
    await this.updateAtService.updateUpdateAt(date);
  }
}
