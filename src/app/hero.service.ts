import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Headers, Http } from '@angular/http';
import { HEROES } from './mock-heroes';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-type': 'application/jso'});


  // getHeroes(): Promise<Hero[]>  {
  //   return Promise.resolve(HEROES);
  // }

  constructor(private http: Http) { }

  //getting list of heroes
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
        .toPromise()
        .then(response => response.json().data as Hero[])
        .catch(this.handleError);
  }

  //handling errors
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  //getting heroes slowly
  // getHeroesSlowly(): Promise<Hero[]> {
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(this.getHeroes()));
  //   });
  // }

  // getHero(id: number): Promise<Hero> {
  //   return this.getHeroes()
  //       .then(heroes => heroes.find(hero => hero.id === id));
  // }

    //getting hero by id
    getHero(id: number): Promise<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Hero)
          .catch(this.handleError);
    }

    //updating hero
    update(hero: Hero): Promise<Hero> {
      const url = `${this.heroesUrl}/${hero.id}`;
      return this.http
          .put(url, JSON.stringify(hero), {headers: this.headers})
          .toPromise()
          .then(() => hero)
          .catch(this.handleError);
    }

    //creating new hero
    create(name: String): Promise<Hero> {
      return this.http
          .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
          .toPromise()
          .then(res => res.json().data as Hero)
          .catch(this.handleError);
    }

    //deleting hero
    delete(id: number): Promise<void> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http
          .delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
    }
}
