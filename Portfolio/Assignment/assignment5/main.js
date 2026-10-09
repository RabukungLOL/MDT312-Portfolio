window.onload = setupFunction;

function setupFunction() {
    // 1. กำหนดชื่อหัวข้อของหน้าเว็บที่ id="top"[cite: 1]
    document.getElementById("top").innerText = "Welcome to the Forum";

    // ผูก Event ให้กับปุ่ม Post และ Clear
    let buttons = document.getElementsByTagName("button");
    buttons[0].onclick = postFunction;
    buttons[1].onclick = clearFunction;
}

// 2. สร้างตัวแปรนับลำดับการโพสต์ชื่อว่า postCount และกำหนดค่าเริ่มต้นเป็น 0[cite: 1]
var postCount = 0;

function postFunction() {
    // อ่านค่าข้อความจาก textarea (id="message")[cite: 1]
    var message = document.getElementById("message").value;

    // ตรวจสอบว่ามีข้อความพิมพ์อยู่หรือไม่
    if (message === "") {
        return; 
    }

    // นำข้อความไปใส่ในแต่ละกล่องตามลำดับ[cite: 1]
    if (postCount === 0) {
        document.getElementById("topic").innerText = message;
        postCount++;
    } else if (postCount === 1) {
        document.getElementById("reply1").innerText = message;
        postCount++;
    } else if (postCount === 2) {
        document.getElementById("reply2").innerText = message;
        postCount = 0;
    }

    // เคลียร์ข้อความใน textarea ให้ว่างหลังจากโพสต์[cite: 1]
    document.getElementById("message").value = "";
}

function clearFunction() {
    // 1. ล้างข้อความใน id="topic", id="reply1", id="reply2"[cite: 1]
    document.getElementById("topic").innerText = "";
    document.getElementById("reply1").innerText = "";
    document.getElementById("reply2").innerText = "";

    // 2. ล้างข้อความใน textarea (id="message")[cite: 1]
    document.getElementById("message").value = "";

    // 3. รีเซ็ตตัวแปร postCount กลับเป็นค่าเริ่มต้น[cite: 1]
    postCount = 0;
}