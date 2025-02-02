import express from 'express';
import cors from 'cors';

const app = express()
const port = 3000

app.use(cors());

// Object arry
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
    // เพิ่มรายการใหม่ ORD004
    {
        "orderId": "ORD004",
        "orderDate": "01/02/2025 10:00:00",
        "orderTotal": 1750,
        "orderStatus": 30,
        "orderBy": "Somsak Chaisri"
    },
    // เพิ่มรายการใหม่ ORD005
    {
        "orderId": "ORD005",
        "orderDate": "01/02/2025 11:15:00",
        "orderTotal": 2200,
        "orderStatus": 10,
        "orderBy": "Waranya Wong"
    },
    // เพิ่มรายการใหม่ ORD006
    {
        "orderId": "ORD006",
        "orderDate": "01/02/2025 12:30:00",
        "orderTotal": 1900,
        "orderStatus": 20,
        "orderBy": "Anucha Namsai"
    }
];


//http://localhost:3000/orders/ORD003
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
    console.log(`Example app listening on port ${port}`)
})