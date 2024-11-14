import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoveResult } from './love.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  addResult(loveResult: LoveResult) {
    return this.http.post<LoveResult>(this.url, loveResult)
  }

  getOneResult(id: string) {
    return this.http.get<LoveResult>(`${this.url}/${id}`)
  }

  getAllResults() {
    return this.http.get<LoveResult[]>(this.url)
  }

  removeResult(id: string) {
    return this.http.delete<LoveResult>(`${this.url}/${id}`)
  }
}
