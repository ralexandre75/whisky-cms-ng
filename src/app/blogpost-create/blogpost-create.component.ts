import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BlogpostService } from '../services/blogpost.service';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent implements OnInit {

  creationForm: FormGroup;

  constructor(private fb: FormBuilder, private blogpostService: BlogpostService, private el: ElementRef) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.creationForm = this.fb.group({
      title: '',
      subtitle: '',
      content: '',
      image: ''
    });
  }

  upload(){
    //retrieve file upload Html tag
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    let fileCount: number = inputEl.files.length;
    console.log('fileCount', fileCount);
    if(fileCount > 0) {
      let formData = new FormData();
      formData.append('image', inputEl.files.item(0));
      this.blogpostService.uploadImage(formData).subscribe(data => console.log(data), error =>console.log(error));
    }
  }

  createBlogpost(formDirective: FormGroupDirective) {
    if(this.creationForm.valid){
      console.log('ok', this.creationForm.value);
      this.blogpostService
        .createBlogpost(this.creationForm.value)
        .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
    }

    
    
  }

  handleSuccess(data, formDirective) {
    console.log('OK blog post created', data);
    this.creationForm.reset();
    formDirective.resetForm();
    this.blogpostService.dispatchBlogpostCreated(data._id);
  }

  handleError(error) {
    console.error('KO blog post NOT created', error);
  }

}
