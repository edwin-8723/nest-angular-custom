import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Inversion } from '../../inversiones/entities/inversion.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @OneToMany(() => Inversion, (inversion) => inversion.user)
  inversiones: Inversion[];
}
