//DECLARAMOS  las constantes de mongodb Y express
const express=require('express')
const paqueteMongoDB=require('mongodb');
const { response, request } = require('express');
const app=express();
//declaramos la coneccion mongo db con express
let MongoClient=paqueteMongoDB.MongoClient;
//para declarar las variales donde se guardaran las bases de datos
let db;
let mesas;

//hacemos la coneccion
MongoClient.connect('mongodb://127.0.0.1:27017',function(err,client) {

if (err!==null) {
    console.log(err);
    }

    else{
        db=client.db('mesas');
        mesas=db.collection('mesas_samples')

    
}
})
// hacemos los . use para que puedan leer las bases de datos
app.use(express.json());
app.use(express.static('public'));
// hacemos las buqueda de las mesas
app.get('/api/mesas',function(request,response) {
db.collection('mesas_samples').find().toArray(function(err,datos){
//ponemos las mesas que queremos mostrar y el mensaje de error en caso de que no
if (err!==null) {
    console.log(err)

    
}
else
{
response.send(datos)
    
}
});
});

app.post('/api/anyadir',function (request,response) {
let mesa=request.body
db.collection('mesas_samples').insertOne(mesa,function(err,respuesta) {
  
    if (err!==null) 
    {console.log(err)
        
    }

    else{   

// para que muestre y envie los datos al usuario
//response.send({mensaje:"se han añadido correctamente los datos"})
db.collection('mesas_samples').find().toArray(function(err,datos){
    //ponemos las mesas que queremos mostrar y el mensaje de error en caso de que no
    if (err!==null) {
        console.log(err)
    
        
    }
    else
    {
    response.send(datos)
        
    }
    });



    }
})
    
})


//cuando ponemos dos puntos decimos que es algo variable es por eso que se utiliza el req.params
app.put('/api/modificar/:color', function(request,response) {
let color=request.params.color
    db.collection('mesas_samples').updateOne({color:color},{$set:{color:"granate"}},function(err,datos) {
if (err!==null) {
    console.log(err)
    
}else{
//response.send({mensaje:"se ha cambiado el color existosamente"})

db.collection('mesas_samples').find().toArray(function(err,datos){
    //ponemos las mesas que queremos mostrar y el mensaje de error en caso de que no
    if (err!==null) {
        console.log(err)
    
        
    }
    else
    {
    response.send(datos)
        
    }
    });

}

    })
    
})

app.delete('/api/borrar/:patas', function(request,response){
let leg=request.params.leg

db.collection('mesas_samples').deleteOne({leg:leg},function(error,datos) {
    if (error!==null) {
        console.log(error)
        } 
else {
    response.send({mensaje:"las mesas se han borrado"})
}


})
})
app.listen(3000)