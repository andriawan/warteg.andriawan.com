import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: StorageMap) {}

  saveToken(token: string) {
    this.storage.set('token', token).subscribe(() => {});
  }

  getToken() {
    return this.storage.get('token');
  }
}
