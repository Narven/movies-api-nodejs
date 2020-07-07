import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class UpdateQuest1593950478040 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('quest', [
      new TableColumn({
        name: 'title',
        type: 'varchar',
        length: '80',
        isNullable: false
      }),
      new TableColumn({
        name: 'description',
        type: 'text',
        isNullable: true
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('quest', 'title')
    await queryRunner.dropColumn('quest', 'description')
  }

}
