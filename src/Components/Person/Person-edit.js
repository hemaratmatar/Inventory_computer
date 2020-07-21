import React, { Component } from "react";
import { db } from "../../Firebase/index";
import { Link } from "react-router-dom";
import { Form, Row, Col, Input, Button , InputNumber } from "antd";

class Personedit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perid: 0,
      pername: "",
      position: "",
      roomid: "",
      roomname: "",
      status: "",
      numlist: ""
    };
  }

  componentDidMount() {
    const ref = db.collection("per-list").doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const Coment = doc.data();
        this.setState({
          key: doc.id,
          perid: Coment.perid,
          pername: Coment.pername,
          position: Coment.position,
          roomid: Coment.roomid,
          roomname: Comment.roomname,
          status: Coment.status,
          numlist: Coment.numlist
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

  
  onOchange = value => {
    const state = this.state;
    state.perid = value;
    this.setState({Coment: state});
    console.log(this.state.perid);
  };



  onSubmit = e => {
    e.preventDefault();
    const {
      perid,
      pername,
      position,
      roomid,
      roomname,
      status,
      numlist
    } = this.state;

    const updateRef = db.collection("per-list").doc(this.state.key);
    updateRef
      .set({
        perid,
        pername,
        position,
        roomid,
        roomname,
        status,
        numlist
      })
      .then(docRef => {
        this.setState({
          key: "",
          perid: 0,
          pername: "",
          position: "",
          roomid: "",
          roomname: "",
          status: "",
          numlist: ""
        });
        this.props.history.push("/person-show/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.onSubmit}>
        <Row gutter={24} scroll={{ x: 1300 }}>
          <h2>
            <Link to={`/person-show/${this.state.key}`}>Person</Link>
          </h2>
          <Col span={8}>
            <Form.Item label="รหัส :">
              <InputNumber
                name="perid"
                value={this.state.perid}
                onChange={this.onOchange}
                placeholder="รหัส"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="ชื่อ :">
              <Input
                name="pername"
                onChange={this.onChange}
                value={this.state.pername}
                placeholder="ชื่อ"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="ตำแหน่ง :">
              <Input
                name="position"
                value={this.state.position}
                onChange={this.onChange}
                placeholder="ตำแหน่ง"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
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
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="สถานะบุคคล :">
              <Input
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                placeholder="สถานะบุคคล"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="รหัสรายการ :">
              <Input
                name="numlist"
                value={this.state.numlist}
                onChange={this.onChange}
                placeholder="รหัสรายการ"
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

export default Personedit;
