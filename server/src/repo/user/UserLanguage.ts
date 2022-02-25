import {Entity, PrimaryGeneratedColumn, Column,  OneToMany,} from "typeorm";
import {User} from "./User";



@Entity({ name: "UserLanguage" })
export class UserLanguage {
  @PrimaryGeneratedColumn({ name: "Id", type: "int" })
  id: string;

  @Column("varchar", {
    name: "Language",
    length: 10,
    nullable: false,
    unique: true,
    default:"en"
  })
  userLanguage: string;

  @OneToMany(() => User, user => user.language)
  user: User;



}
