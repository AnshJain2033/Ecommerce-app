import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from 'fs'
export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, quantity, price, category, shipping } = req.fields
        const { photo } = req.files

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' })
            case !category:
                return res.status(500).send({ error: 'Category is Required' })

            case !quantity:
                return res.status(500).send({ error: 'Quantity is Required' })
            case !description:
                return res.status(500).send({ error: 'Description is Required' })
            case !price:
                return res.status(500).send({ error: 'Price is Required' })
            case !photo && photo.size() > 1000000:
                return res.status(500).send({ error: 'Photo is Required and Should be less than 1MB' })
        }
        const products = await new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            message: 'Product Created Succesfully',
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating the Product",
            error
        })
    }
}
//Get allproducts Controller
export const getProductsController = async (req, res) => {
    try {
        //only calling product details without photo to reduce request time and load
        const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 }).populate('category')
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: 'Getting All products Succesfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Getting Products",
            error
        })
    }
}
//get single product controller
export const getSingleProductController = async (req, res) => {
    try {

        const product = await productModel.findOne({ slug: req.params.slug }).select('-photo').populate('category')
        res.status(200).send({
            success: true,
            message: 'Single product fetched Successfully',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Getting single product',
            error
        })
    }
}
//Get photo of a single product
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting Image',
            error
        })
    }
}
//delete single product
export const productDeleteController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: 'Product Deleted Successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Deleting Product',
            error
        })
    }
}
//update product controller
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, quantity, price, category, shipping } = req.fields
        const { photo } = req.files

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' })
            case !category:
                return res.status(500).send({ error: 'Category is Required' })

            case !quantity:
                return res.status(500).send({ error: 'Quantity is Required' })
            case !description:
                return res.status(500).send({ error: 'Description is Required' })
            case !price:
                return res.status(500).send({ error: 'Price is Required' })
            case !photo && photo.size() > 1000000:
                return res.status(500).send({ error: 'Photo is Required and Should be less than 1MB' })
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            message: 'Product updated Succesfully',
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in updating the Product",
            error
        })
    }
}