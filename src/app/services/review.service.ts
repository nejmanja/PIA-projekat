import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  addOne(review: Review) {
    return this.http.post(`${this.uri}/reviews`, {
      ...review,
    });
  }

  getOne(jobId: string) {
    return this.http.get<Review>(`${this.uri}/reviews?jobId=${jobId}`);
  }
  updateOne(jobId: string, rating: number, review: string) {
    return this.http.patch<Review>(`${this.uri}/reviews`, { jobId, rating, review });
  }
  deleteOne(jobId: string){
    return this.http.delete(`${this.uri}/reviews?jobId=${jobId}`);
  }
}
