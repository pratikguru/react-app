import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import AddBook from "../AddBook/addBook.js";
import EditBook from "../EditBook/editBook.js";
import {Row}     from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Col}      from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Card}  from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {Dropdown} from 'react-bootstrap';
import SelectBoxes from "../../SelectBoxes/app.js";
import {Form}    from "react-bootstrap";





export default class MainView extends Component {
  constructor(){
    super();
    this.state = {
      books : [],
      allYears: [],
      openAddDialog:  false,
      openEditDialog: false,
      showError     : false,
      authorToEdit : "",
      titleToEdit  : "",
      yearToEdit   : 0
    }
  }

  openAddDialog = () => {
    console.log("Add Dialog");
    this.setState({
      openAddDialog: !this.state.openAddDialog
    })
  }

  openEditDialog = ( book ) => {
    console.log("Edit Dialog");
    console.log(book);
    this.setState({
      openEditDialog:true,
      authorToEdit : book.author,
      titleToEdit:   book.title,
      yearToEdit:    book.year
    }, () => console.log(this.state));
  }

  closeAddBox = () => {
    console.log("Close Add Box");
    this.setState({
      openAddDialog : false
    });

  }

  closeEditBox = () => {
    console.log("Close Edit Box");
    this.setState({
      openEditDialog : false
    });
  }

  editBook = () => {
    console.log("Editing book.")
  }

  handleSave = ( bookObject ) => {
    console.log("Handling Adding New book...");
    console.log( bookObject );
    let temp = [];
    temp = this.state.books;
    temp.push({author:bookObject.Author, title:bookObject.Title, year:bookObject.Year});
    this.setState({books: temp});
  }

  render(){
    return(
      <div>

      <div style={{overflow:"hidden", margin:"20px"}}>
        <Card style={{ backgroundColor:"#454d5559", width:"100%"}}>
          <Card.Header style={{ color:"white"}}>
            FILTER
          </Card.Header>
          <Card.Body>
            <Container>
              <Row>
                <Col sm={12} xs={12} md={2} lg={2}>
                    <Form.Control type="text" placeholder="Author" style={{margin:"5px"}} />
                </Col>
                <Col sm={12} xs={12} md={2} lg={2}>
                    <Form.Control type="text" placeholder="Title"  style={{margin:"5px"}} />
                </Col>
                <Col sm={12} xs={12} md={2} lg={2}>
                    <SelectBoxes data={this.state.allYears} />
                </Col>
                <Col sm={12} xs={12} md={4} lg={4}>
                  <Button variant="dark" style={{width:"100%", marginTop:"5px"}}> Filter </Button>
                </Col>
                <Col sm={12} xs={12} md={2} lg={2}>
                  <Button variant="dark" style={{width:"100%", marginTop:"5px"}}> Reset </Button>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
        <div className="table-container" style={{overflow:"hidden", margin:"20px", }}>
          <Table striped bordered hover variant="dark" >
            <thead>
              <tr>
                <th>#</th>
                <th>Author</th>
                <th>Title</th>
                <th>Year</th>
              </tr>
            </thead>
              <tbody style={{overflowY:"auto", height:"300px"}}>
              {
                this.state.books.map((book, index) => (
                  <tr key={index} onClick={() => { this.openEditDialog( book ) }}>
                    <td>{index + 1}</td>
                    <td>{book.author}</td>
                    <td>{book.title}</td>
                    <td>{book.year}</td>
                  </tr>
                ))
              }
              </tbody>
          </Table>
        </div>
        <div>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4} style={{marginTop:"10px"}}>
                <Button  style={{width:"100%", marginTop:"10px", height:"45px"}} onClick={this.openAddDialog}  variant="dark">Add</Button>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} style={{marginTop:"10px", width:"100%"}}>
                <Button style={{width:"100%", marginTop:"10px", height:"45px"}}  onClick={this.openEditDialog} variant="dark">Edit</Button>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} style={{marginTop:"10px", width:"100%"}}>
                <Button style={{width:"100%",marginTop:"10px", height:"45px"}}  variant="dark">Delete</Button>
            </Col>
          </Row>
        </Container>
        </div>
        <AddBook  show={this.state.openAddDialog}  onClose={this.closeAddBox}  callBackDataTransfer={this.handleSave}/>
        <EditBook  onClose={this.closeEditBox} callBackDataTransfer={this.handleEdit} bookInformation={this.state.authorToEdit, this.state.titleToEdit, this.state.yearToEdit} show={this.state.openEditDialog}/>

    </div>
    )
  }
}
