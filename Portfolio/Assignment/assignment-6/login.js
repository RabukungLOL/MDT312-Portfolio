/* =============================================================================
 * MDT312 Assignment 6 - login.js
 * คำอธิบาย: สคริปต์สำหรับจัดการการเข้าสู่ระบบ (Login)
 * - ดึงข้อมูลผู้ใช้จาก localStorage
 * - ตรวจสอบข้อมูลล็อกอินด้วย Loop (for loop)
 * =============================================================================
 */

// เมื่อโหลดหน้า HTML เสร็จสมบูรณ์ ให้เรียกทำงานฟังก์ชัน loginLoad
window.onload = loginLoad;

/**
 * ฟังก์ชันเริ่มต้นการทำงานของหน้า Login
 * ทำหน้าที่ผูก Event Listener เข้ากับฟอร์มล็อกอิน
 */
function loginLoad() {
    // ดึง Element ของฟอร์ม Login จาก ID หรือ Name attribute
    const myForm = document.getElementById("myLogin") || document.forms["myLogin"];
    
    // หากพบ Element ฟอร์ม ให้ทำการผูก Event การ Submit กับฟังก์ชัน checkLogin
    if (myForm) {
        myForm.onsubmit = checkLogin;
    }
}

/**
 * ฟังก์ชันสำหรับตรวจสอบข้อมูลการเข้าสู่ระบบ
 * @param {Event} event - Object เหตุการณ์ของการส่งฟอร์ม (Submit Event)
 */
function checkLogin(event) {
    // -------------------------------------------------------------------------
    // 1. ป้องกันไม่ให้หน้าเว็บรีเฟรชเองทันทีเมื่อกดปุ่ม Submit
    // -------------------------------------------------------------------------
    if (event) {
        event.preventDefault();
    }

    // -------------------------------------------------------------------------
    // 2. เตรียม Array สำหรับเก็บข้อมูลผู้ใช้ พร้อมสิทธิ์ผู้ใช้เริ่มต้น (Default User)
    // -------------------------------------------------------------------------
    const users = [{ username: "admin", password: "123456" }];

    // ดึงข้อมูลที่ลงทะเบียนไว้ใน localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // หากพบข้อมูลใน localStorage ให้นำมาสร้างเป็น Object แล้วเพิ่มลง Array users
    if (storedUsername && storedPassword) {
        users.push({
            username: storedUsername,
            password: storedPassword
        });
    }

    // -------------------------------------------------------------------------
    // 3. ตรวจสอบว่ามีข้อมูลผู้ใช้ในระบบหรือไม่
    // -------------------------------------------------------------------------
    if (users.length === 0) {
        alert("ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาลงทะเบียนที่หน้า Register ก่อน");
        window.location.href = "register.html"; // ส่งผู้ใช้กลับไปหน้าสมัครสมาชิก
        return false;
    }

    // -------------------------------------------------------------------------
    // 4. ดึงค่า Username และ Password ที่ผู้ใช้กรอกในฟอร์มขณะนั้น
    // -------------------------------------------------------------------------
    const usernameInput = document.forms["myLogin"]["username"].value.trim();
    const passwordInput = document.forms["myLogin"]["password"].value;

    // -------------------------------------------------------------------------
    // 5. วน Loop ตรวจสอบว่า Username และ Password ตรงกับรายการที่มีหรือไม่
    // -------------------------------------------------------------------------
    let isLoginSuccess = false; // ตัวแปร Flag สำหรับเก็บสถานะผลการล็อกอิน

    // วนลูปตามจำนวนผู้ใช้ทั้งหมดใน Array users
    for (let i = 0; i < users.length; i++) {
        // เช็คว่า Username และ Password ใน Array ตำแหน่งที่ i ตรงกับที่กรอกเข้ามาหรือไม่
        if (users[i].username === usernameInput && users[i].password === passwordInput) {
            isLoginSuccess = true; // ปรับสถานะเป็นสำเร็จ
            break; // หยุดการวนลูปทันทีเมื่อพบข้อมูลที่ถูกต้อง
        }
    }

    // -------------------------------------------------------------------------
    // 6. ตรวจสอบผลลัพธ์และแจ้งเตือนผู้ใช้
    // -------------------------------------------------------------------------
    if (isLoginSuccess) {
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ");
        return true;
    } else {
        alert("Username หรือ password ไม่ถูกต้อง");
        return false;
    }
}