import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
  todo: any;
  myForm: FormGroup;
  Clave: '';

  constructor(public navCtrl: NavController,
              public todoService: TodosProvider,
              public alertCtrl: AlertController,
              public fb: FormBuilder,) {

    this.todoService.findUser(3058).then((data) => {
      this.todo = data;
      console.log(data);

      this.myForm = this.fb.group({
        Clave: ['', [Validators.required]],
      });
    });
  }

  ionViewDidLoad(){

    this.todoService.getTodos().then((data) => {
      this.todos = data;
      console.log(data);
    });

  }

  changeView(){

  }

}
