import fs from 'fs';

const path = './src/files/bd.json'

export default class ProductManager{


    getProductos = async() =>{
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path,'utf-8');
            const users = JSON.parse(data)
            return users
        }else{
            return []
        }
    }

    getProducto = async(id) =>{
        const productos = await this.getProductos();
        const producto = productos.filter((producto)=>{
            return producto.id == id
        })
        return producto
    }


    eliminarProducto = async(id)=>{
        // traemos todos los usuarios
        const productos = await this.getProductos();
        // busamos el id
        const productoIndex = productos.findIndex((producto)=>{
            return producto.id == id
        })
        // borramos elemento seleccionado
        productos.splice(productoIndex,1)
        // si no lo puede guardar devolvemos el error
        try{
            await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'))
            return 'Producto eliminado'
        }catch(error){
            return error
        }

    }

    crearProducto= async(producto)=>{
        const productos = await this.getProductos();
    // suma id al usuario
        let id = productos[productos.length-1].id;
        producto.id = ++id;
        productos.push(producto)

        try{
            await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'))
            return 'Produgro Agregado'
        }catch(error){
            return error
        }

    }

    modificarProducto = async(id,nombre,descripcion,precio,categoria)=>{

        const productos = await this.getUsuarios();
        const productoIndex = productos.findIndex((producto)=>{
            return producto.id == id
        })

        productos[productoIndex].nombre = nombre;
        productos[productoIndex].descripcion = descripcion;
        productos[productoIndex].precio = precio;
        productos[productoIndex].categoria = categoria;

            try{
                await fs.promises.writeFile(path,JSON.stringify(productos,null,'\t'))
                return 'Producto modificado'
            }catch(error){
                return error
            }
    

    }



}