import {Component, OnInit} from '@angular/core';
import {IPost} from '../../../../shared/models/IPost';
import firebase from 'firebase';
import firestore = firebase.firestore;
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
})
export class BlogCreateComponent implements OnInit {

  loggedInUser: string;
  text: string;
  blogPost: IPost = {body: '', createdBy: '', createdTime: undefined, type: ''};

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.loggedInUser = this.userService.loggedInUser();
  }

  onSubmit() {
    this.blogPost = {
      createdBy: this.userService.loggedInUser(),
      createdTime: firestore.Timestamp.now(),
      type: 'blog',
      body: this.blogPost.body
    };
    console.log(this.blogPost);
    this.blogPost = {body: '', createdBy: '', createdTime: undefined, type: ''};
  }

  onClear() {
    this.blogPost = {body: '', createdBy: '', createdTime: undefined, type: ''};
  }
}
