import { Router } from "express";
import ProductManager from "../manager/productManager.js";


const router = Router();
const productManager = new ProductManager()


router.get('/api/products/',async (req,res)=>{
    const productos = await productManager.getProductos();
    res.send(productos)
})

router.get('/producto/:id',async (req,res)=>{
    const id=req.params.id;
    const producto = await productManager.getProducto(id);
    res.send(producto)
})

router.get('/eliminar/:id',async (req,res)=>{
    const id=req.params.id;
    const msg = await productManager.eliminarProducto(id);
    res.send(msg)
})

router.get('/newquery', async(req,res)=>{
    const {nombre, descripcion, precio,categoria} = req.query;

    if(!nombre || !descripcion || !precio || !categoria ){
        res.send('Faltan datos')
        return
    }
    const usuario = {
        nombre,descripcion,precio,categoria
    }

    const msg = await productManager.crearProducto(producto);
    res.send(msg)
})

router.get('/editquery', async(req,res)=>{

    const {id, nombre, descripcion, precio,categoria} = req.query;

    if(!nombre || !descripcion || !precio || !categoria || !id){
        res.send('Faltan datos')
        return
    }

    const msg = await dataManager.modificarUsuario(id,nombre,descripcion,precio,categoria);
    res.send(msg)
})

export default router;