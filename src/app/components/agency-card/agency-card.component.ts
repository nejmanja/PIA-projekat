import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AgencyOverview } from 'src/app/models/agency';

@Component({
  selector: 'app-agency-card',
  templateUrl: './agency-card.component.html',
  styleUrls: ['./agency-card.component.css'],
})
export class AgencyCardComponent implements OnInit {
  @Input() agency!: AgencyOverview;
  @Input() editable: boolean = false;

  @Output() deleted = new EventEmitter<string>();

  link!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.agency.desc.length > 100) {
      this.agency.desc = this.agency.desc.substring(0, 100);
      this.agency.desc = this.agency.desc.concat('...');
    }

    this.link = this.editable
      ? `/editAgency/${this.agency.username}`
      : `/agency/${this.agency.username}`;
  }

  remove() {
    this.deleted.emit(this.agency.username);
  }
}
