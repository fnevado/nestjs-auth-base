import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @ManyToMany(() => Role)
    @JoinTable({
        name: 'user_role'
    })
    roles: Role[];

}