import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { User } from "./user.model";

@Injectable()
export class ServerService {
    private token;
    constructor(private http: Http) {}

    login(ip: string, port: number, user: User) {
        return new Promise((resolve, reject) => {
            let headers = new Headers({ "Content-Type": "application/json" });
            let options = new RequestOptions({ headers: headers });
            this.http.post(
                "http://" + ip + ":" + port + "/authenticate",
                JSON.stringify({ username: user.username, password: user.password }), options).toPromise().then((result) => {
                    let response = result.json();
                    this.token = response.token;
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
