import {Entity, PrimaryGeneratedColumn, Column, OneToOne,} from "typeorm";
import {User} from "./User";



@Entity({ name: "UserStatus" })
export class UserStatus {
  @PrimaryGeneratedColumn({ name: "Id", type: "int" })
  id: string;


  @Column("varchar", {
    name: "StatusName",
    length: 60,
    nullable: false,
    unique: true,
    default:"user"
  })
  status: string;

  @OneToOne(() => User, user => user.status)
  user: User;





}
