import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BooksEntity {
    @PrimaryGeneratedColumn('increment')
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
}