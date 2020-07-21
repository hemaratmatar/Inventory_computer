import React, { Component } from "react";
import { Statistic, Card, Row, Col, Descriptions } from "antd";
import { db } from "../../Firebase/index";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = db.collection("room-list");
    this.ref2 = db.collection("product-list");
    this.ref3 = db.collection("per-list");
    this.unsubscribe2 = null;
    this.unsubscribe = null;
    this.unsubscribe3 = null;
    this.state = {
      coments: [],
      coments2: [],
      coments3: []
    };
  }

  onCollectionUpdate2 = querySnapshot => {
    const coments2 = [];
    
    querySnapshot.forEach(doc => {
      const {
        id,
        productname,
        status,
        roomid,
        roomname,
        perid,
        pername,
        numlist
      } = doc.data();
      
      coments2.push({
        key: doc.id,
         // DocumentSnapshot
        id: id,
        productname: productname,
        status: status,
        roomid: roomid,
        roomname: roomname,
        perid: perid,
        pername: pername,
        numlist: numlist
      });
    });
    this.setState({
      coments2
    });
  };


  onCollectionUpdate = querySnapshot => {
    const coments = [];
    querySnapshot.forEach(doc => {
      const {
        roomid,
        roomname,
        perid,
        pername,
        point
      } = doc.data();
      coments.push({
        key: doc.id,
        //doc, // DocumentSnapshot
        roomid: roomid,
        roomname: roomname,
        perid: perid,
        pername: pername,
        point: point
      });
    });
    this.setState({
      coments
    });
  };

  onCollectionUpdate3 = querySnapshot => {
    const coments3 = [];
    querySnapshot.forEach(doc => {
      const {
        perid,
        pername,
        position,
        roomid,
        roomname,
        status,
        numlist
      } = doc.data();
      coments3.push({
        key: doc.id,
         doc, // DocumentSnapshot
        perid: perid,
        pername: pername,
        position: position,
        roomid: roomid,
        roomname: roomname,
        status: status,
        numlist: numlist
      });
    });
    this.setState({
      coments3
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.unsubscribe2 = this.ref2.onSnapshot(this.onCollectionUpdate2);
    this.unsubscribe3 = this.ref3.onSnapshot(this.onCollectionUpdate3);
  };

  render() {
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Row gutter={16}>
          <Col span={24}>
            <Card>
            <Descriptions title="ข้อมูลการเก็บครุภัณฑ์คอมพิวเตอร์ ภายในวิทยาลัยเทคโนโลยีสยามธุรกิจ ในพระอุปถัมภ์ฯ"></Descriptions>
            </Card>
          </Col>
        </Row>
        <br/>
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Person"
                value={this.state.coments3.length}
                precision={0}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Products"
                value={this.state.coments2.length}
                precision={0}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Room Count"
                value={this.state.coments.length}
                precision={0}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
