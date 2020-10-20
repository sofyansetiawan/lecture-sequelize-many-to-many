# lecture-sequelize-many-to-many
Example for Sequelize using many to many relationship model

## LECTURE SEQUELIZE MANY TO MANY

- Many to Many
  - Entity 1: bisa memiliki/dimiliki banyak item dari Entity 2
  - Entity 2: bisa memiliki/dimiliki banyak item dari Entity 1
  - Entity penghubung: sebagai penghubung dari Entity 1 dan 2 
- More --> https://sequelize.org/v5/ (Pakai dokumentasi v5)

## Ilustrasi

- ### Buyer

  | id   | firstname | email             |
  | ---- | --------- | ----------------- |
  | 1    | sofyan    | sofyan@gmail.com  |
  | 2    | yusuf     | yusuf@gmail.com   |
  | 3    | renhard   | renhard@gmail.com |

  

- ### Product

  | id   | name    | price   | stock |
  | ---- | ------- | ------- | ----- |
  | 1    | laptop  | 5000000 | 200   |
  | 2    | sepeda  | 3000000 | 50    |
  | 3    | shampoo | 20000   | 10    |

  

- ### Order

  | id   | buyer_id | product_id | ammount |
  | ---- | -------- | ---------- | ------- |
  | 1    | 1        | 1          | 3       |
  | 2    | 1        | 3          | 2       |
  | 3    | 3        | 2          | 1       |

  

## DEMO

- Setup Package

  - (Siapkan data JSON untuk seeding)
  - npm init -y
  - npm install pg
  - .gitignore (node_modules)
  - Install Sequelize
    - npm install sequelize
    - npm install sequelize-cli
    - npx sequelize --version (versi di saya)

- Setup project sequelize

  - npx sequelize init

- Setup Database

  - config/config.json
  - Tidak perlu membuat database di Postgre
  - Pakai development (untuk saat belajar yang lain dihapus)
  - Atur nama database yang ingin dibuat dan pakai, username, password, host) dan dialect postgres | port bila menggunakan port lain
  - npx sequelize db:create (membuat database dari config.json)

- Perintah perintah CLI di sequelize : npx sequelize --help

- Setup Model

  - npx sequelize model:generate --name Namamodel --attributes column:type,column:type,column:type
    - Contoh: npx sequelize model:generate --name People --attributes firstname:string,lastname:string,age:integer,address:string,ismale:boolean
    - Kolom id tidak perlu di generate (otomatis oleh sequelize)
  - Mengenerate model dan migration
    - Model berhubungan dengan interaksi user dan database
    - Migration berhubungan bentuk dan struktur database
  - Membuat Model index dan namamodel (poeple.js)
    - File index.js di models jangan diubah
    - Terdapat struktur kolom table

- Setup Migration

  - Kolom createdAt, updatedAt sudah digenerate oleh sequelize
  - Nama migration berdasarkan timestamp dan sesuai nama model
  - Migration ada 2 properti: up dan down adalah langkah dilakukan
    - up: menjalankan perintah DDL table
    - down: undo menjalankan perintah DDL table
  - async await di ganti return (karena kita masih belajar promise)

- Melakukan Migration

  - Ketika mengenerate model, table di database belum terbentuk, yang perlu dijalankan adalah melakukan migrate
  - Migration tidak dijalankan langsung karena ini masih perintah pending (keamanan juga)
  - npx sequelize db:migrate 
    - Menjalankan migrasi yang pending. Menjalankan promise migrate
    - Perintah DDL sudah dijalankan (Tabel sudah terbentuk)
    - Terdapat tambahan id, createdAt dan updatedAt
    - Terdapat tabel SequelizeMeta (menyimpan migrate yang sudah dijalankan)

- Setup Seeding

  - npx sequelize seed:generate --name namaseeding 

    - npx sequelize seed:generate --name seed-people 
    - Nama seeding menggunakan timestamp
    - terdapat up: bulkInsert dan down: bulkDelete

      - bulkInsert ke tablename (recordnya arrayOfObject bisa jadi JSON fs.readFileSync)
      - createdAt dan updatedAt: diisi new Date()

      - bulkDelete diisi tablename
    - proses async diganti return
    - Contoh menggunakan data/people.json

- ***Lakukan yang sama untuk membuat model `Product` dan `Order`***

- Melakukan Seeding

  - npx sequelize db:seed:all
    - Jika ingin single file npx sequelize db:seed --seed namafile
    - Melakukan seeding data ke database

- Buat Many to many seperti yang dijelaskan di lecture

  - Association untuk Product

    ```
    Product.belongsToMany(models.Buyer, {
    	through: models.Order,
    	foreignKey: "product_id"
    });
    ```

  - Association untuk Buyer

    ```
    Buyer.belongsToMany(models.Product, {
    	through: models.Order,
    	foreignKey: "buyer_id"
    });
    ```

  - Association untuk Order (Opsional)

    ```
    Order.belongsTo(models.Buyer, { 
    	foreignKey: "buyer_id",
    	targetKey: "id"
    });
    
    Order.belongsTo(models.Product, { 
    	foreignKey: "product_id",
    	targetKey: "id"
    });
    ```


- Setup Express

  - Buat app.js lalu setup express seperti biasa
  - Import untuk models `const { Buyer, Product, Order} = require("../models")`
  - Test menggunakan app.get("/")

- Test join dengan Eager Loading (include untuk tahu product apa saja dibeli oleh buyer mana atau para buyer membeli product apa saja)

- Add Constrain (Intermezzo)

  ```
  queryInterface.addConstraint('Posts', {
    fields: ['username'],
    type: 'foreign key',
    name: 'custom_fkey_constraint_name',
    references: { //Required field
      table: 'target_table_name',
      field: 'target_column_name'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  });
  ```

  

