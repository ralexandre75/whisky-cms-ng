import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost'

@Injectable({
  providedIn: 'root'
})

export class BlogpostService {
  baseUrl = 'http://localhost:3000/api/v1';

  constructor(private httpClient: HttpClient) { }

  getBlogposts(): Observable<Blogpost[]>{
    return this.httpClient.get<Blogpost[]>(`${this.baseUrl}/blog-posts`);
  }
}

