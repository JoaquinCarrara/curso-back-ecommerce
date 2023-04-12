import fs from 'fs';

const path = './src/files/carritos.json';


export default class CarritosManager{

    getProductos = async() =>{
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path,'utf-8');
            const products = JSON.parse(data)
            return products
        }else{
            return []
        }
    }

    // getCarritos = async (id) =>{
    //     const productos = await this.getProductos();
    //     const producto = productos.filter((producto) =>{ return producto.id == id})
    //     return producto
    // }   

    // addProducts= async(producto)=>{
    //     const productos = await this.getProductos();
    // // suma id al usuario
    //     let id = productos[productos.length-1].id;
    //     producto.id = ++id;
    //     productos.push(producto)

    //     try{
    //         await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'))
    //         return 'Producto Agregado'
    //     }catch(error){
    //         return error
    //     }
    // }

    addProductInCart = async (idCart, idProd)=>{
        const carritos = await this.getCarritos();

        const carritosFiltrados = carritos.find((cart) => cart.id == idCart)
        
        let productosInCart = carritosFiltrados.products

        const productoIndex = productosInCart.findIndex(u=>u.id == idProd)
        
        if(productoIndex !== -1){
            productosInCart[productoIndex].quantity =productosInCart[productoIndex].quantity + 1;
        }else{
            // En caso que no existan productos en el array, este lo crea
            let producto = {
                id: idProd,
                quantity: 1
            }
            productosInCart.push(producto)
        }
        await fs.promises.writeFile(path, JSON.stringify(carritos, null, '\t'))
        return carritosFiltrados
    }


        getCarritos= async () =>{
            if(fs.existsSync(path)){
                const data = await fs.promises.readFile(path,'utf-8')
                const carritos = JSON.parse(data);
                return carritos
            }else{
                return []
            }
        } 

        getCarrito = async (idCart)=>{
            const carritos = await this.getCarritos()
        const carrito = carritos.find((cart) => cart.id == idCart)

         return carrito
        }


        addCarrito = async () =>{
            const carritos = await this.getCarritos()
            let carrito = {
                products:[]
            };

            if(carritos.length === 0 ){
                carrito.id = 1;
            }else{
                carrito.id = carritos[carritos.length-1].id + 1;
            }
            carritos.push(carrito)

            await fs.promises.writeFile(path, JSON.stringify(carritos, null, '\t'))
            return carrito;
        }




















}