/* =============================================================================
 * MDT312 Assignment 6 - register.js
 * คำอธิบาย: สคริปต์สำหรับจัดการการลงทะเบียนผู้ใช้ (Register)
 * - ตรวจสอบความถูกต้องของรหัสผ่าน (Password Match)
 * - บันทึกข้อมูลเข้าสู่ localStorage ของ Browser
 * =============================================================================
 */

// เมื่อโหลดหน้า HTML เสร็จสมบูรณ์ ให้เรียกทำงานฟังก์ชัน pageLoad
window.onload = pageLoad;

/**
 * ฟังก์ชันเริ่มต้นการทำงานของหน้า Register
 * ทำหน้าที่ผูก Event Listener กับฟอร์มสมัครสมาชิก
 */
function pageLoad() {
    // ดึง Element ของฟอร์มสมัครสมาชิกผ่าน ID หรือ Name attribute
    const myForm = document.getElementById("myRegister") || document.forms["myRegister"];
    
    // ตรวจสอบว่าพบ Element ฟอร์มหรือไม่ หากพบให้ผูก Event การ Submit เข้ากับฟังก์ชัน validateForm
    if (myForm) {
        myForm.onsubmit = validateForm;
    }
}

/**
 * ฟังก์ชันสำหรับตรวจสอบและจัดการข้อมูลในฟอร์มสมัครสมาชิก
 * @param {Event} event - Object เหตุการณ์ของการส่งฟอร์ม (Submit Event)
 */
function validateForm(event) {
    // -------------------------------------------------------------------------
    // ดึงข้อความแจ้งเตือน Error และค่าจากช่องกรอกข้อมูลต่างๆ ในฟอร์ม
    // -------------------------------------------------------------------------
    const errorMsg = document.getElementById("errormsg"); // Element สำหรับแสดงข้อความแจ้งเตือน Error
    const username = document.forms["myRegister"]["username"].value.trim(); // ดึงค่า Username และตัดช่องว่างหน้า-หลังออก
    
    // ดึง NodeList ของช่อง Password ทั้งหมดในฟอร์ม (ช่อง Password และ Retype Password)
    const passwords = document.forms["myRegister"]["password"];
    const password = passwords[0].value;        // ค่าจากช่อง Password ช่องแรก
    const retypePassword = passwords[1].value;  // ค่าจากช่อง Retype Password ช่องที่สอง

    // -------------------------------------------------------------------------
    // 1. ตรวจสอบว่า Password ทั้ง 2 ช่องตรงกันหรือไม่
    // -------------------------------------------------------------------------
    if (password !== retypePassword) {
        // หาก Password ไม่ตรงกัน ให้แสดงข้อความแจ้งเตือนในพื้นที่ Error
        errorMsg.innerHTML = "Password ไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง";
        
        // ยับยั้งการ Submit ฟอร์ม เพื่อไม่ให้หน้าเว็บทำการ Refresh
        if (event) {
            event.preventDefault();
        }
        return false; // ส่งกลับ false เพื่อยกเลิกการส่งฟอร์ม
    }

    // -------------------------------------------------------------------------
    // 2. เคลียร์ข้อความแจ้งเตือนเมื่อผ่านการตรวจสอบ
    // -------------------------------------------------------------------------
    errorMsg.innerHTML = "";

    // -------------------------------------------------------------------------
    // 3. บันทึกข้อมูลลงใน localStorage ของ Browser
    // Key: "username", Value: ค่า username ที่กรอก
    // Key: "password", Value: ค่า password ที่กรอก
    // -------------------------------------------------------------------------
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // แสดงแจ้งเตือนสำเร็จแก่ผู้ใช้
    alert("ลงทะเบียนสำเร็จ! ระบบบันทึกข้อมูลเรียบร้อย กำลังไปที่หน้า Login");

    // -------------------------------------------------------------------------
    // 4. ป้องกันพฤติกรรม Default และนำทางไปยังหน้า login.html
    // -------------------------------------------------------------------------
    if (event) {
        event.preventDefault(); // ป้องกันไม่ให้ฟอร์มส่งแบบปกติ
    }
    window.location.href = "login.html"; // เปลี่ยนเส้นทางไปยังหน้า Login
    return true;
}