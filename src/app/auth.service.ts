import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: StorageMap) {}

  readonly TOKEN: string = 'token';

  saveToken(token: string) {
    this.storage.set(this.TOKEN, token).subscribe(() => {});
  }

  getToken() {
    return this.storage.get(this.TOKEN);
  }

  logout() {
    return this.storage.delete(this.TOKEN);
  }
}
