import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import API_ENDPOINTS from 'src/app/constants/APIEndpoints';
import HTTP_OPTIONS from 'src/app/constants/HttpOptions';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-modal-delete-post-confirm',
  templateUrl: './modal-delete-post-confirm.component.html',
  styleUrls: ['./modal-delete-post-confirm.component.css']
})
export class ModalDeletePostConfirmComponent {
  postToDelete!: Post;

  deleteSuccessful: boolean = false;
  deleteFailed: boolean = false;

  constructor(private httpClient: HttpClient, public activeModal: NgbActiveModal, private postService: PostService) { }

  onClickBtnDelete() {
    this.httpClient
      .delete(`${API_ENDPOINTS.DELETE_POST}/${this.postToDelete.id}`, HTTP_OPTIONS)
      .subscribe({
        next: (response) => {
          this.deleteSuccessful = true;

          const index = this.postService.allPosts.indexOf(this.postToDelete);
          if (index > -1) {
            this.postService.allPosts.splice(index, 1); // 2nd parameter means remove one item only
          }

          console.log('Successfully deleted the post! Response from server:');
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          this.deleteFailed = true;
          console.log('Failed to delete the post! Error from server:');
          console.log(error);
        },
      });
  }
}

