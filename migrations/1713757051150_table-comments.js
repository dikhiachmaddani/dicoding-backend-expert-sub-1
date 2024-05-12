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
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    threadId: {
      type: 'VARCHAR(50)',
      references: '"threads"',
      notNull: true,
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    userId: {
      type: 'VARCHAR(50)',
      references: '"users"',
      notNull: true,
      onDelete: 'cascade',
      onUpdate: 'cascade',
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
  pgm.dropTable('comments');
};
