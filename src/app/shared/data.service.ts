import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private httpclient: HttpClient) {}

  /* angularアプリフォルダから直接ファイルを取得する場合 */
  /*
  getData() {
    return this.httpclient.get("../assets/dev1_questions.json");
  }
  */

  getData() {
    return this.httpclient.get("http://localhost:3000/");
  }

  /*
  addData() {}
  */
  
}
