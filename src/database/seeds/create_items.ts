import {Knex} from "knex";


export async function seed(knex: Knex) {
    await knex('items').insert([
        { titulo: "Produto 01", imagem: "01.png" },
        { titulo: "Produto 02", imagem: "02.png" },
        { titulo: "Produto 03", imagem: "03.png" },
        { titulo: "Produto 04", imagem: "04.png" },
        ]
    );
}