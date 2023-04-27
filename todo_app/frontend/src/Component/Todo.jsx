import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
const Todo = () => {

  const [todo, settodo] = useState([]);
  const [value, setvalue] = useState("");
  const navigate = useNavigate()
  const toast = useToast()
  const name = localStorage.getItem("username")
  const email = localStorage.getItem("useremail")

  const addtodo = () => {
    const payload = {
      todo: value,
      status: false
    }
    if (value) {

      fetch("https://curious-crow-miniskirt.cyclic.app/todo/add", {
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
        title: `Todo Added To List`,
        position: "top",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      setvalue("")
    } else {
      toast({
        title: `Feilds cannot be empty`,
        position: "top",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const getTodo = () => {
    axios
      .get("https://curious-crow-miniskirt.cyclic.app/todo", {
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
    axios.delete(`https://curious-crow-miniskirt.cyclic.app/todo/delete/${id}`)
      .then(res => getTodo())
    toast({
      title: 'Todo Deleted From List.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  const toggletodo = (id, status) => {
    axios.patch(`https://curious-crow-miniskirt.cyclic.app/todo/update/${id}`, { status: !status })
      .then(res => getTodo())
    toast({
      title: 'Status Changed.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }
  const logout = () => {
    localStorage.clear()
    navigate("/")
  }
  useEffect(() => {
    getTodo()
  }, []);

  return (
    <>
      <Flex justifyContent={"space-around"} padding="5px" boxShadow={"xl"} position="sticky" top="0">
        <Box textAlign={"left"}>
          <Text padding={"4px"} >{name.toUpperCase()}</Text>
          <Text padding={"4px"} >{email}</Text>
        </Box>
        <Button mt="10px" padding={"10px"} colorScheme="red" onClick={logout}>Logout</Button>
      </Flex>
      {todo.length === 0 ?
        <Box>
          <Text color={"teal"} textAlign={"center"} padding="20px" fontFamily={"Areal"} fontSize='30px'>Add Todo</Text>

          <Flex display={{ base: "grid", sm: "flex" }} w={{ base: "80%", sm: "50%" }} margin="auto" gap="10px">
            <Input value={value} onChange={(e) => setvalue(e.target.value)} placeholder='Enter todo here' />
            <Button colorScheme={"blue"} padding={"20px"} onClick={addtodo}>Add Todo</Button>
          </Flex>
        </Box> :
        <Box marginTop={"10px"}>

          <Text color={"teal"} textAlign={"center"} padding="20px" fontFamily={"Areal"} fontSize='30px'>Add Todo</Text>

          <Flex display={{ base: "grid", sm: "flex" }} w={{ base: "80%", sm: "50%" }} margin="auto" gap="10px">
            <Input value={value} onChange={(e) => setvalue(e.target.value)} placeholder='Enter todo here' />
            <Button colorScheme={"blue"} padding={"20px"} onClick={addtodo}>Add Todo</Button>
          </Flex>

          <Box width="90%" margin="auto" marginTop={"10px"} >
            <Text color={"teal"} textAlign={"center"} padding="20px" fontFamily={"Areal"} fontSize='30px'>My Todo List</Text>
            {todo.map((item) =>

              <Box display={{ base: "grid", sm: "flex" }} fontFamily={"Areal"} width="100%" margin="auto" marginTop={"10px"} border="1px solid teal" key={item._id} borderRadius="10px">

                <Text  textAlign={"center"} width={{ base: "100%", sm: "70%" }} fontSize={"20px"} fontWeight="800" color="teal" padding="10px" mt="15px">{item.todo}</Text>

                <Text textAlign={"center"} color={item.status ? "maroon" : "red"} padding="10px" mt="15px">{item.status ? "Completed" : "Not-Completed"}</Text>

                <Flex width={{ base: "90%", sm: "20%" }} margin="auto" mt="20px" gap="25px" justifyContent={"space-around"}   >
                  <Button mb="20px" colorScheme={"red"} onClick={() => deletetodo(item._id)}>Delete </Button>
                  <Button mb="20px" colorScheme={"teal"} onClick={() => toggletodo(item._id, item.status)} > Toggle </Button>
                </Flex>
              </Box>
            )}
          </Box>
        </Box>
      }
    </>
  )
}

export default Todo