## StreetFlow

Program ini merupakan projek E-Commerce StreetFlow yang terdiri dari dua direktori yaitu:

- Backend : https://github.com/K1StreetFlow/streetflow_be
- Frontend : https://github.com/K1StreetFlow/streetflow_fe

## Persyaratan

Untuk dapat menjalankan aplikasi, pastikan telah memenuhi persyaratan berikut:

- Node.js
- PostgreSQL
- Browser
- Postman (optional)

## Instalasi

1. Clone kedua repositori ini ke komputer:

   ```bash
   Frontend : git clone https://github.com/K1StreetFlow/streetflow_fe.git

   Backend : git clone https://github.com/K1StreetFlow/streetflow_be.git

2. Buka ke setiap direktori Frontend dan Backend

3. Install package module dari kedua direktori 

   ```bash
   npm install
   
4. Buatlah file baru dengan nama `.env` kemudian atur dan sesuaikan dengan program dan database anda

5. Proses selesai


## Demo Program
1. Pastikan semua program sudah benar dan terhubung ke database, kemudian jalankan kedua direktori program dengan terminal menggunakan command berikut : 

   ```bash
   npm run dev

2. Untuk dapat mengakses tampilan dari dari Dashboard dan User Customer dapat memasukan url berikut kedalam browser: 

   ```bash
   User Customer: http://localhost:3000/auth/user/login

   Dashboard : http://localhost:3000/auth/admin/login
