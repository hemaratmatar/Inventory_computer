import React, { Component } from "react";
import { db } from "../../Firebase/index";
import { Link } from "react-router-dom";
import { Button } from "antd";

class Personshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Coment: {},
      key: ""
    };
  }

  componentDidMount() {
    const ref = db.collection("per-list").doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          Coment: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    db.collection("per-list")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/person");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h4>
              <Link to="/person">Person</Link>
            </h4>
          </div>
          <div>
            <dl>
              <dt>รหัส:</dt>
              <dd>{this.state.Coment.perid}</dd>
              <dt>ชื่อผู้ดูแล:</dt>
              <dd>{this.state.Coment.pername}</dd>
              <dt>ตำแหน่ง</dt>
              <dd>{this.state.Coment.position}</dd>
              <dt>รหัสห้อง:</dt>
              <dd>{this.state.Coment.roomid}</dd>
              <dt>ชื่อห้อง:</dt>
              <dd>{this.state.Coment.roomname}</dd>
              <dt>สถานะบุคคล:</dt>
              <dd>{this.state.Coment.status}</dd>
              <dt>รหัสรายการ:</dt>
              <dd>{this.state.Coment.numlist}</dd>
            </dl>
            <Link to={`/person-edit/${this.state.key}`}>Edit</Link>&nbsp;
            <Button
              onClick={this.delete.bind(this, this.state.key)}
              type="danger"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Personshow;
