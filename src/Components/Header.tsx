import React, { Component } from 'react'
import { Button, FormControl, Navbar, Nav, Container, Form, Row, Col } from 'react-bootstrap'
import logo from './vite.svg'

export default class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="md" bg="dark" variant='dark'>
                <Container>
                    <Navbar.Brand href='/'>
                        <img
                            src={logo}
                            height="30"
                            width="30"
                            className='d-inline-block align-top'
                            alt='Logo'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About us</Nav.Link>
                            <Nav.Link href="/contacts">Contacts</Nav.Link>
                            <Nav.Link href="/blog">Blog</Nav.Link>
                        </Nav>
                        <Form className="ms-auto">
                            <Row>
                                <Col xs="auto"> {/* Добавляем Col для управления размером */}
                                    <FormControl
                                        type='text'
                                        placeholder='Search'
                                        className='mr-sm-2'
                                    />
                                </Col>
                                <Col xs="auto">  {/* И тут тоже */}
                                    <Button variant='outline-info'>Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

