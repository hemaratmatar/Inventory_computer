import { Form, Row, Col, Button, Table, Input } from "antd";
import React, { Component } from "react";

import { Link } from "react-router-dom";
import { db } from "../../Firebase/index";

class AdvancedSearchForm extends Component {
  state = {
    expand: false
  };
  constructor() {
    super();
    this.ref = db.collection("product-list");
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
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
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

    this.ref
      .add({
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
          id: "",
          productname: "",
          status: "",
          roomid: "",
          roomname: "",
          perid: "",
          pername: "",
          numlist: ""
        });
        this.props.history.push("/product");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  // To generate mock Form.Item

  render() {
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
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.onSubmit}>
        <Row gutter={24} scroll={{ x: 1300 }}>
          <h2>
            <Link to="/Product">Product</Link>
          </h2>
          <Col span={8}>
            <Form.Item label="รหัส :">
              <Input
                name="id"
                value={id}
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
                value={productname}
                placeholder="ชื่อ"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="สถานะ :">
              <Input
                name="status"
                value={status}
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
                value={roomid}
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
                value={roomname}
                placeholder="ชื่อ"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="รหัสรายการ :">
              <Input
                name="numlist"
                onChange={this.onChange}
                value={numlist}
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
                value={perid}
                onChange={this.onChange}
                placeholder="รหัสผู้ดูแล"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="ชื่อผู้ดูแล :">
              <Input
                name="pername"
                value={pername}
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
const WrappedAdvancedSearchForm = Form.create({ name: "advanced_search" })(
  AdvancedSearchForm
);

class Product extends Component {
  constructor(props) {
    super(props);
    this.ref = db.collection("product-list");
    this.unsubscribe = null;
    this.state = {
      coments: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const coments = [];
    
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
      
      coments.push({
        key: doc.id,
         // DocumentSnapshot
        id: id,
        productname: productname,
        status: status,
        roomid: roomid,
        roomname: roomname,
        perid: perid,
        pername: pername,
        numlist: numlist,
        Edit: (
          <Link to={`/product-show/${doc.id}`}>
            <Button type="primary" shape="round" icon="edit">
              Edit
            </Button>
          </Link>
        )
      });
    });
    this.setState({
      coments
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const columns = [
      {
        title: "รหัส",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "ชื่อ",
        dataIndex: "productname",
        key: "productname"
      },
      {
        title: "สถานะ",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "รหัสห้อง",
        dataIndex: "roomid",
        key: "roomid"
      },
      {
        title: "ชื่อห้อง",
        dataIndex: "roomname",
        key: "roomname"
      },
      {
        title: "รหัสผู้ดูแล",
        dataIndex: "perid",
        key: "perid"
      },
      {
        title: "ชื่อผู้ดูแล",
        dataIndex: "pername",
        key: "pername"
      },
      {
        title: "รหัสรายการ",
        dataIndex: "numlist",
        key: "numlist"
      },
      {
        title: "Edit",
        dataIndex: "Edit",
        key: "Edit"
      }
    ];

    return (
      <div>
        <WrappedAdvancedSearchForm />
        <br />
        <div className="ant-advanced-search-form">
          <div>
            <Table columns={columns} dataSource={this.state.coments} size="middle" scroll={{ x: 500 }}/>
          </div>
        </div>
      </div>
    );
  }
}
export default Product;
