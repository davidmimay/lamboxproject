import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { where, getDocs, addDoc, onSnapshot, collection, doc, Firestore, orderBy, query } from '@angular/fire/firestore';
import { PostI } from '../blog.model';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  user: any;

  constructor(
    public roleService: RoleService,
    private readonly firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.roleService.user$.subscribe(user => this.user = user);
  }
}
