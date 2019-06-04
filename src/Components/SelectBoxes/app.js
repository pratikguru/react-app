import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Row}     from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Col}      from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Card}  from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {Dropdown} from 'react-bootstrap';



export default class SelectBox extends Component {
  constructor() {
    super();
  }


  render() {
    return(
      <Dropdown>
        <Dropdown.Toggle variant="dark" style={{width:"100%", marginTop:"5px"}}>
          Year
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            this.props.data.map((year, index) => (
              <Dropdown.Item>{year}</Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
