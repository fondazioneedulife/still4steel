import React, { useState } from 'react';
import { InputGroup, Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
export default function SearchBar({className}) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

  return (
    <>
      <Row className="">
      <Col md={12}>
                <InputGroup>
                    <InputGroup.Text>
                        <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Cerca ordine"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
            </Col>
      </Row>
    </>
  );
}