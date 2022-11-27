import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faArrowDown, faArrowLeft, faSearch, faTimes, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})

export class LocationSelectorComponent implements OnInit {
  expandWidget = false;
  showContent = true;
  filteredCities: string[] = [];
  previousSelected = '';
  allCities: any[] = [];
  cityName = '';
  cityLetters: string[] = [];
  faSearch = faSearch;
  faWindowMinimize = faWindowMinimize;
  faWindowMaximize = faWindowMaximize;
  faArrowLeft = faArrowLeft;
  faArrowDown = faArrowDown;
  faTimes = faTimes;
  @ViewChild('options') options!: ElementRef;

  cities = [
    { id: 1, place: 'Amritsar-India', checked: false },
    { id: 2, place: 'El Paso-USA', checked: false },
    { id: 3, place: 'Fuxin-China', checked: false },
    { id: 4, place: 'Goa-India', checked: false },
    { id: 5, place: 'ipoh-Malaysia', checked: false },
    { id: 6, place: 'Chennai-India', checked: false },
    { id: 7, place: 'Hassan-India', checked: false },
    { id: 8, place: 'Idukki-India', checked: false },
    { id: 9, place: 'Jammu-India', checked: false },
    { id: 10, place: 'Bengaluru-India', checked: false },
    { id: 11, place: 'munich-Spain', checked: false },
    { id: 12, place: 'Beijing-China', checked: false },
    { id: 13, place: 'Lahore-Pakistan', checked: false },
    { id: 14, place: 'Katmandu-Nepal', checked: false },
    { id: 15, place: 'Detroit-USA', checked: false },
    { id: 16, place: 'Bali-Indonasia', checked: false },
    { id: 17, place: 'Las Vegas-USa', checked: false },
    { id: 18, place: 'Nagpur-India', checked: false },
    { id: 19, place: 'Orissa-India', checked: false },
    { id: 20, place: 'Paris-France', checked: false },
    { id: 21, place: 'Quetta-Pakistan', checked: false },
    { id: 22, place: 'Rome-Italy', checked: false },
    { id: 23, place: 'Stockholm-Swedan', checked: false },
    { id: 24, place: 'Tokyo-Japan', checked: false },
    { id: 25, place: 'Udaipur-India', checked: false },
    { id: 26, place: 'Vancouver-canada', checked: false, },
    { id: 27, place: 'Xinpu-china', checked: false },
    { id: 28, place: 'Yangon-Myanmar', checked: false },
    { id: 29, place: 'Zanzibar-Tanzania', checked: false },
    { id: 30, place: 'wakanda-Africa', checked: false }
  ];

  constructor() {
  }

  ngOnInit() {
    this.cities = this.cities.sort((a, b) => a.place.toLowerCase().localeCompare(b.place.toLowerCase()));
    this.allCities = this.cities;
    this.cityLetters = [...new Set(this.cities.map(x => x.place.charAt(0).toUpperCase()))];
  }

  showOptions(buttonType: string) {
    if (buttonType === "widget") {
      this.expandWidget = !this.expandWidget;
      this.showContent = this.expandWidget ? this.expandWidget : this.showContent;
    } else {
      this.showContent = !this.showContent;
    }
  }

  // this function is just to check selected cities, uncomment console.log to check. filteredCities is not used anywhere
  showCities(event: any, e: string) {
    if (event.checked) {
      !this.filteredCities.includes(e) ? this.filteredCities.push(e) : '';
    } else {
      this.filteredCities.splice(this.filteredCities.indexOf(e), 1)
    }
    // console.log(this.filteredCities);
  }

  clearSelection() {
    this.cities.forEach(x => x.checked = false);
    this.filteredCities = [];
  }

  filterCities(e: any) {
    if (e) {
      if (typeof e === 'string') {
        if (this.previousSelected && this.options.nativeElement.querySelector(`#${this.previousSelected}`)) {
          this.options.nativeElement.querySelector(`#${this.previousSelected}`).style.backgroundColor = "";
        }
        const city = this.allCities.filter((x: any) => x.place.toLowerCase().charAt(0) === e.toLowerCase())[0];
        this.options.nativeElement.querySelector(`#${city.place.replaceAll(' ', '') + city.id}`).style.backgroundColor = "lightgray";
        this.options.nativeElement.querySelector(`#${city.place.replaceAll(' ', '') + city.id}`).scrollIntoView();
        this.previousSelected = city.place.replaceAll(' ', '') + city.id;
      } else {
        this.cities = (e && e.target.value) ? this.allCities.filter(x => x.place.toLowerCase().includes(e.target.value.toLowerCase()))
          : this.allCities;
        this.cityLetters = [...new Set(this.cities.map(x => x.place.charAt(0).toUpperCase()))];
      }
    }
  }
}
