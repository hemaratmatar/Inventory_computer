import React, { Component } from "react";
import { db } from "../../Firebase/index";
import { Link } from "react-router-dom";
import { Form, Row, Col, Input, Button } from "antd";

class Productedit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      productname: "",
      status: "",
      roomid: "",
      roomname: "",
      perid: "",
      pername: "",
      numlist: ""
    };
  }

  componentDidMount() {
    const ref = db.collection("product-list").doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const Coment = doc.data();
        this.setState({
          key: doc.id,
          id: Coment.id,
          productname: Coment.productname,
          status: Coment.status,
          roomid: Coment.roomid,
          roomname: Coment.roomname,
          perid: Coment.perid,
          pername: Coment.pername,
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

  onSubmit = e => {
    e.preventDefault();
    const {
      id,
      productname,
      status,
      roomid,
      roomname,
      perid,
      pername,
      numlist
    } = this.state;
    const updateRef = db.collection("product-list").doc(this.state.key);
    updateRef
      .set({
        id,
        productname,
        status,
        roomid,
        roomname,
        perid,
        pername,
        numlist
      })
      .then(docRef => {
        this.setState({
          key: "",
          id: "",
          productname: "",
          status: "",
          roomid: "",
          roomname: "",
          perid: "",
          pername: "",
          numlist: ""
        });
        this.props.history.push("/product-show/" + this.props.match.params.id);
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
            <Link to={`/product-show/${this.state.key}`}>Catagory List</Link>
          </h4>
          <Col span={8}>
            <Form.Item label="รหัส :">
              <Input
                name="id"
                value={this.state.id}
                onChange={this.onChange}
                placeholder="รหัส"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="ชื่อ :">
              <Input
                name="productname"
                onChange={this.onChange}
                value={this.state.productname}
                placeholder="ชื่อ"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="สถานะ :">
              <Input
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                placeholder="สถานะ"
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
                placeholder="ชื่อ"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="รหัสรายการ :">
              <Input
                name="numlist"
                onChange={this.onChange}
                value={this.state.numlist}
                placeholder="รหัสรายการ"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
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

export default Productedit;
