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
      yearToEdit   : 0,
      bookToEdit   : {},
      searchParams: {
        author: "",
        title: "",
        year: ""
      },
      authorValue:"",
      titleValue:""
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
      bookToEdit    : book
    }, () => console.log(this.state));
  }

  closeAddBox = () => {
    console.log("Close Add Box");
    this.setState({
      openAddDialog : false
    });
  }


  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    fetch('https://localhost:44348/api/books')
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({books: data});
      this.setState({allYears : this.state.books.map((value) =>
          value.year
      )});
    });
  }

  closeEditBox = () => {
    console.log("Close Edit Box");
    this.setState({
      openEditDialog : false
    });
  }

  handleEdit = (bookObject) => {
    console.log(bookObject);
    fetch('https://localhost:44348/api/books/' + bookObject.id  + '?author=' + bookObject.author + '&title=' + bookObject.title + '&year=' + bookObject.year, {
        method: 'put'
      }).then(() => this.fetchBooks())

    }


  handleSave = ( bookObject ) => {
    console.log("Handling Adding New book...");
    console.log( bookObject );
    fetch('https://localhost:44348/api/books' +  '?author=' + bookObject.author + '&title=' + bookObject.title + '&year=' + bookObject.year , {
      method: 'POST'
    }).then(()=>this.fetchBooks());

  }

  handleDelete = (id) => {

    fetch('https://localhost:44348/api/books/' + id , {
      method: 'delete'
    }).then(() =>this.fetchBooks());
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let pointer = this;
    if (e.currentTarget.checkValidity()) {
      console.log(this.state.searchParams)
      fetch('https://localhost:44348/api/books/filter' + '?author=' + this.state.searchParams.author + '&title=' + this.state.searchParams.title + '&year=' + this.state.searchParams.year, {
        method: 'post'
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        pointer.setState({books:data});
      });
    }
  }

  handleInputChange = (event) => {
    const {  value, name } = event.currentTarget;
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        [name]: value
      }

    })
  }

  handleClear = () => {
    console.log("Clearing contents");
    this.refs.authorInput ="";
    this.refs.titleInput  ="";
    this.refs.yearValue   ="";
    this.fetchBooks();
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
          <Form onSubmit={this.handleSubmit}>
            <Row style={{padding:"10px"}}>
              <Col lg={2} md={2} sm={12} xs={12}>
                <Form.Group >
                  <Form.Control
                    name="author"
                    type="text"
                    placeholder="Author"
                    ref="authorInput"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <Form.Group >
                  <Form.Control
                    name="title"
                    type="text"
                    ref="titleInput"
                    placeholder="Title"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <Form.Group  controlId="formGridState">
                  <Form.Control as="select" ref="yearValue" name="year" onChange={this.handleInputChange}>
                  <option> </option>
                  {
                    this.state.allYears.map((year, index) => (
                      <option key={index}> { year } </option>
                    ))
                  }
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <Button style={{width:"100%"}}variant="primary" type="submit" >
                Submit
                </Button>
              </Col>
              <Col lg={2} md={2} sm={12} xs={12}>
                <Button style={{width:"100%"}} variant="primary" type="button" onClick={this.handleClear} >
                  Clear
                </Button>
              </Col>
            </Row>
            </Form>
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
        <AddBook
          show={this.state.openAddDialog}
          onClose={this.closeAddBox}
          callBackDataTransfer={this.handleSave}/>

        <EditBook
          onClose={this.closeEditBox}
          callBackDataTransfer={this.handleEdit}
          bookInformation={this.state.bookToEdit}
          show={this.state.openEditDialog}
          deleteSpecificBook={this.handleDelete}/>
    </div>
    )
  }
}
