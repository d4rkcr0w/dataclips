import { QueryConnectionArgs } from "@nest-boot/graphql";
import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { plainToInstance } from "class-transformer";

import { SourceType } from "../../core/enums/source-type.enum";
import { SourceService } from "../../core/services/source.service";
import { AuthGuard } from "../guards/auth.guard";
import { DatabaseSource } from "../objects/database-source.object";
import { SourceObject } from "../objects/source.object";
import { SourceConnection } from "../objects/source-connection.object";
import { VirtualSource } from "../objects/virtual-source.object";

@UseGuards(AuthGuard)
@Resolver(() => SourceObject)
export class SourceResolver {
  constructor(private readonly sourceService: SourceService) {}

  @Query(() => SourceObject)
  async source(
    @Args("id", { type: () => ID }) id: string
  ): Promise<DatabaseSource | VirtualSource> {
    const source = await this.sourceService.findOne({ where: { id } });

    return source.type === SourceType.VIRTUAL
      ? plainToInstance(VirtualSource, source)
      : plainToInstance(DatabaseSource, source);
  }

  @Query(() => SourceConnection)
  async sources(@Args() args: QueryConnectionArgs): Promise<SourceConnection> {
    const connection = await this.sourceService.getConnection(args);

    connection.edges = connection.edges.map((edge) => {
      const node: any =
        edge.node.type === SourceType.VIRTUAL
          ? plainToInstance(VirtualSource, edge.node)
          : plainToInstance(DatabaseSource, edge.node);

      return { ...edge, node };
    });

    return connection;
  }

  @Mutation(() => ID)
  async deleteSource(
    @Args("id", { type: () => ID }) id: string
  ): Promise<string> {
    await this.sourceService.delete({ id });
    return id;
  }
}
