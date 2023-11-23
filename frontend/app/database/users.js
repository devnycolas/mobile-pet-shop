import db from './database'

db.transaction(tx =>{

    // // TESTING
    // tx.executeSql(
    //     "DROP TABLE tb_users;"
    // )

    // TESTING
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tb_users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email TEXT NOT NULL, senha TEXT NOT NULL);"
    )
})

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = (obj) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            "INSERT INTO tb_users (email, senha) values (?, ?);",
            [obj.email, obj.senha],
            //-----------------------
            (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) resolve(insertId);
            else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
            },
            (_, error) => reject(error) // erro interno em tx.executeSql
        );
        });
    });
};

/**
 * REMOVE UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const remove = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "DELETE FROM tb_users WHERE id=?;",
          [id],
          //-----------------------
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
};

/**
 * BUSCA UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o objeto (caso exista);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const find = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            "SELECT * FROM tb_users WHERE id=?;",
            [id],
            //-----------------------
            (_, { rows }) => {
            if (rows.length > 0) resolve(rows._array[0]);
            else reject("Obj not found: id=" + id); // nenhum registro encontrado
            },
            (_, error) => reject(error) // erro interno em tx.executeSql
        );
        });
    });
};

/**
 * BUSCA UM REGISTRO POR MEIO DO EMAIL E SENHA
 * - Recebe um usuário;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findLogin = (obj) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            "SELECT * FROM tb_users WHERE email = ? AND senha = ?;",
            [obj.email, obj.senha],
          //-----------------------
          (_, { rows }) => {
            if (rows.length > 0) resolve(rows._array);
            else reject("Usuário não encontrado"); // nenhum registro encontrado
          },
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
};

/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
const all = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "SELECT * FROM tb_users;",
          [],
          //-----------------------
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error) // erro interno em tx.executeSql
        );
      });
    });
};



export default {
    create,
    remove,
    find,
    all,
    findLogin,
  };