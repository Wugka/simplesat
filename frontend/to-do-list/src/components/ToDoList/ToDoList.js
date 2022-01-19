import React, { useState, useEffect } from 'react'
import { Container, Card, Form } from 'react-bootstrap'
import { BsFillEraserFill } from "react-icons/bs";
import { getToDoList,createToDoList,updateToDoList,deleteAllToDoList } from '../../services/ToDoList'
import moment from 'moment'

export default function ToDoList(){
    const [toDoList, setToDoList] = useState({data: [], loading:false})
    const [toDoInput,setTodoInput] = useState('')

    //*****************************************************************************************

    useEffect(() => {
        getData()
    },[])

    //*****************************************************************************************

    function getData(){
        setToDoList(prev => ({...prev, loading:true}))
        getToDoList().then(res => {
            if(res.data){
                console.log(JSON.stringify(res.data))
                setToDoList({data: res.data, loading:false})
            }
            else{
                setToDoList({data:[], loading:false})
            }
        })
        .catch(err =>{
            console.log(err)
            setToDoList({data:[], loading:false})
        })
    }

    //*****************************************************************************************

    function handleDelete(){
        console.log('handledelete')
        deleteAllToDoList().then(() => {
                getData()
        })
        .catch(err =>{
            console.log(err)
        })
    }

    //*****************************************************************************************

    function handleCreate(){
        var jsondata={
            'title': toDoInput,
            'completed': false,
            'date': moment().format('YYYY-MM-DD')
        }

        createToDoList(jsondata).then(() => {
                getData()
                setTodoInput('') 
        })
        .catch(err => {
            console.log(err)
        })
    }

    //*****************************************************************************************

    function handleCheckboxChange(e){
        var id = e.target.getAttribute('item-id')
        var checkVal = e.target.checked

        var jsondata={
            'id': id,
            'completed': checkVal,
            'date': moment().format('YYYY-MM-DD')
        }

        updateToDoList(jsondata).then(() => {
            getData()
        })
        .catch(err =>{
            console.log(err)
        })
    }

    //*****************************************************************************************

    function handleToDoChange(e){
        console.log(e.target.value)
        const value = e.target.value
        setTodoInput(value)
    }

    //*****************************************************************************************

    return(
        <>
            <Container className='d-flex align-items-center justify-content-center' style={{minHeight:'100vh'}}>
                <div className='w-100' style={{maxWidth:'400px'}}>
                    <Card style={{borderRadius:'6px'}}>

                        <Card.Body>
                            <div className='d-flex align-items-center text-left mb-4'><h2 style={{width:'100%'}}>Today</h2>
                                <span><BsFillEraserFill className='scaleUp' onClick={handleDelete} style={{color:'pink',cursor:'pointer', fontSize:'20px'}} /></span>
                            </div>
                            <Form>
                                { toDoList.data.length > 0 ?
                                    toDoList.data.map((item) => {
                                        return(
                                            <Form.Group key={item.id} className="mb-3 d-flex" controlId={item.id}>
                                                <Form.Check
                                                    style={{marginRight:'5px'}}
                                                    checked={item.completed}
                                                    item-id={item.id}
                                                    onChange={handleCheckboxChange}
                                                    type="checkbox"
                                                />
                                                <Form.Label style={{textDecoration: item.completed ? 'line-through' :'', color: item.completed ? 'grey' : ''}}>
                                                    {item.title}
                                                </Form.Label>
                                            </Form.Group>
                                        )
                                    })
                                : <span style={{color:'#00b5ad'}}>Add some Task below...</span> }
                            </Form>
                        </Card.Body>

                        <Card.Footer style={{padding:'5px'}}>
                            <Form.Group style={{display:'flex', alignItems:'center'}}>
                                <Form.Control className='outlineFocusNone' onChange={handleToDoChange} value={toDoInput} style={{border:'none',background:'inherit'}} type="text" placeholder="What do you want to do?" />
                                <span onClick={handleCreate} style={{float:'right', color:'#00b5ad',cursor:'pointer', textDecoration:'underline'}}>Add</span>
                            </Form.Group>
                        </Card.Footer>

                    </Card>
                </div>
            </Container>
        </>
    )
}