import {Knex} from "knex";


export async function seed(knex: Knex) {
    await knex('items').insert([
        { titulo: "Papeis e papelao", imagem: "papel_png" },
        { titulo: "Vidros e lampdas", imagem: "vidros_png" },
        { titulo: "Oleo de cozinha", imagem: "oleo_png" },
        { titulo: "Baterias e pilhas", imagem: "bateria_png" },
        ]
    );
}