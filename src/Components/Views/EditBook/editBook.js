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
    }
  }

  handleChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    });
  }

  handleSave = () => {
    console.log("editing book...");
    let author = this.state.author_unsaved;
    let title  = this.state.title_unsaved;
    let year   = this.state.year_unsaved;

    this.props.callBackDataTransfer({
      "Author" : author,
      "Title"  : title,
      "Year"   : year
    });
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
            <Row>
              <Col lg={12} sm={12} xs={12} md={12}>
                <Form.Control type="text" placeholder={this.props.bookInformation.titleToEdit} onChange={e => this.handleChange(e, "title_unsaved")} style={{margin:"5px"}} />
              </Col>
            </Row>
            <Row>
              <Col lg={12} sm={12} xs={12} md={12}>
                <Form.Control type="text" placeholder={this.props.bookInformation.authorToEdit} onChange={e => this.handleChange(e, "author_unsaved")} style={{margin:"5px"}} />
              </Col>
            </Row>
            <Row>
              <Col lg={12} sm={12} xs={12} md={12}>
                <Form.Control type="text" placeholder={this.props.bookInformation.yearToEdit} onChange={e => this.handleChange(e, "year_unsaved")} style={{margin:"5px"}} />
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
          <Button variant="primary" onClick={this.handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    )
  }

}
