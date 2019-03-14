import { Injectable } from '@angular/core';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    {
      id: 'p1',
      title: 'Manhatan Mansion',
      description: 'In the heart of New York City!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Long_Island_City_New_York_May_2015_panorama_3.jpg/1000px-Long_Island_City_New_York_May_2015_panorama_3.jpg',
      price: 149.99
    },
    {
      id: 'p2',
      title: 'L\'Amour Toujours',
      description: 'A romantic place in Paris!',
      imageUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F47202857%2F261742567742%2F1%2Foriginal.jpg?w=1000&auto=compress&rect=0%2C213%2C2560%2C1280&s=1798d679cf3ce60051f32a3aa8188b4f',
      price: 189.99
    },
    {
      id: 'p3',
      title: 'The Foggy Palace',
      description: 'Not your average city trip!',
      imageUrl: 'http://static1.squarespace.com/static/55c13bb8e4b006a05d13b65d/5b32c97770a6ad59e1a44fa5/5b630c2f8a922d66d0479829/1533217844486/new-zealand-landscape-auckland-sky-tower-fog-morning-sunrise3.jpg',
      price: 99.99
    }
  ];

  get places() {
    return [...this._places];
  }

  constructor() { }

  getPlace(id: string) {
    return {
      ...this._places.find(place => place.id === id)
    };
  }
}
