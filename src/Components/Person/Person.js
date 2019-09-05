import { Form, Row, Col, Button, Table, Input } from "antd";
import React, { Component } from "react";
import "./Person.css";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/index";

class AdvancedSearchForm extends Component {
  state = {
    expand: false
  };
  constructor() {
    super();
    this.ref = db.collection("per-list");
    this.state = {
      perid: 8755 ,
      pername: "",
      position: "",
      roomid: "",
      roomname: "",
      status: "",
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
      perid,
      pername,
      position,
      roomid,
      roomname,
      status,
      numlist
    } = this.state;

    this.ref
      .add({
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
          perid: 0,
          pername: "",
          position: "",
          roomid: "",
          roomname: "",
          status: "",
          numlist: ""
        });
        this.props.history.push("/person");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  // To generate mock Form.Item

  render() {
    const {
      perid,
      pername,
      position,
      roomid,
      roomname,
      status,
      numlist
    } = this.state;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.onSubmit}>
        <Row gutter={24}>
          <h2>
            <Link to="/person">Person</Link>
          </h2>
          <Col span={8}>
            <Form.Item label="รหัส :">
              <Input
                name="perid"
                value={perid}
                onChange={this.onChange}
                placeholder="รหัส"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="ชื่อ :">
              <Input
                name="pername"
                onChange={this.onChange}
                value={pername}
                placeholder="ชื่อ"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="ตำแหน่ง :">
              <Input
                name="position"
                value={position}
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
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="สถานะบุคคล :">
              <Input
                name="status"
                value={status}
                onChange={this.onChange}
                placeholder="สถานะบุคคล"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="รหัสรายการ :">
              <Input
                name="numlist"
                value={numlist}
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
  const WrappedAdvancedSearchForm = Form.create({ name: "advanced_search" })(AdvancedSearchForm);

class Person extends Component {
  constructor(props) {
    super(props);
    this.ref = db.collection("per-list");
    this.unsubscribe = null;
    this.state = {
      coments: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const coments = [];
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
      coments.push({
        key: doc.id,
         doc, // DocumentSnapshot
        perid: perid,
        pername: pername,
        position: position,
        roomid: roomid,
        roomname: roomname,
        status: status,
        numlist: numlist,
        Edit: (
          <Link to={`/person-show/${doc.id}`}>
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
        dataIndex: "perid",
        key: "perid"
      },
      {
        title: "ชื่อ",
        dataIndex: "pername",
        key: "pername"
      },
      {
        title: "ตำแหน่ง",
        dataIndex: "position",
        key: "position"
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
        title: "สถานะบุคคล",
        dataIndex: "status",
        key: "status"
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
            <Table columns={columns} dataSource={this.state.coments} />
          </div>
        </div>
      </div>
    );
  }
}
export default Person;
