import 'reflect-metadata'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateQuests1593871910041 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'quest',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('quest')
  }
}
