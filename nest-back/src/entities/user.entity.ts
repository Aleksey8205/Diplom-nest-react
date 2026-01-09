import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BooksEntity } from './books.entity';
import { BookRentalEntity } from './rental.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')  // или uuid
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  contactPhone?: string;

  @Column({ default: 'client' })
  role: 'client' | 'admin' | 'manager';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BooksEntity, book => book.reservedBy)
  reservedBooks: BooksEntity[];

  @OneToMany(() => BookRentalEntity, rental => rental.user)
  rentals: BookRentalEntity[];
}