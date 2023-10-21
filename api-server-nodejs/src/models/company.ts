import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export default class Company {
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({type : 'varchar'})
  name!: string;

  @Column({ type: 'decimal' })
  type!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: string;
}