import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}