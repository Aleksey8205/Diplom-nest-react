import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BooksEntity } from './books.entity';

@Entity()
export class LibraryEntity {
    @PrimaryGeneratedColumn('increment') // или uuid
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => BooksEntity, book => book.library)
    books: BooksEntity[];
}