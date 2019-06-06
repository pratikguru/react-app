import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Modal}  from 'react-bootstrap';
import {Container, Row, Col, Form} from 'react-bootstrap';

export default class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author_unsaved:"",
      title_unsaved :"",
      year_unsaved :0,
      idToEdit : this.props.bookInformation.idToEdit
    }
  }

  handleChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    });
  }

  handleDelete = () => {
    this.props.deleteSpecificBook(this.props.bookInformation.id);
    this.props.onClose();
  }

  handleSave = () => {
    console.log("editing book...");
    let author = this.state.author_unsaved;
    let title  = this.state.title_unsaved;
    let year   = this.state.year_unsaved;

    if (!author || !title || !year ) {
      return;
    }

    this.props.callBackDataTransfer({
      "id"     : this.props.bookInformation.id,
      "author" : this.state.author_unsaved,
      "title"  : this.state.title_unsaved,
      "year"   : this.state.year_unsaved
    })
    this.props.onClose();
  }

  render(){
    return (
      <Modal show={this.props.show}  variant="dark">
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
          <Form>
              <Row>
                <Col lg={12} sm={12} xs={12} md={12}>
                  <Form.Control required type="text" placeholder={this.props.bookInformation.title} onChange={e => this.handleChange(e, "title_unsaved")} style={{margin:"5px"}} />
                </Col>
              </Row>
              <Row>
                <Col lg={12} sm={12} xs={12} md={12}>
                  <Form.Control required type="text" placeholder={this.props.bookInformation.author} onChange={e => this.handleChange(e, "author_unsaved")} style={{margin:"5px"}} />
                </Col>
              </Row>
              <Row>
                <Col lg={12} sm={12} xs={12} md={12}>
                  <Form.Control required  type="number" placeholder={this.props.bookInformation.year} onChange={e => this.handleChange(e, "year_unsaved")} style={{margin:"5px"}} />
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
          <Button type="submit" variant="primary" onClick={this.handleSave}>Save Changes</Button>
          <Button variant="dark" onClick={this.handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
