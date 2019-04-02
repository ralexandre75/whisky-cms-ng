import { Component, OnInit } from '@angular/core';
import { Blogpost } from '../models/blogpost';
import { Observable } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  //blogposts$: Observable<Blogpost[]>;
  allBlogposts: Blogpost[];
  errorFromServer = '';

  constructor( private blogpostService: BlogpostService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated) {
      this.router.navigate(['/auth']);
    }
    //this.blogposts$ = this.blogpostService.getBlogposts();
    this.blogpostService
        .getBlogposts()
        .subscribe(data => {
          this.refresh(data);
          this.allBlogposts = data;
        });

    this.blogpostService.handleBlogpostCreated()
        .subscribe(data => {
            console.log('AdminComponent received', data);
            this.refresh(data);
        });
        
  }

  deleteBlogposts(selectedOptions){
    //console.log("selectedOptions", selectedOptions);
    const ids = selectedOptions.map(so => so.value);
    //console.log("ids", ids);
    if(ids.length === 1) {
      this.blogpostService
            .deleteSingleBlogpost(ids[0])
            .subscribe(data => this.refresh(data), err => this.handleError(err));
    } else {
      return this.blogpostService
                    .deleteBlogposts(ids)
                    .subscribe(data => this.refresh(data), err => this.handleError(err));
    }
  }

  refresh(data) {
      console.log('data', data);
      this.blogpostService.getBlogposts().subscribe(data => {
      this.allBlogposts = data;
    })
  }

  handleError(err){
    this.errorFromServer = `Error ${err.status} - ${err.statusText}`
    console.error('Bordel une erreur', err);
  }

  logout() {
    this.authService.logout().subscribe(data => {
      console.log(data);
      this.router.navigate(['/auth'])
    }, err => console.error(err))
  }

}
