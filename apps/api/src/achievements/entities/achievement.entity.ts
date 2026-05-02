import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

export enum AchievementCategory {
  SPORT = "sport",
  EDUCATION = "education",
  TRAVEL = "travel",
  CAREER = "career",
  ART = "art",
  OTHER = "other",
}

@Entity("achievements")
export class Achievement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.achievements, { onDelete: "CASCADE" })
  author: User;

  @Column()
  authorId: string;

  @Column({ length: 120 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "enum", enum: AchievementCategory, default: AchievementCategory.OTHER })
  category: AchievementCategory;

  @Column("simple-array", { default: "" })
  mediaUrls: string[];

  @Column({ default: 0 })
  tokensEarned: number;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  commentsCount: number;

  @CreateDateColumn()
  createdAt: Date;
}
