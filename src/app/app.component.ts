import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchResult } from './interfaces/search.interface';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, InputTextModule, StyleClassModule, ButtonModule, CardModule, HttpClientModule, OverlayPanelModule, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  ngOnInit() {
    this.searchResults = this.searchResults;
    this.loading = false;
    this.advancedSearchPerformed = false;;
  }

  title = 'front';
  value: string = '';
  searchResults: SearchResult[] = [];
  isAdvancedSearch: boolean = false;
  loading: boolean = true;
  advancedSearchPerformed: boolean = false;



  constructor(private http: HttpClient) { }

  toggleSearchMode() {
    this.isAdvancedSearch = !this.isAdvancedSearch;
  }

  async fetchData() {
    try {
      const response$ = this.http.post<any[]>('http://localhost:3000/word/search', { keyword: this.value });
      const response = await firstValueFrom(response$) || [];
      this.searchResults = response;
      this.advancedSearchPerformed = false;
      console.log('Response:', this.searchResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async fetchDataAdvanced() {
    try {
      const response$ = this.http.post<any[]>('http://localhost:3000/word/search-advanced', { regex: this.value });
      const response = await firstValueFrom(response$) || [];

      const groupedResults: SearchResult[] = [];
      this.advancedSearchPerformed = true;

      response.forEach((result: any) => {
        const { title, mot, occurrences, imgUrl, author } = result;

        const existingResult = groupedResults.find(item => item.title === title);

        if (existingResult) {
          existingResult.wordOccurences.push({ mot, occurrences });
        } else {
          groupedResults.push({
            title,
            wordOccurences: [{ mot, occurrences }],
            imgUrl,
            author
          });
        }
      });

      this.searchResults = groupedResults;

      console.log('Response:', this.searchResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }




}
