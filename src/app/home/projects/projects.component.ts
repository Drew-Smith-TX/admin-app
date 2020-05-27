import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from '../../_service/header.service';
import { Project } from '../../_models/project';
import { ServerService } from '../../_service/server.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogModel } from '../../_models/confirm-dialog-model';

import { ConfirmationDialogComponent } from '../../dialog-box/confirm/confirmation-dialog/confirmation-dialog.component';
import { AddProjectDialogComponent } from '../../dialog-box/addProjectDialog/addProjectDialog.component';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @ViewChild(MatPaginator)paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataSource;
  projects: Project[];
  mobile: boolean;
  result: boolean;
  tableColumns = ['id', 'project_type','companyId','description','action'];
  constructor(private head: HeaderService, 
              private service: ServerService,
              public dialog: MatDialog) {
    this.head.setNextTitle('Project Management');
   }

  ngOnInit(): void {
    this.head.setNextTitle('Project Management');
    this.getProjects();
    
    if (window.screen.width < 500) {
      this.mobile = true;
    }
  }

  getProjects() {
    this.service.getProjects()
      .subscribe((project: Project[]) => {
        this.projects = project;
        this.dataSource = new MatTableDataSource<Project>(this.projects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.projects);
       }, error => {
        console.log(error);
      });
    console.log(this.projects);
  }

  applyFilter(filterValue){
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  confirmDialog(elem) {
    const message = 'Confirm delete' + elem.name;
    const dialogData = new ConfirmDialogModel('Confirm Project Delete',
    message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(this.result)
      if (this.result === true) {
        this.onDelete(elem);
        console.log(elem);
      }
    });
   
  }
  onDelete(elem) {
    this.projects = this.projects.filter( i => i.id !== elem.companyId);
    this.service.deleteProject(elem.id).subscribe();
    this.ngOnInit();
  }
  addProjectDialog() {
    
    const dialogData = new Project();
    const dialogRef = this.dialog.open( AddProjectDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: dialogData,
      hasBackdrop: true,
      direction: 'ltr',
    });
    dialogRef.afterClosed().subscribe(pro => {
      if (pro.event){
        console.log(pro.event)
        if(pro.event.project){
          this.addProject(pro.event);
        }
      }
    })
  }
  editProjectDialog(title: string, row: Element){

  }
  addProject(project) {
    this.service.addProject(project).subscribe(
      (project: Project) => {
        console.log(project);
      }, (error: any) => {
        console.log(error);
      }
    );
    this.ngOnInit();
  }

}
