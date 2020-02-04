import { Component, OnInit } from '@angular/core';
import { ProductReportCreateModel, ProductDto } from 'src/app/shared/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/core/services/product.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-product',
  templateUrl: './report-product.component.html',
  styleUrls: ['./report-product.component.css']
})
export class ReportProductComponent implements OnInit {

  loading: boolean;
  isUserLoggedIn: boolean = this.userService.checkIfUser();
  reason = new FormControl({ value: null, disabled: this.loading || !this.isUserLoggedIn }, [Validators.required]);
  otherInfo = new FormControl({ value: null, disabled: this.loading || !this.isUserLoggedIn });
  errorMessage: string;
  product: ProductDto

  constructor(
    private productService: ProductService,
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isUserLoggedIn = this.userService.checkIfUser();
  }

  reportProduct() {
    if (!this.reason.value || (this.reason.value && this.reason.value.trim() == '')) {
      this.errorMessage = 'Please enter a reason for reporting this product';
    } else {
      this.errorMessage = undefined;
      /*const ProductReportCreateModel: ProductReportCreateModel = {
        OtherInfo: this.otherInfo.value,
        ProductGuid: this.product.ProductGuid,
        Reason: this.reason.value
      }
      this.loading = true;
      this.productService.reportProduct(ProductReportCreateModel).subscribe(
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
          this.errorMessage = error || 'An error occured';
          this.loading = false;
        }
      );*/
    }

  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
