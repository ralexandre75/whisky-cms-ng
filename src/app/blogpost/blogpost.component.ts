import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  Blogpost$: Observable<Blogpost>;

  constructor( private blogpostService: BlogpostService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Blogpost$ = this.blogpostService.getBlogpostsById(id);
  }

}
