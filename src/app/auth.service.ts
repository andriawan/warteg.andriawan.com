import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: StorageMap) {}

  readonly TOKEN: string = 'token';
  readonly ROLE: string = 'role';

  saveToken(token: string) {
    this.storage.set(this.TOKEN, token).subscribe(() => {});
  }

  saveRole(role: string) {
    this.storage.set(this.ROLE, role).subscribe(() => {});
  }

  getToken() {
    return this.storage.get(this.TOKEN);
  }

  getRole() {
    return this.storage.get(this.ROLE);
  }

  logout() {
    return this.storage.delete(this.TOKEN);
  }
}
