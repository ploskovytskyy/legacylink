import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  wallet: varchar("wallet", { length: 256 }).notNull(),
});

export type User = typeof users.$inferSelect;
