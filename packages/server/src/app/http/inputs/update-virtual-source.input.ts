import { Field, InputType } from "@nestjs/graphql";

import { UpdateVirtualSourceTableInput } from "./update-virtual-source-table.input";

@InputType()
export class UpdateVirtualSourceInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => [UpdateVirtualSourceTableInput])
  tables: UpdateVirtualSourceTableInput[];
}
