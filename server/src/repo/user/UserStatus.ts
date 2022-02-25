import {Entity, PrimaryGeneratedColumn, Column,  OneToMany,} from "typeorm";
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

  @OneToMany(() => User, user => user.status)
  user: User;





}
