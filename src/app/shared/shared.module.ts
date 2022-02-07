import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ShellComponent } from './shell/shell.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { FlipCardModule } from './flip-card/flip-card.module';

// material
import {MatExpansionModule} from '@angular/material/expansion';


// new
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
// new modules
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ColorPickerModule} from 'ngx-color-picker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard'
// import { NgxEditorModule } from 'ngx-editor';
import {MatProgressBarModule} from '@angular/material/progress-bar';


const components = [
  ShellComponent, DeleteButtonComponent
];

const modules = [
  CommonModule,
  RouterModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  MatAutocompleteModule,
  DragDropModule,
  MatProgressSpinnerModule,
  HttpClientModule,
  YouTubePlayerModule,
  NgxMaterialTimepickerModule,
  ColorPickerModule,
  MatPaginatorModule,
  MatTableModule,
  MatSelectModule,
  MatChipsModule,
  MatDividerModule,
  MatDialogModule,
  MatSortModule,
  MatCheckboxModule,
  MatGridListModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  ClipboardModule,
  // NgxEditorModule,
  MatProgressBarModule,
  FlipCardModule,
  MatExpansionModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules,
  ],
  exports: [
    ...components,
    ...modules
  ],
})
export class SharedModule {}