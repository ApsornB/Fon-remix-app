function MyBolgs(){
    var title = "มหาลัย";
    var description = "ร่มรื่น";
    var  rating = 3;
    let enabled = true;
    const pi = 2.14;
 
    //alert("Title: "+title);
    console.log("Rating: "+rating);
 // arrow function
    const getRating = ()=> {
            return <span>&#11088;&#11088;&#11088;&#11088;&#11088;</span>
    }
    const getRating2 = (r) => {
     let msg = "";
     for(let i=0; i<r; i++) {
         msg+= '\u2b50';
     }
     
        return <span>{msg}</span>;
 
 }
 
    return (
     <div className="m-3">
         <h1 className="text-lg font-bold">รีวิว สถานที่ท่องเที่ยว</h1>
         <p><strong>หัวข้อ:</strong> {title}</p>    
         <p><strong>รายระเอียด:</strong> {description}</p>
         <p><strong>ชื่นชอบ:</strong> {getRating2(rating)}</p>
         <p><strong>อื่นๆ </strong>:สวัสดีค่ะ</p><br />
         <h1 className="text-lg font-bold">Comments:</h1>
         <Comment
           avatar="/public/caitlyn.jpg"
           message="สวัสดีนักท่องเที่ยวทุกคน"
           author="apsorn"
           top={true}
         />
         <Comment
           avatar="/public/caitlyn.jpg"
           message="สวัสดีนักท่องเที่ยวทุกคน"
           author="apsorn"
           top={false}
         />
     </div>
    );
 }
             // {avatar,message,author} :
            // {avatar : any,message : any, author : any})
             function Comment({avatar,message,author,top}) {
              return (
               <div>
                 <GetTop top={top} />
                  <img 
                  src = {avatar}
                  title = {author}
                  width={40}
                  /> <br/>
                  <p>{message}</p>
                  <i>{author}</i><hr /><br />
               </div>
              );
             }
                  function GetTop({top}) {
                     if(top)
                         return '\u2764';
                     return ' ';
                  }
 export default MyBolgs;