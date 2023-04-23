import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent  implements OnInit {

  name: string;
  age: number;
  country1: string;
  probability1: number;
  country2: string;
  probability2: number;
  gender: string;

  constructor(private http: HttpClient, private toastCtrl: ToastController) { }

  async checkFun() {
    try {
      const responses = await Promise.all([
        this.http.get(`https://api.agify.io/?name=${this.name}`).toPromise(),
        this.http.get(`https://api.nationalize.io/?name=${this.name}`).toPromise(),
        this.http.get(`https://api.genderize.io/?name=${this.name}`).toPromise()
      ]);
      this.age = responses[0]['age'];
      const nationalities = responses[1]['country'];
      this.country1 = nationalities[0]['country_id'];
      this.probability1 = Math.round(nationalities[0]['probability'] * 100);
      this.country2 = nationalities[1]['country_id'];
      this.probability2 = Math.round(nationalities[1]['probability'] * 100);
      this.gender = responses[2]['gender'];
    } catch (error) {
      console.error(error);
      const toast = await this.toastCtrl.create({
        message: 'Error checking fun. Please try again later.',
        duration: 3000
      });
      toast.present();
    }
  }

  clearFun() {
    this.name = '';
    this.age = null;
    this.country1 = null;
    this.probability1 = null;
    this.country2 = null;
    this.probability2 = null;
    this.gender = null;
  }

}