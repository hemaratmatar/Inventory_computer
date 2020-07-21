import React, { Component } from "react";
import { db } from "../../Firebase/index";
import { Link } from "react-router-dom";
import { Form, Row, Col, Input, Button } from "antd";

class Roomedit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomid: "",
      roomname: "",
      perid: "",
      pername: "",
      point: ""
    };
  }

  componentDidMount() {
    const ref = db.collection("room-list").doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const Coment = doc.data();
        this.setState({
          key: doc.id,
          roomid: Coment.roomid,
          roomname: Coment.roomname,
          perid: Coment.perid,
          pername: Coment.pername,
          point: Coment.point
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ Coment: state });
  };

  
  onSubmit = e => {
    e.preventDefault();
    const { roomid, roomname, perid, pername, point } = this.state;

    const updateRef = db.collection("room-list").doc(this.state.key);
    updateRef
      .set({
        roomid,
        roomname,
        perid,
        pername,
        point
      })
      .then(docRef => {
        this.setState({
          key: "",
          roomid: "",
          roomname: "",
          perid: "",
          pername: "",
          point: ""
        });
        this.props.history.push("/room-show/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.onSubmit}>
        <Row gutter={24}>
          <h4>
            <Link to={`/room-show/${this.state.key}`}>Room</Link>
          </h4>
          <Col span={8}>
            <Form.Item label="รหัสห้อง :">
              <Input
                name="roomid"
                value={this.state.roomid}
                onChange={this.onChange}
                placeholder="รหัสห้อง"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="ชื่อห้อง :">
              <Input
                name="roomname"
                onChange={this.onChange}
                value={this.state.roomname}
                placeholder="ชื่อห้อง"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="รหัสผู้ดูแล :">
              <Input
                name="perid"
                value={this.state.perid}
                onChange={this.onChange}
                placeholder="รหัสผู้ดูแล"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="ชื่อผู้ดูแล :">
              <Input
                name="pername"
                value={this.state.pername}
                onChange={this.onChange}
                placeholder="ชื่อผู้ดูแล"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="อาคาร :">
              <Input
                name="point"
                onChange={this.onChange}
                value={this.state.point}
                placeholder="อาคาร"
              />
            </Form.Item>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Roomedit;
