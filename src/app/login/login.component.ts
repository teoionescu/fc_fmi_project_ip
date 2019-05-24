import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
/* import { Router } from "@angular/router"; */
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";

import { ServerService } from "../shared/server.service";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { User } from "../shared/user.model";

import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear
} from "tns-core-modules/application-settings";

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {
  isLoggingIn = true;
  user: User;
  serverip: string;
  serverport: number;
  @ViewChild("port") port: ElementRef;
  @ViewChild("username") username: ElementRef;
  @ViewChild("password") password: ElementRef;
  @ViewChild("confirmPassword") confirmPassword: ElementRef;
  
  constructor(private page: Page, private serverService: ServerService, private routerExtension: RouterExtensions) {
    this.page.actionBarHidden = true;
    this.user = new User();
  }

  onLogout() {
    this.routerExtension.navigate(["../login"], { clearHistory: true });
    /* 
      <Button text="Go To Tabs Page" [nsRouterLink]="['/tabs/default']"></Button>
      <Button row="1" text="Logout" (tap)="onLogout()"></Button>
    */
  }

  ngOnInit() {
    this.serverip = getString("default_serverip", "5.12.108.205");
    this.serverport = getNumber("default_serverport", 2020);
    this.user.username = getString("default_username", "foo");
    this.user.password = getString("default_password", "bar");
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
    if (!this.user.username || !this.user.password) {
      this.alert("Please provide both an email address and password.");
      return;
    }

    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.serverService.login(this.serverip, this.serverport, this.user)
      .then((token: string) => {
        this.alert(token);
        this.routerExtension.navigate(["/tabs/default"], { clearHistory: true });
      })
      .catch(() => {
        this.alert("Unfortunately we could not find your account.");
      });
  }

  register() {
    if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        return;
    }
    this.serverService.register(this.serverip, this.serverport, this.user)
      .then(() => {
          this.alert("Your account was successfully created.");
          this.isLoggingIn = true;
      })
      .catch(() => {
          this.alert("Unfortunately we were unable to create your account.");
      });
  }

  forgotPassword() {
    prompt({
      title: "Forgot Password?",
      message: "Your problem.",
      inputType: "text",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    }).then((data) => {
      if (data.result) {
        this.serverService.resetPassword(data.text.trim())
          .then(() => {
              this.alert("Your password was successfully reset.");
          }).catch(() => {
              this.alert("Unfortunately, an error occurred resetting your password.");
          });
      }
    });
  }

  focusPort() {
    this.port.nativeElement.focus();
  }
  focusUsername() {
    this.username.nativeElement.focus();
  }
  focusPassword() {
      this.password.nativeElement.focus();
  }
  focusConfirmPassword() {
      if (!this.isLoggingIn) {
          this.confirmPassword.nativeElement.focus();
      }
  }

  alert(message: string) {
      return alert({
          title: "Frunzulitze",
          okButtonText: "OK",
          message: message
      });
  }
}

