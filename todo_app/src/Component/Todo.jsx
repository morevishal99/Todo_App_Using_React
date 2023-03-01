import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useToast } from '@chakra-ui/react'
const Todo = () => {

  const [todo, settodo] = useState([]);
  const [value, setvalue] = useState("");
  const [data, setdata] = useState([])
  const toast = useToast()
  const addtodo = () => {
    if (value.length) {
      const payload = {
        todo: value,
        status: false
      }
      axios.post("http://localhost:8080/todo", payload)
        .then((res) => setdata(res.data))
      toast({
        title: 'Todo Added To List.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    }

    setvalue("")
  }

  const getTodo = () => {
    axios.get("http://localhost:8080/todo")
      .then(res => settodo(res.data))
  }

  const deletetodo = (id) => {
    axios.delete(`http://localhost:8080/todo/${id}`)
      .then(res => setdata(res.data))
    toast({
      title: 'Todo Deleted From List.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const toggletodo = (id, status) => {
    axios.patch(`http://localhost:8080/todo/${id}`, { status: !status })
      .then(res => setdata(res.data))
    toast({
      title: 'Status Changed.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  useEffect(() => {
    getTodo()
  }, [data]);

  return (
    <Box marginTop={"10px"}>
      <Text color={"teal"} textAlign={"center"} padding="20px" fontFamily={"Areal"} fontSize='30px'>Add Todo</Text>
      <Flex w={"30%"} margin="auto" gap="10px">
        <Input value={value} onChange={(e) => setvalue(e.target.value)} placeholder='Enter  here' />
        <Button colorScheme={"blue"} padding={"20px"} onClick={addtodo}>Add Todo</Button>
      </Flex>

      <Box width="90%" margin="auto" marginTop={"10px"} >
        <Text color={"teal"} textAlign={"center"} padding="20px" fontFamily={"Areal"} fontSize='30px'>My Todo List</Text>
        {todo.map((item) =>

          <Flex fontFamily={"Areal"} width="80%" margin="auto" marginTop={"10px"} border="1px solid teal" justifyContent="space-between" key={item.id}>
            <Flex width="70%" padding="5px" gap="20px" textAlign={"left"} >
              <Text width="70%" fontSize={"20px"} fontWeight="800" color="teal" padding="10px" margin="5px">{item.todo}</Text>
              <Text color={item.status ? "maroon" : "red"} padding="10px" margin="5px">{item.status ? "Completed" : "Not-Completed"}</Text>
            </Flex>

            <Flex width={"20%"} gap="5px" justifyContent={"center"}   >
              <Button colorScheme={"red"} padding="15px" margin="12px" onClick={() => deletetodo(item.id)}>Delete Todo</Button>
              <Button colorScheme={"teal"} padding="15px" margin="12px" onClick={() => toggletodo(item.id, item.status)} > Toggle Todo</Button>
            </Flex>
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default Todo