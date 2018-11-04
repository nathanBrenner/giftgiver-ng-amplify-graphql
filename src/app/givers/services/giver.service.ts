import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';
import { Giver } from '../models';
@Injectable({
  providedIn: 'root'
})
export class GiverService {
  private apiName = 'giversCRUD';
  private path = '/givers';

  constructor() { }

  get() {
    return API.get(this.apiName, this.path, {});
  }

  post(entity: Giver) {
    return API.post(this.apiName, this.path, { body: entity });
  }

  put(entity: Giver) {
    return API.put(this.apiName, this.path, { body: entity });
  }

  delete(entity: Giver) {
    return API.del(this.apiName, `${this.path}/object/${entity.id}`, {});
  }
}
