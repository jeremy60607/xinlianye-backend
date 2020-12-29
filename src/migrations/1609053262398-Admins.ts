import { MigrationInterface, QueryRunner, Table } from 'typeorm';
const table = 'admins';

export class Admins1609053262398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:table,
            columns: [
                {name: 'id', type: 'int', unsigned: true, isPrimary: true, isGenerated: true, generationStrategy: 'increment'},

                {name: 'name', type: 'varchar', length: '100',isNullable: false},

                {name: 'status', type: 'tinyint', unsigned: true, isNullable: false},

                {name: 'role', type: 'tinyint', unsigned: true, isNullable: false},

                {name: 'account', type: 'varchar', length: '100', isNullable: false},

                {name: 'password', type: 'varchar', length: '300',isNullable: false},

                {name: 'updated_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'},

                {name: 'created_at', type: 'datetime', isNullable: false, default: 'CURRENT_TIMESTAMP'},

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(table);
    }

}
