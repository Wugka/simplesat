import React, { useRef, useState, useEffect } from 'react'
import { Container, Card, Form,Button, Alert} from 'react-bootstrap'
import { BsFillEraserFill } from "react-icons/bs";
import { getToDoList } from '../services/ToDoList'

export default function ToDoList(){

    useEffect(() => {
        getToDoList().then(res => {
            console.log(JSON.stringify(res.data))
        })
        .catch(err =>{
            console.log(err)
        })
    })

    return(
        <>
            <Container className='d-flex align-items-center justify-content-center' style={{minHeight:'100vh'}}>
                <div className='w-100' style={{maxWidth:'400px'}}>
                    <Card style={{borderRadius:'6px'}}>
                        <Card.Body>
                            <div className='d-flex align-items-center text-left mb-4'><h2 style={{width:'100%'}}>Today</h2>
                                <span><BsFillEraserFill style={{color:'pink',cursor:'pointer', fontSize:'20px'}} /></span>
                            </div>
                            <Form>
                                <Form.Group className="mb-3" controlId="1">
                                    <Form.Check type="checkbox" label="Shopping" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="2">
                                    <Form.Check type="checkbox" label="Laundry" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="3">
                                    <Form.Check type="checkbox" label="Grocery"/>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                        <Form.Group style={{display:'flex', alignItems:'center'}}>
                            <Form.Control style={{border:'none',background:'inherit'}} type="text" placeholder="What do you want to do?" />
                            <span style={{float:'right', color:'#00b5ad'}}>Add</span>
                        </Form.Group>

             
                            
                            
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    )
}