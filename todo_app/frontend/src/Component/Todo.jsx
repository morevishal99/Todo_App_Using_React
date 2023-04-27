import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useToast } from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"
const Todo = () => {

  const [todo, settodo] = useState([]);
  const [value, setvalue] = useState("");
  // const [data, setdata] = useState([])
  const navigate=useNavigate()
  const toast = useToast()
  const addtodo = () => {
    const payload = {
      todo: value,
      status: false
    }
    fetch("http://localhost:4000/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {

        toast({
          title: "Add to cart",
          description: "New Todo Is  Successfully  Created",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    toast({
      title: `Product Added to Cart Successfully`,
      position: "top",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const getTodo = () => {
    axios
      .get("http://localhost:4000/todo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        settodo(res.data)
        getTodo()
      })

  }

  const deletetodo = (id) => {
    axios.delete(`http://localhost:4000/todo/delete/${id}`)
      .then(res => getTodo())
    toast({
      title: 'Todo Deleted From List.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const toggletodo = (id, status) => {
    axios.patch(`http://localhost:4000/todo/update/${id}`, { status: !status })
      .then(res => getTodo())
    toast({
      title: 'Status Changed.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }
const logout=()=>{
  localStorage.clear()
  navigate("/")
}
  useEffect(() => {
    getTodo()
  }, []);

  return (
    <><Box>
      <Button onClick={logout}>Logout</Button>
    </Box>
      {todo.length === 0 ? <Box><Text color={"teal"} textAlign={"center"} padding="20px" fontFamily={"Areal"} fontSize='30px'>Add Todo</Text>
        <Flex w={"30%"} margin="auto" gap="10px">
          <Input value={value} onChange={(e) => setvalue(e.target.value)} placeholder='Enter  here' />
          <Button colorScheme={"blue"} padding={"20px"} onClick={addtodo}>Add Todo</Button>
        </Flex></Box> : <Box marginTop={"10px"}>
        <Text color={"teal"} textAlign={"center"} padding="20px" fontFamily={"Areal"} fontSize='30px'>Add Todo</Text>
        <Flex w={"30%"} margin="auto" gap="10px">
          <Input value={value} onChange={(e) => setvalue(e.target.value)} placeholder='Enter  here' />
          <Button colorScheme={"blue"} padding={"20px"} onClick={addtodo}>Add Todo</Button>
        </Flex>

        <Box width="90%" margin="auto" marginTop={"10px"} >
          <Text color={"teal"} textAlign={"center"} padding="20px" fontFamily={"Areal"} fontSize='30px'>My Todo List</Text>
          {todo.map((item) =>

            <Flex fontFamily={"Areal"} width="80%" margin="auto" marginTop={"10px"} border="1px solid teal" justifyContent="space-between" key={item._id}>
              <Flex width="70%" padding="5px" gap="20px" textAlign={"left"} >
                <Text width="70%" fontSize={"20px"} fontWeight="800" color="teal" padding="10px" margin="5px">{item.todo}</Text>
                <Text color={item.status ? "maroon" : "red"} padding="10px" margin="5px">{item.status ? "Completed" : "Not-Completed"}</Text>
              </Flex>

              <Flex width={"20%"} gap="5px" justifyContent={"center"}   >
                <Button colorScheme={"red"} padding="15px" margin="12px" onClick={() => deletetodo(item._id)}>Delete </Button>
                <Button colorScheme={"teal"} padding="15px" margin="12px" onClick={() => toggletodo(item._id, item.status)} > Toggle </Button>
              </Flex>
            </Flex>
          )}
        </Box>
      </Box>
      }
    </>
  )
}

export default Todo