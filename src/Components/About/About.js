import React, { Component } from "react";
import { Row } from "antd";
import login from "../../Pic/React-icon.png";

export default class About extends Component {
  render() {
    return (
      <div>
        <div class="card">
          <div class="card-header">
            <h4>เกี่ยวกับ Inventory Computer</h4>
          </div>
          <div class="card-body">
            <h5 class="card-title">วัตถุประสงค์</h5>
            <br />
            <Row>
              <p class="card-text">
                {" "}
                1.เพื่อสร้างเว็บระบบจัดเก็บครุภัณฑ์คอมพิวเตอร์{" "}
              </p>
              <p class="card-text">
                {" "}
                2.เรียนรู้การใช้เทคโนโลยี Cloud Computing{" "}
              </p>
              <p class="card-text"> 3.เรียนรู้การพัฒนาระบบด้วยเว็บไซต์</p>
              <p class="card-text"> 4.เรียนรู้การใช้งาน Firebase </p>
              <p class="card-text">
                {" "}
                5.ศึกษาการจัดเก็บและดูแลครุภัณฑ์คอมพิวเตอร์
              </p>
            </Row>
          </div>
        </div>
        <br />
        <div class="card">
          <h5 class="card-header">ระบบการเข้าใช้งาน (Sign in)</h5>
          <div class="card-body">
            <h5 class="card-title">การใช้งานร่วมกับ Firebase</h5>
            <p class="card-text">
              เว็บไซต์นี้ได้ใช้ระบบการเข้าใช้งานด้วย Firebase
              ซึ่งมีความปลอดภัยสูงโดยข้อมูลจะถูกแปลงและส่งข้อมูลเข้าใช้งานไปยังระบบ
              Cloud Computing นั้นก็คือ Firebase
            </p>
            <p class="card-text">
              Project ที่ถูกออกแบบมาให้เป็น API และ Cloud Storage สำหรับพัฒนา
              Realtime Application รองรับหลาย Platform ทั้ง IOS App, Android App
              , Web App
            </p>
            <h5 class="card-title">Firebase service ที่เว็บไซต์นี้ใช้งาน</h5>
            <p class="card-text">
              1. Firebase Analytics บริการวิเคราะห์ข้อมูล ดึงเทคโนโลยีมาจาก
              Google Analytics แถมยังเปิดให้ใช้ฟรีแบบไม่จำกัดปริมาณข้อมูลใดๆ
            </p>
            <p class="card-text">
              2. Realtime Database คือบริการฐานข้อมูล NoSQL
              ใช้วิธีการเก็บข้อมูลเป็น JSON Tree ขนาดใหญ่ และสามารถ Sync
              สถานะข้าม Client ได้แบบ Realtime กล่าวคือ หากเชื่อมต่อ Database
              เดียวกัน 2 ที่ เมื่อใดที่ที่นึงมีการอัพเดตข้อมูล
              อีกที่นึงก็จะมีการอัพเดตข้อมูลให้เหมือนกันโดยอัตโนมัติและ
              สามารถทำงานแบบ Offline ได้บนแอป Android และ iOS
            </p>
            <p class="card-text">
              3. Hosting คือบริการฝากไฟล์ static เช่น HTML, CSS, JS,
              JPG(ไม่รองรับ PHP ซึ่งเป็น Dynamic) เพื่อให้คนอื่น ๆ
              เข้าใช้งานเว็บของเราได้ มักนิยมใช้ในการฝากไฟล์ที่ได้จากการ Build
              ของ JavaScript Framework ต่าง ๆ สังเกตว่าจะได้ไฟล์ HTML, CSS, JS
              ต่าง ๆ ตามที่ได้บอกไว้ข้างต้น หรือจะเป็นไฟล์ที่เขียนเองก็ได้
              ไม่จำเป็นต้องใช้ Framework ก็ได้เหมือนกัน อีกทั้งมี CDN และ SSL
              มาด้วยแบบฟรี ๆ
              เพื่อให้ผู้ใช้ของคุณได้รับประสบการณ์การใช้งานที่ปลอดภัยเชื่อถือได้
              และไม่มีความล่าช้าแม้ว่าจะอยู่ที่ไหนก็ตามและทุกเว็บมี Domain Name
              ของ Firebase ให้อัตโนมัติ แต่เปลี่ยนมาใช้ของตัวเองได้
            </p>
            <p class="card-text">
              4. Authentication คือบริการตรวจสอบผู้ใช้
              โดยสามารถตรวจสอบได้หลายวิธี เช่น Email/Password, เบอร์โทรศัพท์,
              บัญชี Google, Facebook, Twitter, Github เป็นต้น
              มีฐานข้อมูลเป็นของตัวเองไม่ต้องสร้างใหม่หรือออกแบบวิธีการเก็บซึ่ง
              สามารถดูได้ว่าสมัครด้วยวิธีไหน สมัครเมื่อไหร่
              และเข้าใช้ระบบครั้งล่าสุดเมื่อไหร่
            </p>
            <p class="card-text">
              5. Cloud Firestore คือ Realtime Database
              รุ่นใหม่มาพร้อมการค้นหาและการปรับขนาดอัตโนมัติที่มีประสิทธิภาพมากขึ้น
              ปรับปรุงวิธีการเก็บข้อมูลใหม่เป็น Collections และสามารถทำงานแบบ
              Offline บน Web ได้อีกด้วย (จากเดิมทำได้แค่บน Android และ iOS)
            </p>
            <a href="https://firebase.google.com/" class="btn btn-primary">
              Go To Firebase Console Admin
            </a>
          </div>
        </div>
        <br />
        <div class="card">
          <h5 class="card-header">ระบบการแสดงผลของเว็บไซต์</h5>
          <div class="card-body">
            <h5 class="card-title">การสร้างและพัฒนาเว็บไซต์</h5>
            <p class="card-text">
              เว็บไซต์นี้ได้ใช้การพัฒนาระบบเว็บไซต์โดยใช้ React Library
              ซึ่งเป็นตัวที่ทำให่เว็บไซต์นั้นมีการแสดงผลและโต้ตอบกับผู้ใช้งาน
            </p>
            <br />
            <img src={login} className="d-block w-30" />
            <p class="card-text">
              React เป็น Library หรือ Source Code ในการพัฒนาเว็บไซต์โดยใช้ภาษา
              JavaScript ในการทำงานและเป็นส่วนที่ใช้ในการแสดงผล React
              มีองคืประกอบอยู่ 3 ส่วนหลักๆได้แก่ Component State Props
            </p>
            <h5 class="card-title">Component</h5>
            <p class="card-text">
              เป็นส่วนประกอบของการแสดงผลของหน้าเว็บไซต์
              กล่าวคือเราสามารถแยกส่วนประกอบในการแสดงผลได้หลายๆส่วน เช่น
              ส่วนหัวของเว็บไซต์ Header ส่วนเนื้อหา Body และส่วนท้าย Footer
              โดยที่สามารถแยกไฟล์ในการพัฒนาได้จะทำให้เข้าใจโครงสร้างง่ายยิ่งขึ้นสำหรับการพัฒนาเว็บไซต์
            </p>
            <h5 class="card-title">State และ Props</h5>
            <p class="card-text">
              State
              เป็นในรูปแบบตัวแปรที่ใช้ในการเก็บค่าต่างๆที่มีการกรอกข้อมูลต่างๆลงหน้าเว็บไซต์เพื่อนำข้อมูลไปใช้งานต่างๆในระบบโดยมีการใช้งานภายใน
              Component เท่านั้น
            </p>
            <p class="card-text">
              Props
              เป็นในรูปแบบตัวแปรที่ใช้ในการเก็บค่าต่างๆที่มีการกรอกข้อมูลต่างๆลงหน้าเว็บไซต์เพื่อนำข้อมูลไปใช้งานในระบบโดยมีการใช้งานภายภายนอก
              Component เพื่อส่งข้อมูลไปยังส่วนต่างๆของเว็บไซต์
            </p>
            <a href="https://reactjs.org/" class="btn btn-primary">
              Go To React JS Data For Developer
            </a>
            <a href="https://redux.js.org/" class="btn btn-primary">
              Go To Redux for React Data For Developer
            </a>
          </div>
        </div>
      </div>
    );
  }
}
