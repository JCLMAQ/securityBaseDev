import { Injectable } from '@angular/core';

import { WakandaService } from './wakanda.service';
import { WakandaClient } from 'wakanda-client/browser/no-promise';

const client = new WakandaClient({});

export class User {
  constructor(
    public logon: string,
    public password: string) { }
}
export interface ICurrentUser {
  email: string;
  fullName: string;
  ID: string;
}

@Injectable()
export class AuthenticationService {
  private currentUser: any;
  private current: Promise<ICurrentUser>;


  constructor(private wakanda: WakandaService) {}


  async login(username: string, password: string): Promise<boolean> {
    let isOK = false;
    try {
      isOK = await client.directory.login(username, password);
    } catch (e) {
      isOK = false;
    }
    if (isOK) {
      this.refreshUser();
    }
    return isOK;
  }

  async logout(): Promise<boolean> {
    let isOK = false;
    try {
      isOK = await client.directory.logout();
    } catch (e) {
      isOK = false;
    }
    if (isOK) {
      this.refreshUser();
    }
    return isOK;
  }
  public refreshUser() {
    this.current = client.directory
      .getCurrentUser()
      .catch(() => { });
  }

  // logout() {
  //   return new Promise ((resolve, reject) => {
  //     this.wakanda.directory.logout().then(result => {
  //       resolve(result);
  //     }).catch((error) => {
  //       reject(error.message);
  //     });
  //   });
  // }

  // login(user) {
  //   return new Promise ((resolve, reject) => {
  //     this.wakanda.directory.login(user.logon, user.password, 60).then(result => {
  //       resolve(result);
  //     }).catch((error) => {
  //       reject(error.message);
  //     });
  //   });
  // }

  checkCredentials() {
    return new Promise((resolve, reject) => {
      this.wakanda.directory.getCurrentUser().then((user) => {
        this.currentUser = user;
        resolve(user);
      }).catch((error) => {
        reject(error.message);
      });
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      if (this.currentUser) {
        resolve(this.currentUser);
      } else {
        this.checkCredentials().then((user) => {
          resolve(user);
        }).catch((error) => {
          reject(error.message);
        });
      }
    });
  }

}