import { Component, OnInit } from '@angular/core';
import { AgencyOverview } from 'src/app/models/agency';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private agencySvc: AgencyService) {
    agencySvc.getAll().subscribe((data) => {
      this.allAgencies = data;
      this.filteredAgencies = this.allAgencies;
    });
  }

  ngOnInit(): void {}

  keyboardSearch(event, text, searchCriteria) {
    if (event.key === 'Enter') this.search(text, searchCriteria);
  }

  search(query: string, searchCriteria: string) {
    if (!query || query == '') this.filteredAgencies = this.allAgencies;
    switch(searchCriteria){
        case 'name':
            this.filteredAgencies = this.allAgencies.filter((agency) =>
              agency.agencyName.toLowerCase().includes(query.toLowerCase())
            );
            break;
        case 'adr':
            this.filteredAgencies = this.allAgencies.filter((agency) =>
                agency.street.toLowerCase().includes(query.toLowerCase())
            );
            break;
        case 'both':
            this.filteredAgencies = this.allAgencies.filter((agency) =>
                agency.street.toLowerCase().includes(query.toLowerCase()) ||
                agency.agencyName.toLowerCase().includes(query.toLowerCase())
            );
            break;

    }
  }

  sort(criteria: string) {
    switch (criteria) {
      case 'imeAsc':
        this.filteredAgencies = this.filteredAgencies.sort((a, b) =>
          a.agencyName > b.agencyName ? 1 : -1
        );
        break;
      case 'imeDesc':
        this.filteredAgencies = this.filteredAgencies.sort((a, b) =>
          a.agencyName < b.agencyName ? 1 : -1
        );
        break;
      case 'adrAsc':
        this.filteredAgencies = this.filteredAgencies.sort((a, b) =>
          a.street > b.street ? 1 : -1
        );
        break;
      case 'adrDesc':
        this.filteredAgencies = this.filteredAgencies.sort((a, b) =>
          a.street < b.street ? 1 : -1
        );
        break;
    }
  }

  filteredAgencies!: AgencyOverview[];
  allAgencies!: AgencyOverview[];
}
