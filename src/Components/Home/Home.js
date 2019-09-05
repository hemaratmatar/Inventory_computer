import React, { Component } from "react";
import { Row, Carousel, Descriptions } from "antd";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Row gutter={24}>
          <Carousel autoplay>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
          </Carousel>
        </Row>
        <br/>
        <br/>
        <Row gutter={24}>
        <Descriptions title="วัตถุประสงค์" border>
          <Descriptions.Item label="1 ">เพื่อสร้างเว็บระบบจัดเก็บครุภัณฑ์คอมพิวเตอร์</Descriptions.Item>
          <br/>
          <br/>
          <Descriptions.Item label="2 ">เรียนรู้การใช้เทคโนโลยี Cloud Computing</Descriptions.Item>
          <br/>
          <br/>
          <Descriptions.Item label="3 ">เรียนรู้การพัฒนาระบบด้วยเว็บไซต์</Descriptions.Item>
          <br/>
          <br/>
          <Descriptions.Item label="4 ">เรียนรู้การใช้งาน Firebase</Descriptions.Item>
          <br/>
          <br/>
          <Descriptions.Item label="5 ">ศึกษาการจัดเก็บและดูแลครุภัณฑ์คอมพิวเตอร์</Descriptions.Item>

        </Descriptions>
        </Row>
      </div>
    );
  }
}
