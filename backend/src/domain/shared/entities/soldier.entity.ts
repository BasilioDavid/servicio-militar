import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SoldierDTO } from '../models/DTOs/soldier.dto';

@Entity('Soldier')
export class SoldierEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  surname: string;

  @Column({ type: 'varchar', length: 50 })
  atGraduation: string;

  static fromDTO({ id, name, surname, atGraduation }: SoldierDTO) {
    const soldier = new SoldierEntity();
    soldier.id = id;
    soldier.name = name;
    soldier.surname = surname;
    soldier.atGraduation = atGraduation;
    return soldier;
  }
}
