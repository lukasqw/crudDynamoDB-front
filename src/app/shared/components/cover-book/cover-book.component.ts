import { Component, Input, OnInit } from '@angular/core';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cover-book',
  templateUrl: './cover-book.component.html',
  styleUrls: ['./cover-book.component.scss']
})
export class CoverBookComponent implements OnInit {
  faFileImage = faFileImage;

  @Input() coverUrl: string = '';
  @Input() title: string = '';

  backColor = "#ADBCA9";

  constructor() { }

  ngOnInit(): void {
    this.backColor = this.getRandomColor();
  }

  getRandomColor() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 10];
    return hex;
  }
}
