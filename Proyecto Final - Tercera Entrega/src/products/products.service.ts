import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // ? DTO createProductDto --> Body, esto trae la data
    const productCreated = await this.productModel.create(createProductDto);
    return productCreated;
  }

  async findAll() {
    const list = await this.productModel.find({});
    return list;
  }

  async findOne(id: string) {
    const productById = await this.productModel.findById(id);
    return productById;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productUpdated = await this.productModel.findByIdAndUpdate(
      { _id: id },
      updateProductDto,
    );
    console.log(productUpdated);
    return productUpdated;
  }

  async remove(id: string) {
    const productRemoved = await this.productModel.findByIdAndRemove(id);
    return productRemoved;
  }
}
