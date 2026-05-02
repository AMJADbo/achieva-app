import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Achievement } from "../../achievements/entities/achievement.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 30 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, select: false })
  passwordHash: string | null;

  @Column({ length: 50 })
  displayName: string;

  @Column({ nullable: true })
  avatarUrl: string | null;

  @Column({ type: "text", nullable: true })
  bio: string | null;

  @Column({ default: 0 })
  tokens: number;

  @Column({ default: false })
  kycVerified: boolean;

  @OneToMany(() => Achievement, (achievement) => achievement.author)
  achievements: Achievement[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
