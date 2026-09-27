# Inventory Computer

เว็บจัดการครุภัณฑ์คอมพิวเตอร์ ออกแบบตามสไลด์ 7–9 และใช้ React, Ant Design, Firebase Authentication และ Cloud Firestore

## เริ่มใช้งาน

โปรเจกต์ล็อก runtime เป็น Node.js `24.21.0` และ npm `11.19.0` ทุก environment ต้องใช้สองเวอร์ชันนี้ให้ตรงกัน

ถ้าใช้ nvm ให้สลับเวอร์ชันก่อนติดตั้ง:

```bash
nvm install 24.21.0
nvm use 24.21.0
npm ci
npm start
```

`npm ci` จะติดตั้ง dependency ตาม `package-lock.json` แบบตรงเวอร์ชันทุกครั้ง ส่วน `npm start`, `npm run dev`, `npm run build` และ `npm run preview` จะตรวจ runtime ก่อนเริ่มทำงาน

```bash
npm ci
npm start
```

สร้างไฟล์สำหรับ deploy ด้วยคำสั่ง:

```bash
npm run build
```

## Firebase Authentication

เปิดใช้งานผู้ให้บริการต่อไปนี้ใน Firebase Console > Authentication > Sign-in method:

- Email/Password
- Google
- Facebook

สำหรับ Facebook ให้เพิ่ม App ID และ App secret จาก Meta for Developers ใน Firebase Console และเพิ่ม `https://inven-com.firebaseapp.com/__/auth/handler` ใน Meta > Facebook Login > Valid OAuth Redirect URIs

เมื่อนำขึ้น Netlify ให้เพิ่มโดเมน `ชื่อเว็บ.netlify.app` ใน Firebase Console > Authentication > Settings > Authorized domains ไม่เช่นนั้น Google และ Facebook จะขึ้นข้อผิดพลาด `auth/unauthorized-domain`

ค่า Firebase เดิมถูกใช้เป็น fallback สำหรับโปรเจกต์นี้ หากต้องการตั้งค่าผ่าน Netlify Environment variables ให้เพิ่ม:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIRESTORE_PRODUCTS_COLLECTION
VITE_FIRESTORE_PEOPLE_COLLECTION
VITE_FIRESTORE_ROOMS_COLLECTION
```

## Cloud Firestore

หน้า Dashboard subscribe ข้อมูลแบบเรียลไทม์จาก 3 collections ที่มีอยู่ในโปรเจกต์ `inven-com`:

```text
product-list: id, numlist, perid, pername, productname, roomid, roomname, status
per-list: numlist, perid, pername, position, roomid, roomname, status
room-list: perid, pername, point, roomid, roomname
```

หาก document ใน `product-list` ไม่มีฟิลด์ `id` ระบบจะใช้ Firestore Document ID แทน สามารถเปลี่ยนชื่อ collection ผ่าน environment variables ทั้งสามค่าได้

Security Rules อยู่ใน `firestore.rules` และอนุญาตให้ผู้ใช้ที่เข้าสู่ระบบแล้วอ่าน เพิ่ม แก้ไข และลบข้อมูลใน `product-list`, `per-list` และ `room-list` ได้ หากแก้ Rules ให้ deploy ด้วย Firebase CLI:

```bash
firebase deploy --only firestore:rules --project inven-com
```

## Deploy บน Netlify

ไฟล์ `netlify.toml` ตั้งค่าไว้แล้ว:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: `24.21.0`
- npm: `11.19.0`
- SPA redirect: `/* /index.html 200`

เชื่อม repository กับ Netlify แล้วกด Deploy ได้ทันที จากนั้นเพิ่ม Netlify domain ใน Firebase Authorized domains ตามขั้นตอนด้านบน
