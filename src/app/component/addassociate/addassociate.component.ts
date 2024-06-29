import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { addassociate, updateassociate } from 'src/app/store/Associate/Associate.Action';
import { Associate } from 'src/app/store/Model/Associatemodel';
import { Store } from '@ngrx/store';
import { getassociate } from 'src/app/store/Associate/Associate.Selector';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.css']
})
export class AddassociateComponent implements OnInit {
  title = 'Create Associate';
  isedit = false;
  dialogdata: any;
  associateForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {
    this.associateForm = this.builder.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      type: ['CUSTOMER'],
      group: ['level1'],
      status: [true]
    });
  }

  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.store.select(getassociate).subscribe(res => {
      if (res) {
        this.associateForm.setValue({
          id: res.id,
          name: res.name,
          email: res.email,
          phone: res.phone,
          address: res.address,
          type: res.type,
          group: res.associategroup,
          status: res.status
        });
      }
    });
  }

  ClosePopup() {
    this.ref.close();
  }

  SaveAssociate() {
    if (this.associateForm.valid) {
      const _obj: Associate = {
        id: this.associateForm.value.id as number,
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as string,
        associategroup: this.associateForm.value.group as string,
        address: this.associateForm.value.address as string,
        type: this.associateForm.value.type as string,
        status: this.associateForm.value.status as boolean
      };
      if (_obj.id === 0) {
        this.store.dispatch(addassociate({ inputdata: _obj }));
      } else {
        this.store.dispatch(updateassociate({ inputdata: _obj }));
      }
      this.ClosePopup();
    }
  }
}
