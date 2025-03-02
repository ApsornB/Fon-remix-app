import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import bodyParser from "body-parser";
import fs from "fs";

// อ่านไฟล์ serviceAccount.json
const serviceAccount = JSON.parse(fs.readFileSync("./firebase/firebase-config.json", "utf8"));

initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json());
// Object array
const myOrder = [
{
    "orderId": "ORD001",
    "orderDate": "31/01/2025 12:40:00",
    "orderTotal": 1890,
    "orderStatus": 10,
    "orderBy": "Apsorn Bhromma"
},
{
    "orderId": "ORD002",
    "orderDate": "31/01/2025 13:50:00",
    "orderTotal": 1990,
    "orderStatus": 20,
    "orderBy": "Phanphaka Kaewkam"
},
{
    "orderId": "ORD003",
    "orderDate": "31/01/2025 14:35:00",
    "orderTotal": 1450,
    "orderStatus": 20,
    "orderBy": "Jhon Jostar"
},
];

//http://localhost:3000/api/deleteBook/xxx
app.delete(`/api/deleteBook/:bookId`,(req, res) => {
const { bookId } = req.params;
deleteBook(bookId);
res.status(200).json({ message: 'การลบหนังสือสำเร็จ...'});
});

async function deleteBook(bookId) {
const docRef = db.collection('Books').doc(bookId);
//const docRef = db.collection('Books').where('bookId', == bookId).doc();
await docRef.delete();
}

//http://localhost:3000/api/xxx
app.get('/api/getOneBook/:bookId', (req, res) => {
  const { bookId } = req.params;
  res.set('Content-Type', 'application/json');
    fetchOneBook(bookId).then((jsonData) => {
    res.status(200).json(jsonData[0]);
  }).catch((error) => {
    res.send(error);
  });
});
 
async function fetchOneBook(bookId) {
   const result = [];
   const booksRef = db.collection('Books').where('bookId','==',bookId).get();
   //const booksRef = db.collection('Books');
   const snapshot = await booksRef.get();
   snapshot.forEach(doc => {
    //if (doc.id === bookId) {
     result.push({
       id: doc.id,
       ...doc.data()
     });
    //}
   });
   return result;
}
 
// Update
async function updateBook(bookId, bookData) {
  const docRef = db.collection('Books').doc(bookId);
  await docRef.update(bookData);
}
//http://localhost:3000/api/updateBook
app.post('/api/updateBook', (req, res) => {
  const { bookId, bookTitle, bookDesc, bookAuthor, bookCategory, bookStock } = req.body;
  updateBook(bookId, { bookTitle, bookDesc, bookAuthor, bookCategory, bookStock });
  res.status(200).json({ message: 'Book updated successfully.' });
})

// Fetch data
//http://localhost:3000/api/getBooks
app.get('/api/getBooks', (req, res) => {
  res.set('Content-type', 'application/json');
  fetchBook().then((jsonData) => {
      res.send(jsonData);
  }).catch((error) => {
      res.send(error);
  });
});

async function fetchBook() {
  const result = [];
  const bookRef = db.collection('Books');
  const bookObj = await bookRef.get();
  bookObj.forEach((doc) => {
      result.push({
          id: doc.id,
          ...doc.data()
      });
  });
  return JSON.stringify(result, null, 2);
}

//Add book
//http://localhost:3000/api/addBook
app.get('/addBook', (req,res) => {
  addBook();
  res.end('Added new book.');
});

async function addBook(){
    const newBookRef = db.collection('Books').doc();
    const bookRef = db.collection('Books').doc(newBookRef.id);
    let bookObj = {
      bookId: newBookRef.id,
      bookTitle: 'Test Title 3',
      bookDesc: 'Test Desc 3',
      bookAuthor: 'Test Author 3',
      bookStock: false
};
await bookRef.set(bookObj);
console.log('Book added...');
}

// Add book
//http://localhost:3000/api/inserBook
app.post('/api/insertBook', (req, res) => {
  addBook();
  res.end('Added new book');
});

//http://localhost:3000/orders/ORD003 :D
app.get('/orders/:ordid', (req, res) => {
  let orderId = req.params.ordid;
  const result = myOrder.filter((objOrd, index) => {
          return objOrd.orderId == orderId
     } 
  )
  res.send(result[0]); // ส่งในรูปแบบ result.xxx -- {},result[0].xx -- [{}]
})

//http://localhost:3000/orders
app.get('/orders', (req, res) => {
  res.send(myOrder);
})

//GET POST, PUT, DELETE
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// htpp://localhost:3000/toDoLists/u100/ORD100
app.get('/toDoLists/:userId/:orderId', (req, res) => {
  let myData = "<h1>My Profile</h1>";
  myData+= "<strong>User ID:</strong>"+req.params.userId+"<br/>";
  myData+= "<strong>User ID:</strong>"+req.params.orderId+"<br/>";
  res.set('Content-type', 'text/html');
  res.send(myData);
})

app.post('/', (req, res) => {
  res.send('Hello World in POST method!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});