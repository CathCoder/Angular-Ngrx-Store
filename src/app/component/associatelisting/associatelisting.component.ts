import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Associate } from 'src/app/store/Model/Associatemodel';
import { getassociatelist } from 'src/app/store/Associate/Associate.Selector';
import { Store } from '@ngrx/store';
import { deleteassociate,  getassociate, loadassociate, openpopup } from 'src/app/store/Associate/Associate.Action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css']
})
export class AssociatelistingComponent implements OnInit {
  Associatelist!: Associate[];
  datasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    "code",
    "name",
    "email",
    "phone",
    "type",
    "address",
    "group",
    "status",
    "action"]
  constructor(private dialog: MatDialog, private store: Store) {

  }
  ngOnInit(): void {
    this.store.dispatch(loadassociate());
    this.store.select(getassociatelist).subscribe(item => {
      this.Associatelist = item;
      this.datasource = new MatTableDataSource<Associate>(this.Associatelist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  functionAdd() {
    this.openPopup(0, 'Create Associate');
  }
  functionEdit(code: number){
    this.store.dispatch(getassociate({id: code}))
    this.openPopup(code, 'Update Associate');
  }
  functionDelete(code: number){
    if(confirm('do you want to remove?')){
      this.store.dispatch(deleteassociate({code:code}));
    }
  }

  openPopup(code: number, title: string) {
    this.store.dispatch(openpopup());
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title,
      }
    })
  }

}
