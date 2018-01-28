import { Component } from '@angular/core';
import { ModalController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import {NoteModal} from '../note-modal/note-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  interviewOverviewList: Array<{
    companyName: String,
    interviewers: Array<{String}>,
    note: String,
    interviewDate: String,
    interviewResponseDate: String
  }> = new Array();

  constructor(public modalCtrl:ModalController, private sqlite: SQLite) {
    if(!this.isWebApp() ) {
      this.getData();
    }
  }

  addNote() {
    let noteModal = this.modalCtrl.create(NoteModal);
    noteModal.onDidDismiss(data => {
      console.log(data);
      if(data.companyName && data.companyName!=='') {
        this.interviewOverviewList.push(data);

        if(!this.isWebApp() ) {
          let query = "insert into interview(company_name, interviewer, note, interview_date, interview_response_date) values (?, ?, ?, ?, ?);";

          //noinspection TypeScriptUnresolvedFunction
          this.sqlite.create({
            name: 'interviewReminder',
            location: 'default'
          })
            .then((db:SQLiteObject) => {
              //noinspection TypeScriptUnresolvedFunction
              db.executeSql(query, [data.companyName, data.interviewers.join(","), data.note, data.interviewDate, data.interviewResponseDate])
                .then(() => console.log('Executed SQL'))
                .catch(e => console.log(e));

            })
            .catch(e => console.log(e));
        }

      }
    });
    noteModal.present();
  }

  getData() {
    //noinspection TypeScriptUnresolvedFunction
    this.sqlite.create({
      name: 'interviewReminder',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        //noinspection TypeScriptUnresolvedFunction
        db.executeSql('create table IF NOT EXISTS interview(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
          'company_name VARCHAR(255),' +
          'interviewer VARCHAR(255),' +
          'interview_date VARCHAR(10),' +
          'interview_response_date VARCHAR(10),' +
          'note VARCHAR(1000))', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

        //noinspection TypeScriptUnresolvedFunction
        db.executeSql("Select * from interview", [])
          .then(result => {
            console.log(result);
            for(var i = 0; i<result.rows.length; i++){
              this.interviewOverviewList.push({
                companyName: result.rows.item(i).company_name,
                interviewers: result.rows.item(i).interviewer.split(","),
                note: result.rows.item(i).note,
                interviewDate: result.rows.item(i).interview_date,
                interviewResponseDate: result.rows.item(i).interview_response_date
              });
            }
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e) );
  }

  openInterviewModal(interviewOverview) {
    let noteModal = this.modalCtrl.create(NoteModal, {interviewOverview: interviewOverview});
    noteModal.onDidDismiss(data => {
      console.log(data);
      interviewOverview = data;
    });
    noteModal.present();
  }

  isWebApp() {
    //noinspection TypeScriptUnresolvedFunction
    return document.URL.startsWith('http');
  }

}
