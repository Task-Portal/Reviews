import {Entity, PrimaryGeneratedColumn, Column, OneToOne,} from "typeorm";
import {User} from "./User";



@Entity({ name: "UserStatus" })
export class UserStatus {
  @PrimaryGeneratedColumn({ name: "Id", type: "int" })
  id: string;


  @Column("varchar", {
    name: "statusName",
    length: 60,
    nullable: false,
    unique: true,
    default:"user"
  })
  userStatusName: string;

  @OneToOne(() => User, user => user.status)
  user: User;





}
