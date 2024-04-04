// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `hoyolog_${name}`);

export const regionEnum = pgEnum("region", ["NA", "EU", "Asia", "TW, HK, MO"]);

export const users = createTable("users", {
  id: serial("id").primaryKey(),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToGenshinAccounts: many(usersToGenshinAccounts),
}));

// Genshin Part
export const genshinPoolEnum = pgEnum("genshin_pool", [
  "Standard",
  "Limited",
  "Wepaon",
  "Mixed",
]);

export const genshinAccounts = createTable("genshin_account", {
  id: varchar("id", { length: 10 }).primaryKey(),
  region: regionEnum("region"),
});

export const genshinAccountsRelations = relations(
  genshinAccounts,
  ({ many }) => ({
    usersToGenshinAccounts: many(usersToGenshinAccounts),
    genshinPulls: many(genshinPulls),
  }),
);

export const usersToGenshinAccounts = createTable(
  "users_to_genshin_accounts",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    gameId: varchar("game_id", { length: 10 })
      .notNull()
      .references(() => genshinAccounts.id),
  },
  (t) => ({ pk: primaryKey({ columns: [t.userId, t.gameId] }) }),
);

export const usersToGenshinAccountsRelations = relations(
  usersToGenshinAccounts,
  ({ one }) => ({
    account: one(genshinAccounts, {
      fields: [usersToGenshinAccounts.gameId],
      references: [genshinAccounts.id],
    }),
    user: one(users, {
      fields: [usersToGenshinAccounts.userId],
      references: [users.id],
    }),
  }),
);

export const genshinPulls = createTable("genshin_pulls", {
  id: serial("id").primaryKey(),
  count: smallint("count"),
  pool: genshinPoolEnum("pool"),
  gameId: varchar("game_id", { length: 10 }),
  targetId: integer("target_id"),
});

export const genshinPullsRelation = relations(genshinPulls, ({ one }) => ({
  account: one(genshinAccounts, {
    fields: [genshinPulls.gameId],
    references: [genshinAccounts.id],
  }),
  target: one(genshinTargets, {
    fields: [genshinPulls.targetId],
    references: [genshinTargets.id],
  }),
}));

export const genshinTargets = createTable("genshin_targets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  icon: text("icon"),
});

export const genshinTargetsRelation = relations(genshinTargets, ({ many }) => ({
  pulls: many(genshinPulls),
}));

// Honkai Part
export const honkaiPool = pgEnum("honkai_pool", [
  "Standard",
  "Weapon",
  "Limited",
]);

export const honkaiAccounts = createTable("honkai_account", {
  id: varchar("id", { length: 9 }).primaryKey(),
  region: regionEnum("region"),
});

export const honkaiAccountsRelations = relations(
  honkaiAccounts,
  ({ many }) => ({
    usersToHonkaiAccounts: many(usersToHonkaiAccounts),
    pulls: many(honkaiPulls),
  }),
);

export const usersToHonkaiAccounts = createTable(
  "users_to_honkai_accounts",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    gameId: varchar("game_id", { length: 9 })
      .notNull()
      .references(() => honkaiAccounts.id),
  },
  (t) => ({ pk: primaryKey({ columns: [t.userId, t.gameId] }) }),
);

export const usersToHonkaiAccountsRelations = relations(
  usersToHonkaiAccounts,
  ({ one }) => ({
    honkaiAccount: one(honkaiAccounts, {
      fields: [usersToHonkaiAccounts.gameId],
      references: [honkaiAccounts.id],
    }),
    user: one(users, {
      fields: [usersToHonkaiAccounts.userId],
      references: [users.id],
    }),
  }),
);

export const honkaiPulls = createTable("honkai_pulls", {
  id: serial("id").primaryKey(),
  count: smallint("count"),
  pool: genshinPoolEnum("pool"),
  gameId: varchar("game_id", { length: 9 }),
  targetId: integer("target_id"),
});

export const honkaiPullsRelation = relations(honkaiPulls, ({ one }) => ({
  account: one(honkaiAccounts, {
    fields: [honkaiPulls.gameId],
    references: [honkaiAccounts.id],
  }),
  target: one(honkaiTargets, {
    fields: [honkaiPulls.targetId],
    references: [honkaiTargets.id],
  }),
}));

export const honkaiTargets = createTable("honkai_targets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  icon: text("icon"),
});

export const honkaiTargetsRelation = relations(honkaiTargets, ({ many }) => ({
  pulls: many(honkaiPulls),
}));
