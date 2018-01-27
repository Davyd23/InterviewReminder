import { Component } from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'note-modal.html'
})
export class NoteModal {
  interviewOverview: {
    companyName: String,
    interviewers: Array<String>,
    note: String
  } = {
    companyName: "",
    interviewers: new Array(''),
    note: ""
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
