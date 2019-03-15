import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogpost';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  Blogpost$: Observable<Blogpost>;
  imagePath = environment.imagePath;

  constructor( private blogpostService: BlogpostService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.Blogpost$ = this.blogpostService.getBlogpostsById(id);
  }

}
