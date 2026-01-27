import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SupportRequest } from './supportRequest.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  author: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sentAt: Date;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'timestamp', nullable: true })
  readAt?: Date;

  @ManyToOne(() => SupportRequest, (supportRequest) => supportRequest.messages)
  supportRequest: SupportRequest;
}