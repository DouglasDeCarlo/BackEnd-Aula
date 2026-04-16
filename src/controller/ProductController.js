import { Product } from "../models/product.js";

export default class ProductController {
    static async getAllProducts(req, res) {
        const products = await Product.find();
        return res.json({ products });
    }

    static async createdProduct(req, res) {
        const { name, mark, color, description, price } = req.body;
        const data = new Product();

        data.name = name;
        data.mark = mark;
        data.color = color;
        data.description = description;
        data.price = price;
        const createdProduct = await Product.create(data);

        return res.json({ message: "Produto criado com sucesso!", data: createdProduct });
    }

    static async editProduct(req, res) {
        const { _id, name, mark, color, description, price } = req.body;
        const product = await Product.findById(_id);

        if (!product) {
            return res.json({message:"Não existe um produto com este ID!"})
        }

        product.name = name;
        product.mark = mark;
        product.color = color;
        product.description = description;
        product.price = price;

        await Product.updateOne(product);
        const updatedProduct = await Product.findById(_id);
        return res.json({mesage: "Editado com sucesso!", updatedProduct})
    }

    static async deleteProduct(req, res) {
        const { id } = req.params;
        await Product.findOneAndDelete(id);
        return res.json({message: "Deletado com sucesso!"})
    }
}
