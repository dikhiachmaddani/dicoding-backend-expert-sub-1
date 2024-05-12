/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('replies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    threadId: {
      type: 'VARCHAR(50)',
      references: '"threads"',
      notNull: true,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    commentId: {
      type: 'VARCHAR(50)',
      references: '"comments"',
      notNull: true,
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    userId: {
      type: 'VARCHAR(50)',
      references: '"users"',
      notNull: true,
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    isDelete: {
      type: 'timestamp',
      notNull: false,
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

exports.down = (pgm) => {
  pgm.dropTable('replies');
};
