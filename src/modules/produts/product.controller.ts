import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Request,
    Response,
    HttpCode,
    HttpStatus,
    UseGuards,
    UnauthorizedException,
    Delete,
    Param,
    Query
  } from '@nestjs/common';
  import {ProductService} from "./product.service"
  import { AuthGuard } from '../auth/auth.guard';

  
  @Controller('products')
  export class ProductController {
    constructor(private productService: ProductService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getuser(@Query('index') index: string, @Query('title') title: any): Promise<any>{
        console.log(index, title);
      return await this.productService.searchDocuments(index , title);
    }

    @UseGuards(AuthGuard)
    @Post()
    async addDocuments(@Body() body:any): Promise<any>{
        console.log(body.index , body.query)
        return await this.productService.addDocuments(body);
    }

    @UseGuards(AuthGuard)
    @Delete()
    async deleteDocument(@Query('index') index:string, @Query('id') id: string): Promise<any>{
        return await this.productService.deleteDocument(index , id);
    }

    @UseGuards(AuthGuard)
    @Put()
    async updateDocument(@Body() body:any): Promise<any> {
        return this.productService.updateDocument(body.index, body.id , body.updateBody);
      }
    
  }
  