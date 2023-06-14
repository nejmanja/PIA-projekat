import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;
  @Output() deleted = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  remove() {
    this.deleted.emit(this.user.username);
  }
}
