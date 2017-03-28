import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//importing hero type class
import { Hero } from '../hero';
//importing hero sevices to get the data
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //list of heroes
  heroes: Hero[];

  //current selected hero
  selectedHero: Hero;

  constructor(
      private heroService: HeroService,
      private router: Router) { }

  //getting heroes with heroes.sevice methods
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes)
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  //adding new hero method
  add(name: String): void {
    name = name.trim()
    if(!name) {return}
    this.heroService.create(name)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        })
  }

  //selecting hero method
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  //go to detail selected hero page by id
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
