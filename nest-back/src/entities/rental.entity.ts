import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BooksEntity } from './books.entity';

@Entity()
export class BookRentalEntity {
  @PrimaryGeneratedColumn('increment')  
  id: number;

  @Column()
  userId: number;

  @Column()
  libraryId: number;

  @Column()
  bookId: number;

  @Column()
  dateStart: Date;

  @Column()
  dateEnd: Date;

  @Column({ default: 'reserved' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.rentals)
  user: UserEntity;

  @ManyToOne(() => BooksEntity, (book) => book.rentals)
  book: BooksEntity;
}
