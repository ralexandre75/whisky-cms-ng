import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost'

@Injectable({
  providedIn: 'root'
})

export class BlogpostService {
  baseUrl = 'http://localhost:3000/api/v1/blog-posts';

  constructor(private httpClient: HttpClient) { }

  getBlogposts(): Observable<Blogpost[]>{
    return this.httpClient.get<Blogpost[]>(`${this.baseUrl}/`);
  }

  getBlogpostsById(id): Observable<Blogpost>{
    return this.httpClient.get<Blogpost>(`${this.baseUrl}/${id}`);
  }

  deleteSingleBlogpost(id: string){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  deleteBlogposts(ids: string[]){
    const allIds = ids.join(',')
    return this.httpClient.delete(`${this.baseUrl}/?ids=${allIds}`)
  }
}

