import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class SupportRequest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.supportRequest)
  messages?: Message[];

  @Column({ nullable: true })
  isActive?: boolean;
}