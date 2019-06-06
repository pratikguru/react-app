import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Modal}  from 'react-bootstrap';
import {Container, Row, Col, Form} from 'react-bootstrap';
import {Alert}   from 'react-bootstrap';





export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author_unsaved:"",
      title_unsaved :"",
      year_unsaved :0,
    }
    this.handleSave = this.handleAdd.bind(this);
  }

  handleChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    });
  }

  handleAdd(){
    console.log("Saving book...");
    let author = this.state.author_unsaved;
    let title  = this.state.title_unsaved;
    let year   = this.state.year_unsaved;

    if (author === "" || title === "" || year === 0) {
      console.log("Input error!");
      this.props.onClose();
      return;
    }

    this.props.callBackDataTransfer({
      author:this.state.author_unsaved,
      title:this.state.title_unsaved,
      year:this.state.year_unsaved
    })
    this.props.onClose(false);
  }

  render(){
    return (
      <Modal show={this.props.show}  variant="dark">
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row>
              <Col lg={12} sm={12} xs={12} md={12}>
                <Form.Control type="text" placeholder="Title" onChange={e => this.handleChange(e, "title_unsaved")} style={{margin:"5px"}} />
              </Col>
            </Row>
            <Row>
              <Col lg={12} sm={12} xs={12} md={12}>
                <Form.Control type="text" placeholder="Author" onChange={e => this.handleChange(e, "author_unsaved")} style={{margin:"5px"}} />
              </Col>
            </Row>
            <Row>
              <Col lg={12} sm={12} xs={12} md={12}>
                <Form.Control type="text" placeholder="Year" onChange={e => this.handleChange(e, "year_unsaved")} style={{margin:"5px"}} />
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
          <Button variant="primary" onClick={this.handleSave}>Add Book</Button>
        </Modal.Footer>
      </Modal>

    )
  }

}
