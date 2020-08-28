import { Component, OnInit } from "@angular/core";
import { DataService } from "/home/meu/ドキュメント/angular-practice/InternApp/src/app/shared/data.service";
//import { FormGroup, FormBuilder, FormControl } from "@angular/forms";


@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})

//OnInit インターフェースには ngOnInit() という名前のフックメソッドがあります。
export class quizContentComponent implements OnInit { 

  question: string;
  choices: string[];
  correctAnswer: string;
  question_index: number;
  question_number: number;  
  correct_answer_number: number;
  has_next: boolean;
  has_lifeline_right: boolean;
  
  /* constructor以外でsubscribe()をやるとエラーが発生 */
  constructor(private dataService: DataService) { }
  
  /* コンポーネントの初期化時にreset()メソッドを自動で実行 */
  ngOnInit() {
    this.reset();
  }

  /* ngOnInit()で自動実行できるのは1度だけなので、2回目以降の初期化(再チャレンジ)は手動(ボタンを押す)で実行 */
  reset() {
    this.correct_answer_number = 0;
    this.question_index = 0;
    this.question_number = undefined;
    this.has_next = true;
    this.has_lifeline_right = true;
  }    

  createNextQuiz() {
    this.dataService.getData().subscribe(obj => {
      if (this.question_index == Object.keys(obj).length) {
        this.has_next = false;
      } else if (this.has_lifeline_right == false) {
        document.getElementsByClassName("one_ans")[0].removeAttribute("disabled");
        document.getElementsByClassName("one_ans")[0].setAttribute("style", "background-color: red");
      }
      this.question_number = Object.keys(obj).length;
      this.question = obj[this.question_index]["question"];
      this.choices = obj[this.question_index]["answer_candidates"];
      this.correctAnswer = obj[this.question_index]["answer_entity"];
    });  
  }

  useLifeline() {

    if (this.has_lifeline_right == true) {
      var correct_answer_index: number = this.choices.indexOf(this.correctAnswer);
      var delete_answer_index: number;
      if (correct_answer_index == -1) {
        delete_answer_index = Math.floor(Math.random() * Math.floor(6));
      } else {
        //これだと正解を消してしまうことがある
        delete_answer_index = Math.floor(Math.random() * Math.floor(7));
      }
      document.getElementsByClassName("one_ans")[delete_answer_index].setAttribute("disabled", "disabled");
      document.getElementsByClassName("one_ans")[delete_answer_index].setAttribute("style", "background-color: white");
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

}
