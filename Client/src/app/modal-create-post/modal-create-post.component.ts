import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import API_ENDPOINTS from 'src/app/constants/APIEndpoints';
import HTTP_OPTIONS from 'src/app/constants/HttpOptions';
import { PostCreateUpdateDTO } from '../models/post-create-update-dto.model';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-modal-create-post',
  templateUrl: './modal-create-post.component.html',
  styleUrls: ['./modal-create-post.component.css']
})
export class ModalCreatePostComponent {
  form!: FormGroup;

  createSuccessful: boolean = false;
  createFailed: boolean = false;

  constructor(public formBuilder: FormBuilder, private httpClient: HttpClient, public activeModal: NgbActiveModal, private postService: PostService) {
    this.form = this.formBuilder.group({
      title: ['Example Post Title'],
      content: ['Example Post Content'],
      published: [true]
    });
  }

  submitForm() {
    var postToCreate = {} as PostCreateUpdateDTO;

    postToCreate.title = this.form.get('title')!.value;
    postToCreate.content = this.form.get('content')!.value;
    postToCreate.published = this.form.get('published')!.value;

    this.httpClient
      .post(API_ENDPOINTS.CREATE_POST, postToCreate, HTTP_OPTIONS)
      .subscribe({
        next: (createdPostFromServer) => {
          this.createSuccessful = true;

          this.postService.allPosts.push(createdPostFromServer as Post);

          console.log('Successfully created a post! Response from server:');
          console.log(createdPostFromServer);
        },
        error: (error: HttpErrorResponse) => {
          this.createFailed = true;
          console.log(`Failed to create post! Response from server: "HTTP statuscode: ${error.status}: ${error.error}"`);
        },
      });
  }
}

