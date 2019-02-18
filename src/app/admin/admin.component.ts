import { Component, OnInit } from '@angular/core';
import { Blogpost } from '../models/blogpost';
import { Observable } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //blogposts$: Observable<Blogpost[]>;
  allBlogposts: Blogpost[]

  constructor( private blogpostService: BlogpostService) { }

  ngOnInit() {
    //this.blogposts$ = this.blogpostService.getBlogposts();
    this.blogpostService
        .getBlogposts()
        .subscribe(data => {
          console.log(data);
          this.allBlogposts = data;
        });
        
  }

  deleteBlogposts(selectedOptions){
    //console.log("selectedOptions", selectedOptions);
    const ids = selectedOptions.map(so => so.value);
    //console.log("ids", ids);
    this.blogpostService.deleteSingleBlogpost(ids[0]).subscribe(data => console.log('data'));
  }

}
