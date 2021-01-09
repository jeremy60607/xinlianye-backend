import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const table = 'construction_types';

export class ConstructionTypes1609165118356 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: table,
        columns: [
          {
            name: 'id',
            type: 'int',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          { name: 'title', type: 'varchar', length: '100', isNullable: false },

          {
            name: 'construction_type_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },

          {
            name: 'percentage',
            type: 'tinyint',
            unsigned: true,
            isNullable: false,
          },

          {
            name: 'is_deleted',
            type: 'boolean',
            isNullable: false,
            default: false,
          },

          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },

          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table);
  }
}
