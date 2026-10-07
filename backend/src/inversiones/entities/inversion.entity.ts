import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('inversiones')
export class Inversion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  monto: number;

  @Column()
  tipo: string;

  @ManyToOne(() => User, (user) => user.inversiones)
  user: User;
}
