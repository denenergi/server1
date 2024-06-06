import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Category } from "../../category/entities/category.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({ name: "transaction_id" })
    id: number

    @Column()
    title: string

    @Column({nullable: true})
    type: string

    @Column()
    amount: number

    @ManyToOne(() => User, (user) => user.transaction)
    @JoinColumn({name: "user_id"})
    user: User

    @ManyToOne(() => Category, (category) => category.transaction, {onDelete: 'SET NULL'})
    @JoinColumn({name: "category_id"})
    category: Category

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
