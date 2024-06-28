import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import DbService from "./dbService.js"

dotenv.config()


const app= express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))


//create
app.post('/create',addData)

function addData(req,res){
    const {name}=req.body
    const db= DbService.getDbServiceInstance()

    const result=db.addName(name)
    result.then(data=>res.json({data:data}))
    .catch((err)=>console.log(err))


}


// read
app.get('/getAll', getData)

function getData(req,res){
    const db= DbService.getDbServiceInstance()
    const result= db.getAllData()

    result.then(data=>{
        res.json({data:data})
        // console.log(data)
    })
    .catch((err)=>console.log(err))

}



// update
app.patch('/update', updateData)
function updateData(req,res){
    const {id,name}= req.body
    const db=DbService.getDbServiceInstance()
    const result= db.updateData(id,name)
    

    result.then(data=>res.json({success:data}))
    .catch((err)=>console.log(err))

}


// delete
app.delete('/delete/:id', deleteData)

function deleteData(req,res){
    const { id } = req.params;
    const db = DbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => res.json({success : data}))
    .catch(err => console.log(err));
}

app.get('/search/:name',(req,res)=>{
    const {name }= req.params
    const db=DbService.getDbServiceInstance()
    const result= db.searchByName(name)
    result.then(data=>res.json({data:data}))
    .catch(err=>console.log(err))

})

app.listen(process.env.PORT,()=>{
    console.log("server is running")
})