import mysql from "mysql"
import dotenv from 'dotenv'
const instance = null
dotenv.config()


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT

})

connection.connect((err)=>{
    if(err){
        console.log(err.message)
    }
    console.log("connected Succesfully")
})

class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService()
    }
    async getAllData(){
        try{
            const res= await new Promise((resolve , reject)=>{
                const query= "SELECT * FROM Crud_app"

                connection.query(query,(err,results)=>{
                    if(err)reject(new Error(err.message))
                    resolve(results)
                })
                
            })
            return res
        }catch(error){
            console.log(error)
        }
    }

    async addName(name){
        try{
            const dateAdded= new Date()
            const insertId =await new Promise((resolve,reject)=>{
                const query="INSERT INTO Crud_app (name,Date) values(?,?);"

                connection.query(query, [name,dateAdded], (err, result)=>{
                    if(err)reject(new Error(err.message))
                        resolve(result.insertId)
                })
            })
            return {
                id: insertId,
                name: name,
                dateAdded: dateAdded
            }
        }catch(err){
            console.log(err)
        }
    }

    async updateData(id,name){
        try{
            id=parseInt(id,10)
            const res=await new Promise((resolve,reject)=>{
                const query="UPDATE Crud_app SET name=? WHERE id=?"

                connection.query(query, [name,id],(err,result)=>{
                    if(err)reject(new Error(err.message))
                        resolve(result.affectedRows)
                })
            })
            return res === 1?true: false
        }catch(error){
            console.log(error)
            return false
        }
    }

    async deleteRowById(id){
        try{
            id=parseInt(id,10)
            const response=await new Promise((resolve,reject)=>{
                const query="DELETE FROM Crud_app WHERE id= ?"

                connection.query(query,[id],(err,result)=>{
                    if(err)reject(new Error(err.message))
                        resolve(result.affectedRows)
                })
            })
            return response === 1? true: false
        }catch(error){
            console.log(error)
            return false
        }
    }

    async searchByName(name){
        try{
            const response=await new Promise((resolve,reject)=>{
                const query="SELECT * FROM Crud_app WHERE name = ?"

                connection.query(query,[name],(err,result)=>{
                    if(err)reject(new Error(err.message))
                        resolve(result)
                })
            })
            return response
        }catch(error){
            console.log(error)
            // return false
        }
    }
}
export default DbService