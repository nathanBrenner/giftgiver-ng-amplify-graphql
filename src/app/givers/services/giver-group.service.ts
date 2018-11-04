import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';
import { GiverGroup } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GiverGroupService {

  private apiName = 'giverGroupCRUD';
  private path = '/giverGroup';

  get() {
    return API.get(this.apiName, this.path, {});
  }

  post(entity: GiverGroup) {
    return API.post(this.apiName, this.path, { body: entity });
  }

  put(entity: GiverGroup) {
    return API.put(this.apiName, this.path, { body: entity });
  }

  delete(entity: GiverGroup) {
    return API.del(this.apiName, `${this.path}/object/${entity.id}`, {});
  }
}
