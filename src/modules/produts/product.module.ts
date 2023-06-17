import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';  


@Module({
  imports: [
    ElasticsearchModule.register({
        node: 'http://localhost:9200', // Elasticsearch server URL
      }),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
