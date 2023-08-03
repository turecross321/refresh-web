import { Component } from '@angular/core';
import { ApiClient } from 'src/app/api/api-client';
import { sha512Async } from 'src/app/hash';
import {Banner} from "../../banners/banner";
import {BannerService} from "../../banners/banner.service";

let i: number = 0;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  usernameId: string = "login-username" + i++;
  passwordId: string = "login-password" + i++;

  constructor(private apiClient: ApiClient, private bannerService: BannerService) {}

  login() {
    const usernameInput: string = (<HTMLInputElement>document.getElementById(this.usernameId)).value;
    const passwordInput: string = (<HTMLInputElement>document.getElementById(this.passwordId)).value;

    const error: Banner = {
      Color: 'red',
      Icon: 'exclamation-circle',
      Title: "Skill Issue",
      Text: "",
    }

    if(usernameInput.length <= 0) {
      error.Text = "No username was provided."
      this.bannerService.push(error)
      return;
    }

    if(passwordInput.length <= 0) {
      error.Text = "No password was provided."
      this.bannerService.push(error)
      return;
    }

    sha512Async(passwordInput).then((hash) => {
      this.apiClient.LogIn(usernameInput, hash)
    });
  }
}
