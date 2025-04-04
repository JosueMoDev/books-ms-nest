import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAllBooks() {
    return [
      { id: 1, titulo: 'El Principito' },
      { id: 2, titulo: 'Cien Años de Soledad' },
    ];
  }
}
