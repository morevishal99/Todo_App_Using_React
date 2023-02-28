import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from "axios"

const Todo = () => {
  const [todo, settodo] = useState([]);
  const [value, setvalue] = useState();
  const [data, setdata] = useState([])
  const addtodo = () => {
    if (value) {
      const payload = {
        todo: value,
        status: false
      }
      axios.post("http://localhost:8080/todo", payload)
        .then((res) => setdata(res.data))
        setvalue('')
    }
  }

  const getTodo = () => {
    axios.get("http://localhost:8080/todo")
      .then(res => settodo(res.data))
  }

  const deletetodo=(id)=>{
  axios.delete(`http://localhost:8080/todo/${id}`)
  .then(res=>setdata(res.data))
  }
  const toggletodo=(id,status)=>{
    // const status=!status
    axios.patch(`http://localhost:8080/todo/${id}`,{status:!status})
    .then(res=>setdata(res.data))
  }
  useEffect(() => {
    getTodo()
  }, [data]);
  console.log(todo)
  return (
    <Box margin={"10px"}>
      <Flex w={"300px"} margin="auto" gap="10px">
        <Input onChange={(e) => setvalue(e.target.value)} placeholder='Enter here' colorScheme={"red"} />
        <Button onClick={addtodo}>Add Todo</Button>
      </Flex>

      <Box width="80%" margin="auto" marginTop={"10px"}>
        {todo.map((item) =>
          <Flex justifyContent="space-evenly" key={item.id}>
            <Flex gap="20px" >
              <Text color="teal" padding="10px" margin="5px">{item.todo}</Text>
              <Text color="red" padding="10px" margin="5px">{item.status ? "Completed" : "Not-Completed"}</Text>
            </Flex>

            <Flex>
              <Button onClick={()=>deletetodo(item.id)} margin="5px">Delete Todo</Button>
              <Button onClick={()=>toggletodo(item.id,item.status)} margin="5px"> Toggle Todo</Button>
            </Flex>
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default Todo