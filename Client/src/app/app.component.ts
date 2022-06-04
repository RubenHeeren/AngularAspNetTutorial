import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import APIEndpoints from './constants/APIEndpoints';
import { ModalCreatePostComponent } from './modal-create-post/modal-create-post.component';
import { ModalDeletePostConfirmComponent } from './modal-delete-post-confirm/modal-delete-post-confirm.component';
import { ModalUpdatePostComponent } from './modal-update-post/modal-update-post.component';
import { Post } from './models/post.model';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client';

  modalOptions: NgbModalOptions = {
    size: 'lg'
  }

  constructor(private httpClient: HttpClient, public postService: PostService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.httpClient.get<Post[]>(APIEndpoints.GET_ALL_POSTS)
      .subscribe(response => {
        this.postService.allPosts = response;
        console.log(this.postService.allPosts);
      })
  }

  onClickBtnCreateNewPost() {
    this.modalService.open(ModalCreatePostComponent, this.modalOptions);
  }

  onClickBtnUpdatePost(post: Post) {
    const modalRef = this.modalService.open(ModalUpdatePostComponent, this.modalOptions);

    modalRef.componentInstance.postToUpdate = post;
  }

  onClickBtnDeletePost(post: Post) {
    const modalRef = this.modalService.open(ModalDeletePostConfirmComponent, this.modalOptions);

    modalRef.componentInstance.postToDelete = post;
  }
}
