import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimarySnowflakeColumn,
  RelationId,
  UpdateDateColumn,
} from "@nest-boot/database";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Clip } from "./clip.entity";

@ObjectType()
@Entity({ searchable: true })
export class Result {
  @Field(() => ID)
  @PrimarySnowflakeColumn()
  id: string;

  @Field(() => [String])
  @Column({ type: "json", generator: () => [] })
  fields: string[];

  @Field(() => [[String]])
  @Column({ type: "json", generator: () => [] })
  values: (string | number | boolean | Date)[][];

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  error?: string;

  @Field(() => Int)
  @Column({ type: "int" })
  duration: number;

  @Field({ nullable: true })
  @Column({ type: "timestamp", precision: 3, nullable: true })
  startedAt: Date;

  @Field({ nullable: true })
  @Column({ type: "timestamp", precision: 3, nullable: true })
  finishedAt: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Clip, (clip) => clip.results, {
    cascade: true,
  })
  clip: Clip;

  @RelationId((result: Result) => result.clip)
  clipId: Clip["id"];
}
