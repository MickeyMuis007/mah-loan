import { Component, OnInit } from '@angular/core';
import { JsonConvertorHelper } from 'src/app/helper-classes/json-convertor.helper';

@Component({
    templateUrl: './user-profile-demo2-edit.component.html',
    styleUrls: ['./user-profile-demo2-edit.component.css']
})
export class UserProfileDemo2EditComponent implements OnInit {
    /* Properties */
    // tslint:disable-next-line:max-line-length
    private authResponse = '{"data":{"expiresAt":"2018-10-26T08:21:56.000Z","status":"SUCCESS","sessionToken":"20111dd3wjo1-R3oCMOWUC5A9qZXJRL_Xnx356GD4CKIVGVMoudSbdq","_embedded":{"user":{"id":"00ugerlb2c1NLNLM70h7","passwordChanged":"2018-10-23T07:54:11.000Z","profile":{"login":"benedictm@lawforall.co.za","firstName":"Lepekola","lastName":"Matela","locale":"en","timeZone":"America/Los_Angeles"}}}},"expiresAt":"2018-10-26T08:21:56.000Z","status":"SUCCESS","sessionToken":"20111dd3wjo1-R3oCMOWUC5A9qZXJRL_Xnx356GD4CKIVGVMoudSbdq","user":{"id":"007","passwordChanged":"2018-10-23T07:54:11.000Z","profile":{"login":"mike@gmail.co.za","firstName":"Mike","lastName":"Hendricks","locale":"en","timeZone":"America/Los_Angeles"}}}';
    authReponseJson;
    user;

    constructor(private jsonConvertor: JsonConvertorHelper) {

    }
    /* Event Handlers*/
    ngOnInit() {
        this.authReponseJson = this.jsonConvertor.convertStringToJson(this.authResponse);
        this.user = this.authReponseJson.user;
        console.log(this.jsonConvertor.convertStringToJson(this.authResponse));
        console.log(this.user);
    }
}
