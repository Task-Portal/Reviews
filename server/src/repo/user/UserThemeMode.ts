import {Entity, PrimaryGeneratedColumn, Column,  OneToMany,} from "typeorm";
import {User} from "./User";



@Entity({ name: "UserThemeMode" })
export class UserThemeMode {
  @PrimaryGeneratedColumn({ name: "Id", type: "int" })
  id: string;


  @Column("varchar", {
    name: "Name",
    length: 30,
    nullable: false,
    unique: true,
    default:"light"
  })
  name: string;

  @OneToMany(() => User, user => user.mode)
  user: User;



}
