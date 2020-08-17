import { Component, OnInit, OnDestroy} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription} from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service'
import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  private postsSub: Subscription;
  private authStatusSubs: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener().
    subscribe((postData: {posts: Post[], postCount: number}) => {
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService.getStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
  onDelete(postId: string){
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }
}
