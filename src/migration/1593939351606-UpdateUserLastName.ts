import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateUserLastName1593939351606 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('user', new TableColumn({
      name: 'last_name',
      type: 'varchar',
      length: '80'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'last_name')
  }

}
