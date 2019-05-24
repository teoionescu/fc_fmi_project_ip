import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { User } from "./user.model";

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
import { QueryInfo, AllClassesInfo, HistoryData } from "./queryinfo.model";

@Injectable()
export class ServerService {
    private token;
    private ip;
    private port;
    constructor(private http: Http) {}

    login(ip: string, port: number, user: User) {
        setString("default_serverip", ip);
        setNumber("default_serverport", port);
        setString("default_username", user.username);
        setString("default_password", user.password);
        return new Promise((resolve, reject) => {
            let headers = new Headers({ "Content-Type": "application/json" });
            let options = new RequestOptions({ headers: headers });
            this.http.post(
                "http://" + ip + ":" + port + "/authenticate",
                JSON.stringify({ username: user.username, password: user.password }), options).toPromise().then((result) => {
                    let response = result.json();
                    this.token = response.token;
                    this.ip = ip;
                    this.port = port;
                    resolve(this.token);
                }, (error) => { this.handleErrors(error); reject(); })
                .catch((error) => { this.handleErrors(error); reject(); });
        });
    }

    register(ip: string, port: number, user: User) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    query(image: string) {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ "Content-Type": "application/json" });
            let options = new RequestOptions({ headers: headers });
            console.log(this.ip);
            console.log(this.port);
            console.log(this.token);
            this.http.post(
                "http://" + this.ip + ":" + this.port + "/post",
                JSON.stringify({ token: this.token, photo: image }), options).toPromise().then((result) => {
                    let response: QueryInfo = result.json();
                    resolve(response);
                }, (error) => { this.handleErrors(error); reject(); })
                .catch((error) => { this.handleErrors(error); reject(); });
        });
    }

    getAllClassesInfo() {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ "Content-Type": "application/json" });
            let options = new RequestOptions({ headers: headers });
            this.http.get(
                "http://" + this.ip + ":" + this.port + "/all_classes", options).toPromise().then((result) => {
                    let response: AllClassesInfo = result.json();
                    resolve(response);
                }, (error) => { this.handleErrors(error); reject(); })
                .catch((error) => { this.handleErrors(error); reject(); });
        });
    }

    getHistory() {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ "Content-Type": "application/json" });
            let options = new RequestOptions({ headers: headers });
            this.http.post(
                "http://" + this.ip + ":" + this.port + "/get_history",
                JSON.stringify({ token: this.token }), options).toPromise().then((result) => {
                    let response: HistoryData = result.json();
                    resolve(response);
                }, (error) => { this.handleErrors(error); reject(); })
                .catch((error) => { this.handleErrors(error); reject(); });
        });
    }

    resetPassword(email) {
        /* return Kinvey.User.resetPassword(email)
            .catch(this.handleErrors); */
        return new Promise((resolve, reject) => {
            resolve();
           // 
        });
    }

    handleErrors(error) {
        console.error(JSON.stringify(error));
    }
}
