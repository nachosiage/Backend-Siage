import { Router } from "express";
import ProductManager from "../../dao/ProductManager.js";
import { buildResponse } from "../views/products.router.js";

const router = Router();

//Obtengo los productos y los muestro ✔️
router.get('/products', async (req, res) =>{
    try {
        const { page = 1, limit = 10, category, sort } = req.query;
        const options = { page, limit };
        if (sort) {
            options.sort = { price: sort || 1 };
        }
        const criteria = {};
        if (category) {
            criteria.category = category;
        }
        const products = await ProductManager.paginate(criteria, options);
        res.render('productsManager', buildResponse(products, 'Configuracion', 'realtime.css', 'api/products', req.session.user, category, sort));
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

//Obtengo products por id 
router.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await ProductManager.getById(pid);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }    
});

//Agrego products 
router.post('/products', async (req, res) => {
    const { body } = req;
    const newProduct = {...body}
    const product = await ProductManager.create(newProduct);
    res.status(201).json(product);
});

//Actualizar product 
router.put('/products/:pid', async (req, res) => {
    try {
        const { params: { pid }, body } = req;
        await ProductManager.updateById(pid, body);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

//Eliminar product 
router.delete('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        await ProductManager.deleteById(pid);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});




export default router;

