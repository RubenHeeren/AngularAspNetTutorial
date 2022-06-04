import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import API_ENDPOINTS from 'src/app/constants/APIEndpoints';
import HTTP_OPTIONS from 'src/app/constants/HttpOptions';
import { PostCreateUpdateDTO } from '../models/post-create-update-dto.model';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-modal-update-post',
  templateUrl: './modal-update-post.component.html',
  styleUrls: ['./modal-update-post.component.css']
})
export class ModalUpdatePostComponent implements OnInit {
  form!: FormGroup;
  postToUpdate!: Post;

  updateSuccessful: boolean = false;
  updateFailed: boolean = false;

  constructor(public fb: FormBuilder, private httpClient: HttpClient, public activeModal: NgbActiveModal, private postService: PostService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.postToUpdate.id],
      title: [this.postToUpdate.title],
      content: [this.postToUpdate.content],
      published: [this.postToUpdate.published]
    });

    this.form.controls['id'].disable();
  }

  submitForm() {
    var postToUpdateDTO = {} as PostCreateUpdateDTO;

    postToUpdateDTO.title = this.form.get('title')!.value;
    postToUpdateDTO.content = this.form.get('content')!.value;
    postToUpdateDTO.published = this.form.get('published')!.value;

    this.httpClient
      .put(`${API_ENDPOINTS.UPDATE_POST}/${this.postToUpdate.id}`, postToUpdateDTO, HTTP_OPTIONS)
      .subscribe({
        next: (response) => {
          this.updateSuccessful = true;

          let updatedPostFromServer: Post = response as Post;

          let updatedPostIndex = this.postService.allPosts.findIndex((post => post.id == updatedPostFromServer.id));

          this.postService.allPosts[updatedPostIndex].title = updatedPostFromServer.title;
          this.postService.allPosts[updatedPostIndex].content = updatedPostFromServer.content;
          this.postService.allPosts[updatedPostIndex].published = updatedPostFromServer.published;

          console.log('Successfully updated the post! Response from server:');
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          this.updateFailed = true;
          console.log(`Failed to update the post! Response from server: "HTTP statuscode: ${error.status}: ${error.error}"`);
        },
      });
  }
}
