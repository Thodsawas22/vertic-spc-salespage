# VERTIC Smart Posture Corrector - Premium Sale Page

หน้า Sale Page แบบ One-Page COD (เก็บเงินปลายทาง) สำหรับสินค้าเครื่องจัดสรีระอัจฉริยะแบรนด์ **VERTIC** ออกแบบพิเศษในธีมสีน้ำเงินเข้มขอบทองหรูหรา (Premium Dark-Luxury Theme) และปรับปรุงเพื่อเน้นการใช้งานบนโทรศัพท์มือถือเป็นหลัก (Mobile-First Optimization) สำหรับการยิงโฆษณา Meta Ads

## 🚀 ฟีเจอร์ที่โดดเด่น
- **Mobile-First Layout**: หน้าเว็บจัดวางแบบ Responsive ลื่นไหลบนทุกหน้าจอ (Grid 1 คอลัมน์สำหรับโทรศัพท์มือถือ)
- **Luxury HTML/CSS Infographic**: เปรียบเทียบค่าใช้จ่ายด้วยกราฟิกโค้ด HTML/SVG คมชัดสูง ไม่ใช้ภาพที่เบลอหรือเกิดจุดเพี้ยนจาก AI
- **Floating Bottom CTA**: ปุ่มสั่งซื้อลอยตัว ยึดขอบด้านล่างหน้าจอเมื่อเข้าใช้งานผ่านมือถือ ช่วยกระตุ้นยอดขาย
- **Countdown Timer**: ระบบจับเวลานับถอยหลังโปรโมชั่น 24 ชั่วโมง โดยจดจำเวลาของแต่ละคนผ่าน `localStorage`
- **COD Checkout Form**: ฟอร์มสั่งซื้อแบบเก็บเงินปลายทางในหน้าเดียว พร้อมระบบกรอกที่อยู่อัตโนมัติในไทยและตรวจความถูกต้องข้อมูล
- **Google Sheets Webhook Ready**: พร้อมเชื่อมต่อกับ Google Apps Script เพื่อส่งข้อมูลการสั่งซื้อเข้าตารางชีทของร้านค้าโดยอัตโนมัติ

## 📦 การติดตั้งและการเตรียมตัว Deploy
โครงการนี้เป็นสแตติกเพจล้วน (Pure Static Site) มีโครงสร้างเป็น `index.html` และโฟลเดอร์รูปภาพ `images/` ที่พร้อมใช้งานได้ทันที

### 1. การเปลี่ยน Webhook Google Sheets
เปิดไฟล์ `index.html` แล้วค้นหาบรรทัดนี้:
```javascript
const WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_GOOGLE_APPS_SCRIPT_ID/exec';
```
แทนที่ด้วย URL ของ Google Apps Script ของคุณเพื่อเริ่มต้นเก็บข้อมูลผู้สั่งซื้อลงชีท

### 2. การ Deploy ขึ้น Vercel
คุณสามารถเชื่อมต่อโฟลเดอร์นี้เข้ากับ Vercel ได้โดยตรง:
1. ล็อกอินเข้าสู่บัญชี Vercel
2. คลิก **Add New > Project**
3. เลือก Repository `vertic-spc-salespage` จาก GitHub ของคุณ
4. คลิก **Deploy** (ตัวระบบจะตรวจหา `index.html` ที่รูทและทำงานในรูปแบบ Static Site ทันที!)

---

พัฒนาและออกแบบอย่างพิถีพิถันเพื่อเพิ่มอัตราการสั่งซื้อ (Conversion Rate) และความน่าเชื่อถือระดับพรีเมียม
