# TECH STORE

> Ứng dụng được xây dựng bằng nodeJS viết server và dùng framework ReactJS để xây dựng giao diện

---

### About
Website bán đồ công nghệ sử dụng NodeJs(Backend), ReactJs(Frontend) và các công nghệ khác như JWT authentication,...

### Install

Clone link về và cài đặt trên command line:

```bash
npm install
cd client
npm install
```

### Using

Tạo 1 file .env và tạo cái key để set biến môi trường cho server chạy đúng cách nha không nó bị **undefined** :D

Các biến cần set

```env
MONGODB_URI=...
ACCESS_TOKEN_SECRET =...
...
```

- Các link tham khảo:
  - Link mongoDB: https://www.mongodb.com/


Sau đó thì chạy:

```bash
npm run dev     # Express & React :8000 & :3000
npm run server  # Express API Only :8000
npm run client  # React Client Only :3000
```
