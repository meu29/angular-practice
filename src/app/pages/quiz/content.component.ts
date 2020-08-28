import { Component, OnInit } from "@angular/core";
import { DataService } from "/home/meu/ドキュメント/angular-practice/InternApp/src/app/shared/data.service";
//import { FormGroup, FormBuilder, FormControl } from "@angular/forms";


@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})

//OnInit インターフェースには ngOnInit() という名前のフックメソッドがあります。
export class quizContentComponent { //implements OnInit { 

  question: string;
  choices: string[];
  correctAnswer: string;
  question_index: number = 0;
  question_number: number;  
  correct_answer_number: number = 0;
  has_next: boolean = true;
  has_lifeline_right: boolean = true;
  
  /* constructor以外でsubscribe()をやるとエラーが発生 */
  constructor(private dataService: DataService) { }
  
  /*
  ngOnInit() {
    this.createNextQuiz();
  }
  */

  createNextQuiz() {
    this.dataService.getData().subscribe(obj => {
      if (this.question_index == Object.keys(obj).length) {
        this.has_next = false;
      } else if (this.has_lifeline_right == false) {
        document.getElementsByClassName("one_ans")[0].removeAttribute("disabled");
        document.getElementsByClassName("one_ans")[0].setAttribute("style", "background-color: red");
      }
      alert(JSON.stringify(obj));
      this.question_number = Object.keys(obj).length;
      this.question = obj[this.question_index]["question"];
      this.choices = obj[this.question_index]["answer_candidates"];
      this.correctAnswer = obj[this.question_index]["answer_entity"];
    });  
  }

  useLifeline() {
    if (this.has_lifeline_right == true) {
      document.getElementsByClassName("one_ans")[0].setAttribute("disabled", "disabled");
      document.getElementsByClassName("one_ans")[0].setAttribute("style", "background-color: white");
      document.getElementById("lifeline").setAttribute("style", "background-color: gray");
      this.has_lifeline_right = false;
    } else {
      alert("ライフラインは一度しか使えません!");
    }
  }
  
  register(answer) {
    if (this.choices.slice(0, 4).indexOf(this.correctAnswer) == -1 && answer == "どれでもない") {
      alert("正解");
      this.correct_answer_number += 1;
    } else if (this.correctAnswer == answer) {
      alert("正解");
      this.correct_answer_number += 1;
    } else {
      alert("不正解 正解は" + this.correctAnswer + "でした");
    }
    this.question_index += 1;
    this.createNextQuiz();
  }

  reset() {
    this.correct_answer_number = 0;
    this.question_number = undefined;
  }  

}
