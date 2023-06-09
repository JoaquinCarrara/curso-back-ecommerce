import express from 'express';
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'

const PORT = 8080;
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})

app.use("/api/products", productsRouter)
app.use("/api/carrito", cartsRouter)