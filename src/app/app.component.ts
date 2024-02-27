import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, InputTextModule, StyleClassModule, ButtonModule, CardModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'front';
  value: string = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient) {}

  async fetchData() {
    try {
      const response$ = this.http.post<any[]>('http://localhost:3000/word/search', { keyword: this.value });
      const response = await firstValueFrom(response$) || [];
      this.searchResults = response;
      console.log('Response:', this.searchResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

}
