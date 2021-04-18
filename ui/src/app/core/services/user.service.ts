import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';

import {IUser} from '../../shared/models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAPI = 'http://localhost:2410/api/v1/user';

  constructor(
    private db: AngularFirestore,
    private http: HttpClient
  ) {
  }

  async isUsernameAvailable(req: IUser): Promise<number> {
    let responseCode = 0;
    // TODO: change API endpoint from GET to allow payload
    this.http.get(
      this.userAPI, {
        headers: {'username-from-header': req.email},
        responseType: 'text',
        observe: 'response'
      }).toPromise().then(resp => {
      console.log(resp.status);
      responseCode = resp.status;
    }).finally();
    return responseCode;
  }
}
