
// Requiring the module
const reader = require('xlsx')
const mysql = require('mysql2/promise');
  
config = {
    db: {
        host: "localhost",
        user: "martin",
        password: "martin123",
        database: "test"
    },
    codePrefix: "PROD",
    codeStartValue: 1000
}


async function main(){

    var connection = await mysql.createConnection(config.db);
    
    // read input file
    const file = reader.readFile('./input.xlsx')
    const rows = reader.utils.sheet_to_json(file.Sheets['Sheet1'])
    
    let codeSuffix = config.codeStartValue

    for( let i = 0; i < rows.length; i++){
    
        try {
    
            console.log("row: " + i)

            // parse row
            let itemCode = rows[i]['item_code'];
            let title = rows[i]['title'];
            let productType = rows[i]['product_type'];
            let actualStock = rows[i]['actual_stock'];
            let searchName = rows[i]['search_name'];
    
            // generate code
            let autogenerateCode = config.codePrefix + codeSuffix.toString();
            codeSuffix++;

            // insert into product
            let sql = `INSERT INTO test.product(autogenerate_code, item_code, title, product_type, actual_stock, search_name) VALUES(?, ?, ?, ?, ?, ?)`;
    
            let productId;
            // execute the insert statment
            const [ result ] = await connection.query(sql, [ autogenerateCode, itemCode, title, productType, actualStock, searchName ]);

            productId = result.insertId;

            // insert into inventory
            sql = `INSERT INTO test.inventory(product_id, item_code, title, product_type, actual_stock, search_name ) VALUES(?, ?, ?, ?, ?, ?)`;
    
            // execute the insert statment
            await connection.query(sql, [ productId, itemCode, title, productType, actualStock, searchName ]);
    
        } catch(error) {
            console.log(error);
        }
    }
    
    connection.end();

}

main();

