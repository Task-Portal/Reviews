import {Entity, PrimaryGeneratedColumn, Column, OneToOne,} from "typeorm";
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

  @OneToOne(() => User, user => user.mode)
  user: User;



}
