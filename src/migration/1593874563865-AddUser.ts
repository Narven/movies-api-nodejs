import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class AddUser1593874563865 implements MigrationInterface {
  readonly tableName = 'user'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isNullable: false,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'first_name',
          type: 'varchar'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }

}
