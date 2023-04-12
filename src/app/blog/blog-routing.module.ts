import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { DetailsPostComponent } from './details-post/details-post.component';
import { PostComponent } from './post/post.component';
import { RoleGuard } from './role.guard';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  { path: '', component: PageComponent},
  // { path: 'edit', component: TableComponent, canActivate: [RoleGuard]},
  { path: 'post/:id', pathMatch: 'full', component: DetailsPostComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }