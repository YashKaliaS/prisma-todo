const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

//get all todos
app.get('/todos',async(req,res)=>{
    const todos=await prisma.todo.findMany();
    res.json(todos);
})
//create a new todo
app.post('/todos',async(req,res)=>{
    const {title}=await req.body();
    const newtodo=await prisma.todo.create({
        data:{
            title
        }
    })
    res.status(201).json(newtodo);
})
//update a todo
app.put('/todos/:id',async(req,res)=>{
    const {id}=req.params;
    const { completed } = req.body;
    const updatedTodo=await prisma.todo.update({
        where:{
            id:Number(id),
        },
        data:{
            completed   
        }

    })
    res.json(updatedTodo);
})
//make express listen in the servrer
app.listen(3000,()=>{
    console.log("Server listening on port 3000");
})
