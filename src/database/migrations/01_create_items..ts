import { Knex } from 'knex';


export async function up(knex: Knex) {
    return knex.schema
        .createTable('items', table =>{
            table.increments('id').primary(),
            table.string('titulo').notNullable(),
            table.string('imagem').notNullable()
        }); 
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}