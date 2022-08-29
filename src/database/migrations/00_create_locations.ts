import { Knex } from 'knex';


export async function up(knex: Knex) {
    return knex.schema
        .createTable('locations', table =>{
            table.increments('id').primary,
            table.string('nome').notNullable,
            table.string('imagem').notNullable,
            table.string('email').notNullable,
            table.string('cidade').notNullable,
            table.string('uf').notNullable,
            table.decimal('latitude').notNullable,
            table.decimal('longitude').notNullable
        }); 
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('locations');
}