import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { LibraryEntity } from './library.entity';
import { UserEntity } from './user.entity';
import { BookRentalEntity } from './rental.entity';

@Entity()
export class BooksEntity {
    @PrimaryGeneratedColumn('increment') // или uuid
    id: number;

    @Column()
    libraryId: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({ nullable: true })
    year: number;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    coverImage: string;

    @Column({ default: true })
    isAvailable: boolean;

    @Column({ default: 1 })
    totalCopies: number;

    @Column({ default: 1 })
    availableCopies: number;

    @ManyToOne(() => LibraryEntity, library => library.books)
    library: LibraryEntity;

    @ManyToOne(() => UserEntity, user => user.reservedBooks)
    reservedBy: UserEntity;

    @OneToMany(() => BookRentalEntity, (rental) => rental.book)
    rentals: BookRentalEntity[];
}