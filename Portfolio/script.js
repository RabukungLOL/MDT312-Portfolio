// โหลดขึ้นมาเมื่อหน้าเว็บพร้อมทำงาน (Week 5-7 DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    // หาตัวแปรปุ่มที่มี ID เป็น theme-toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // เช็กก่อนว่าในหน้านี้มีปุ่ม theme-toggle อยู่จริงไหม (ป้องกัน Error ในหน้าอื่นที่ไม่มีปุ่มนี้)
    if (themeToggleBtn) {
        // ดึงค่า Theme ที่เคยบันทึกไว้ใน LocalStorage (Week 7)
        const currentTheme = localStorage.getItem('theme');
        
        // ถ้าผู้ใช้เคยเลือกโหมดมืดไว้ ให้เซ็ตหน้าเว็บเป็นโหมดมืดทันที
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode'); // เอาคำสั่ง add() จาก Week 5-7 มาใช้
            themeToggleBtn.innerHTML = '☀️';
        } else {
            themeToggleBtn.innerHTML = '🌙';
        }

        // เมื่อมีการคลิกที่ปุ่ม
        themeToggleBtn.addEventListener('click', () => {
            // ใช้คำสั่ง toggle() สลับสถานะของการมีอยู่ของคลาส 'dark-mode'
            body.classList.toggle('dark-mode');
            
            // เช็กว่าตอนนี้มีคลาส 'dark-mode' อยู่บน body หรือเปล่า
            const isDark = body.classList.contains('dark-mode');
            
            // เปลี่ยนอีโมจิ
            if (isDark) {
                themeToggleBtn.innerHTML = '☀️';
                localStorage.setItem('theme', 'dark'); // บันทึกว่าผู้ใช้ชอบสีดำ
            } else {
                themeToggleBtn.innerHTML = '🌙';
                localStorage.setItem('theme', 'light'); // บันทึกว่าผู้ใช้ชอบสีขาว
            }
        });
    }
});