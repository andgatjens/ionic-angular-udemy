import { Injectable } from '@angular/core';

import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private _bookings: Booking[] = [
    {
      id: 'b1',
      placeId: 'p1',
      userId: 'u1',
      placeTitle: 'Manhatan Mansion',
      guestNumber: 1
    },
    {
      id: 'b2',
      placeId: 'p2',
      userId: 'u2',
      placeTitle: 'L\'Amour Toujours',
      guestNumber: 2
    },
    {
      id: 'b3',
      placeId: 'p3',
      userId: 'u3',
      placeTitle: 'The Foggy Palace',
      guestNumber: 3
    }
  ];

  get bookings() {
    return [...this._bookings];
  }

  constructor() { }
}
