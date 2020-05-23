import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/_models/project';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './addProjectDialog.component.html',
  styleUrls: ['./addProjectDialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {
  localData: any;
  action: string;

  
  projectTypeCtl: FormControl;
  projectGroup: FormGroup;
  
  constructor(public dialogRef: MatDialogRef<AddProjectDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Project,
              @Optional() @Inject(MAT_DIALOG_DATA) public actionTake: string) {
                dialogRef.disableClose = true;
                this.localData = {...data};
                console.log(this.localData)
                this.action = actionTake;
                
                
  }
  instantiateLocal() {
    this.projectTypeCtl = new FormControl('', Validators.required);
    this.projectGroup = new FormGroup({
      projecType: this.projectTypeCtl
    });
  }
  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  doAction() {
    const project = new Project(this.projectGroup.value);
    this.dialogRef.close({event: project});
  }
  ngOnInit() {
  }

}
