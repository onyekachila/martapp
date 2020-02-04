import { Component, OnInit } from '@angular/core';
import { StoreReportCreateModel, VendorDto } from 'src/app/shared/models/store.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { StoreService } from 'src/app/core/services/store.service';
import { FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-report-store',
  templateUrl: './report-store.component.html',
  styleUrls: ['./report-store.component.css']
})
export class ReportStoreComponent implements OnInit {

  loading: boolean;
  isUserLoggedIn: boolean = this.userService.checkIfUser();
  reason = new FormControl({ value: null, disabled: this.loading || !this.isUserLoggedIn }, [Validators.required]);
  otherInfo = new FormControl({ value: null, disabled: this.loading || !this.isUserLoggedIn });
  errorMessage: string;
  store: VendorDto;
  constructor(
    private storeService: StoreService,
    private userService: UserService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  reportStore() {
    const StoreReportCreateModel: StoreReportCreateModel = {
      OtherInfo: this.otherInfo.value,
      StoreGuid: this.store.StoreGuid,
      Reason: this.reason.value
    }
    this.loading = true;
   /* this.storeService.reportStore(StoreReportCreateModel).subscribe(
      data => {
        this.loading = false;
        this.toastr.success('Report Submited Successful!', "", {
          positionClass: "toast-bottom-center",
          tapToDismiss: true,
          timeOut: 10000,
          progressBar: true
        });
        this.closeModal();
      }, error => {
        this.loading = false;
        this.errorMessage = error;
      }
    );*/
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
