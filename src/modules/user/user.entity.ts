import { EntitySchema, Column, Entity, PrimaryGeneratedColumn, Timestamp , CreateDateColumn , UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'user' })
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @Column()
  public email: string;
}

export default User;