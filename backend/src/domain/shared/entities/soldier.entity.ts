import {Column, Entity, PrimaryColumn} from "typeorm";
import {SoldierDTO} from "../models/DTOs/soldier.dto";

@Entity('Soldier')
export class SoldierEntity {
    @PrimaryColumn()
    id: string;

    @Column({type: "varchar", length: 50})
    name: string;

    @Column({type: "varchar", length: 50})
    surname: string;

    @Column({type: "varchar", length: 50})
    atGraduation: string;

    fromDTO({id, name, surname, atGraduation}: SoldierDTO) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.atGraduation = atGraduation;
    }
}
