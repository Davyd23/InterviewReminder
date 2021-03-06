import { Component } from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'note-modal.html'
})
export class NoteModal {
  interviewOverview: {
    id: String,
    companyName: String,
    interviewers: Array<String>,
    note: String,
    interviewDate: String,
    interviewResponseDate: String
  } = {
    id: "",
    companyName: "",
    interviewers: new Array(''),
    note: "",
    interviewDate: new Date().toISOString().slice(0, 10),
    interviewResponseDate: new Date().toISOString().slice(0, 10)
  } ;
  constructor( public viewCtrl:ViewController, public params: NavParams) {
    if(params.get("interviewOverview") ){
      this.interviewOverview = params.get("interviewOverview");
    }
  }

  addInterviewer() {
    this.interviewOverview.interviewers.push("");
  }
  removeInterviewer() {
    this.interviewOverview.interviewers.pop();
  }

  dismiss() {

    this.viewCtrl.dismiss(this.interviewOverview);
  }
}
