import { useNavigate } from "@remix-run/react";
import { useState } from "react";

export default function AddNewBook ()  {
    const navigate = useNavigate();
    const [selInstock, setSelInstock] = useState('In-stock');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        
        try{
            //Call Service API
            const resp = await fetch('http://localhost:3000/insertBook',
                {
                    method: 'POST',
                    headers:{
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(formJson)
                }
            );

            if(resp.ok){
                const data = await resp.json();
                alert('การ Submitted ฟอร์มสำเร็จ...');
                navigate('/books/bookLists');
            }else{
                alert('การ Submitted ฟอร์มเกิดข้อผิดพลาด...');
            }
        } catch (error) {
            alert('เกิดข้อผิดพลาดขึ้นระหว่างการ Submit ฟอร์ม...');
        }
    } // End handleSubmit

    return (
        <div className="m-3">
            <form method="POST" onSubmit={handleSubmit}>
                <h1>เพิ่มหนังสือใหม่</h1>
                <label className="m-2">ชื่อหนังสือ</label><br />
                <input type="text" name="bookTile" id="bookTile" required /><br />
                <label className="m-2">รายละเอียด</label><br />
                <textarea rows={3} name="bookDesc" id="bookDesc" /><br />
                <label className="m-2">ผู้แต่ง</label><br />
                <input type="text" name="BookAuthor" id="bookAuthor" required /><br />
                <label className="m-2">หมวดหมู่</label><br />
                <div className="mt-2">
                    <select id="bookCategory" name="bookCategory" required>
                        <option value={10}>เทคโนโลยี</option>
                        <option value={20}>ปรัญชา</option>
                    </select>
                </div><br />
                <label className="m-2">สถานะคลังสินค้า</label><br />
                <div className="p-1">
                    <input name="bookStock" type="radio" value="Out-of-stock"
                    defaultChecked={selInstock === 'Out-of-stock'} />
                    <label className="ps-2">In-stock</label>
                    <input name="bookStock" type="radio" value="Out-of-stock"
                    defaultChecked={selInstock === 'Out-of-stock'} />
                    <label className="ps-2">Out-of-stock</label>
                </div><br />
                <div>
                    <button type="submit" className="m-1 p-2 bg-blue-200">เพิ่มข้อมูล</button>
                    <button type="reset" className="m-1 p-2 bg-gray-200">เครียร์</button>
                </div>
            </form>
        </div>
    );
}