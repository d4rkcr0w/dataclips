import {
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import xlsx from "node-xlsx";
import Papa from "papaparse";

import { ClipService } from "../../core/services/clip.service";
import { AuthGuard } from "../guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("/clips")
export class ClipController {
  constructor(private readonly clipService: ClipService) {}

  @Get(":id(\\d+).json")
  async json(@Param("id") id: string) {
    const clip = await this.clipService.findOneById(id);

    if (!clip) {
      throw new NotFoundException();
    }

    const [result] = await Promise.all([
      this.clipService.fetchResult(clip.id),
      this.clipService.update({ id: clip.id }, { lastViewedAt: new Date() }),
    ]);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Get(":id(\\d+).csv")
  @Header("Content-Type", "text/csv")
  async csv(@Param("id") id: string) {
    const clip = await this.clipService.findOneById(id);

    if (!clip) {
      throw new NotFoundException();
    }

    const [result] = await Promise.all([
      this.clipService.fetchResult(clip.id),
      this.clipService.update({ id: clip.id }, { lastViewedAt: new Date() }),
    ]);

    if (!result) {
      throw new NotFoundException();
    }

    return Papa.unparse({
      fields: result.fields,
      data: result.values,
    });
  }

  @Get(":id(\\d+).xlsx")
  async xlsx(@Res() res: Response, @Param("id") id: string) {
    const clip = await this.clipService.findOneById(id);

    if (!clip) {
      throw new NotFoundException();
    }

    const [result] = await Promise.all([
      this.clipService.fetchResult(clip.id),
      this.clipService.update({ id: clip.id }, { lastViewedAt: new Date() }),
    ]);

    if (!result) {
      throw new NotFoundException();
    }

    res
      .setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
      .send(
        xlsx.build([
          {
            name: "Sheet1",
            data: [result.fields, ...result.values],
            options: {},
          },
        ])
      )
      .end();
  }
}
