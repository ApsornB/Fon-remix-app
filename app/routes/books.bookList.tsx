import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";

export default function BookLists() {
    const navigate = useNavigate();
    const [relStatus, setRelStatus] = useState(true);
    const [bookData, setBookData] = useState([]);
    const prevDataRef = useRef();

    interface Book {
        bookId: string;
        bookTitle: string;
        bookDesc: string;
        bookAuthor: string;
        bookCategory: string;
        bookStock: string;
    }

    useEffect(() => {
        if(relStatus) {
            try {
                const fetchData = async () => {
                    const resp = await fetch('http://localhost:3000/getBooks');
                    if(resp.ok) {
                        const BookJson = await resp.json();
                        if(prevDataRef.current && JSON.stringify(prevDataRef.current) !== JSON.stringify(BookJson)) {
                            console.log('Data has been updated!');
                        }
                        setBookData(BookJson);
                        prevDataRef.current = BookJson;
                    } else {
                        alert('เกิดข้อผิดพลาดในการโหลดข้อมูล...');
                    }
                };
                fetchData();
            } catch (error) {
                alert('เกิดข้อผิดพลาดขึ้นในระหว่างทำการดำเนินการโหลดข้อมูล...');
            }
            setRelStatus(false);
        }
    }, [relStatus]);

    const handleDelete = (bookId: string) => {
        if(confirm(`ยืนยันการลบหนังสือรหัส --> ${bookId}?`)) {
            try {
                const delData = async () => {
                    const data = await fetch(`http://localhost:3000/deleteBook/${bookId}`, { method: 'DELETE' });
                    if(data.ok) {
                        const json = await data.json();
                        alert(json.message);
                        setRelStatus(true);
                    } else {
                        alert('เกิดข้อผิดพลาดในการลบข้อมูล...');
                    }
                }
                delData();
            } catch (error) {
                console.error('Error:', error);
                alert('เกิดข้อผิดพลาดในระหว่างการลบข้อมูล...');
            }
        }
    }

    return (
        <div className="m-3">
            <div>
                <h1 className="text-xl">ข้อมูลหนังสือในร้าน</h1>
            </div>
            <div>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3">No.</th>
                            <th scope="col" className="px-6 py-3">ชื่อเรื่อง</th>
                            <th scope="col" className="px-6 py-3">ผู้เขียน</th>
                            <th scope="col" className="px-6 py-3">หมวดหมู่</th>
                            <th scope="col" className="px-6 py-3">สถานะคลังสินค้า</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center px-6 py-4">--ไม่มีหนังสือในร้าน--</td>
                            </tr>
                        ) : (
                            bookData.map((item, index) => (
                                <tr key={index}>
                                    <td scope="row">{index + 1}</td>
                                    <td className="px-6 py-4">{item.bookTitle}</td>
                                    <td className="px-6 py-4">{item.bookAuthor}</td>
                                    <td className="px-6 py-4">{item.bookCategory}</td>
                                    <td className="px-6 py-4">{item.bookStock}</td>
                                    <td className="px-6 py-4 text-right">
                                        <a href={`/books/bookDetail/${item.bookId}`} className="m-1 p-2 bg-blue-200">ดูรายละเอียด</a>
                                        <a href={`/books/bookEditForm/${item.bookId}`} className="m-1 p-2 bg-orange-200">แก้ไข</a>
                                        <a href="#" onClick={() => handleDelete(item.bookId)} className="m-1 p-2 bg-red-200">ลบ</a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
