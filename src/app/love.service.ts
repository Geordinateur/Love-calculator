import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, tap } from 'rxjs';
import { ApiService } from './api.service';

export interface LoveResult {
  id: string;
  fname: string;
  sname: string;
  percentage: string;
  result: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoveService {

  history: LoveResult[] = []

  constructor(
    private http: HttpClient,
    readonly api: ApiService) { }

  calculate(name1: string, name2: string) {
    const request = this.http.get<LoveResult>(
      'https://love-calculator.p.rapidapi.com/getPercentage',
      {
        params: {
          fname: name1,
          sname: name2,
        },
        headers: {
          'X-RapidAPI-Key':
            'aKhRBkgi2xmshSdmi9NEjXJZAcu1p1xWdt7jsn813kxMJ5uxAh',
          'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
        },
      }
    ).pipe(
      // permet d'ajouter un id sur le résultat qui sera
      // nécessaire plus tard
      map(res => ({ ...res, id: Date.now().toString() })),
      //tap(res => this.history.push(res))
      mergeMap(res => this.api.addResult(res))
    );
    return request;
  }

  remove(loveResult: LoveResult) {
    return this.api.removeResult(loveResult.id)
  }

  clear() {
    return this.api
    .getAllResults()
    .pipe(
        mergeMap(result => {
          return forkJoin(result.map(r => this.api.removeResult(r.id)))
        })
      )
  }

  getAll() {
    return this.api.getAllResults();
  }

  get(id: string) {
    return this.api.getOneResult(id)
  }
}
