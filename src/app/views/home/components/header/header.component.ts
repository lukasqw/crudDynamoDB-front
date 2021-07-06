import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faBook, faSearch, faCog, faSun } from '@fortawesome/free-solid-svg-icons';
import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseFormComponent implements OnInit {
  faBook = faBook;
  faSearch = faSearch;
  faCog = faCog;
  faSun = faSun;

  searchText: String = '';

  @Output() searchOnSummit: EventEmitter<String> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) {
    super()
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      searchText: '',
    })
  }

  submit() {
    this.searchOnSummit.emit(this.dataForm.value.searchText);
  }

}
