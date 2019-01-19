import { Injectable } from '@angular/core';
import PouchDB  from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodosProvider {

  data: any;
  db: any;
  remote: any;

  constructor() {
    console.log('Hello TodosProvider Provider');

    this.db = new PouchDB('example');
    PouchDB.plugin(PouchDBFind);

    this.remote = 'http://localhost:5984/example2';

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);
  }

  getTodos() {

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
      }).catch((error) => {

        console.log(error);

      });

    });

  }

  findUser(userid) {
    return new Promise((resolve, reject)=>{
      this.db.find({
        selector: {
          user_id: userid
        }
      }).then((res) => {
        resolve(res.docs);
        console.log(res.docs);
      }).catch((err) => {
        reject(err);
      })
    })
  }



  updateTodo(todo){

  }

  deleteTodo(todo){

  }

  handleChange(change){

  }



}
