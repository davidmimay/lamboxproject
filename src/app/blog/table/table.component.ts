
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlogService } from '../blog.service';
import { PostI } from '../blog.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../dialog/dialog.component';

@ViewChild(MatPaginator, { static: true })
@ViewChild(MatSort, { static: true })

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private blogService: BlogService,
    public dialog: MatDialog,
    public paginator: MatPaginator,
    public sort: MatSort,
  ) {}

  ngOnInit() {
    this.blogService
      // .getAllPosts()
      // .subscribe(posts => (this.dataSource.data = posts));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditPost(post: PostI) {
    console.log('Edit post', post);
    this.openDialog(post);
  }

  onDeletePost(post: PostI) {
    this.blogService.deletePostById(post)
  }
    
  onNewPost() {
    this.openDialog();
  }
  
  openDialog(post?: PostI): void {
    const config = {
      data: {
        comment: post ? 'Edit post' : 'New post',
        content: post
      }
    };

    const dialogRef = this.dialog.open(DialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }

}