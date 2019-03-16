import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  private placeSubscription: Subscription;
  place: Place;
  placeId: string;
  form: FormGroup;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }

      this.placeId = paramMap.get('placeId');
      this.isLoading = true;

      this.placeSubscription = this.placesService.getPlace(this.placeId).subscribe(place => {
        this.place = place;

        this.form = new FormGroup({
          title: new FormControl(this.place.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.place.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          })
        });

        this.isLoading = false;
      },
      error => {
        this.alertCtrl.create({
          header: 'An error occurred!',
          message: 'Place could not be fetched. Please try again later.',
          buttons: [{
              text: 'Okay',
              handler: () => {
                this.router.navigateByUrl('/places/tabs/offers');
              }
          }]
        }).then(alertElm => alertElm.present());
      });
    });
  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Editing place...'
    }).then(loadingEl => {
      loadingEl.present();
      this.placesService.editPlace(
        this.place.id,
        this.form.value.title,
        this.form.value.description
      ).subscribe(() => {
        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/offers');
      });
    });
  }

  ngOnDestroy() {
    if (this.placeSubscription) {
      this.placeSubscription.unsubscribe();
    }
  }

}
