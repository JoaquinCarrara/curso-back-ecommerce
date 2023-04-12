import { Router } from "express";
import CarritosManager from "../manager/carritosManager.js";

const router = Router();
const manager = new CarritosManager()

router.post("/", async(req,res)=>{
    let carritoNuevo = await manager.addCarrito();
    res.send(carritoNuevo)
})

router.get('/:cid', async (req,res)=>{
    const id = parseInt(req.params.cid);
    let carrito = await manager.getCarrito(id);

    res.send(carrito)
})

router.post('/:cid/product/:pid', async (req,res)=>{
    try{
        const idCart = req.params.cid;
        const idProd = req.params.pid;
        const res = await manager.addProductInCart(idCart, idProd)

        res.send(res)
    }catch(error){
        res.status(500).send({error: "error interno"})
    }

    // app.get('/api/carrito/',async (req,res)=>{
    //     const productos = await manager.getProductos();
    //     res.send(productos)
    // })
    
    // app.get('/producto/:id',async (req,res)=>{
    //     const id=req.params.id;
    //     const producto = await carritosManager.getCarritos(id);
    //     res.send(producto)
    // })

})

export default router;