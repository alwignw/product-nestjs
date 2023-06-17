import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { title } from 'process';

@Injectable()
export class ProductService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async searchDocuments(index: string, title: string): Promise<any> {
    const rest = await this.elasticsearchService.search({
    index,
      body: {
        query: {
          match: { title : title }
        }
      }
    });
    return rest.hits.hits;
  }

  async  addDocuments(body:any) {
    try {
        console.log(body.index , body.query);
      const response = await this.elasticsearchService.bulk({
        index: body.index,
        body: body.query
      });

      //example
    //   [
    //     { index: { _id: '1' } },
    //     { title: 'Product 1', description: 'Description of product 1', price: 9.99 },
    //     { index: { _id: '2' } },
    //     { title: 'Product 2', description: 'Description of product 2', price: 19.99 },
    //     // Add more documents here
    //   ]
    
      console.log('Documents added:', response);
      return response
    } catch (error) {
      console.error('Error adding documents:', error);
    }
  }

  async deleteDocument(index: string, id: string): Promise<any> {
    return this.elasticsearchService.delete({
      index,
      id,
    });
  }

  async updateDocument(index: string, id: string, updateBody: any): Promise<any> {
    return this.elasticsearchService.update({
      index,
      id,
      body: {
        doc: updateBody,
      },
    });
  }

  
}






// async function deleteIndex(index) {
//     try {
//       const response = await client.indices.delete({
//         index: index
//       });
  
//       console.log('Index deleted:', response);
//     } catch (error) {
//       console.error('Error deleting index:', error);
//     }
//   }
