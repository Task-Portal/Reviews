import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "SearchWords" })
export class SearchWords extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @Column("varchar", {
    name: "Phrase",
    length: 30,
    nullable: false,
    unique: true,
  })
  phrase: string;
}
