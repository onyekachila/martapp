import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryDto } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  viewType: any = 'grid';

  allCategories: CategoryDto[];
  loading: boolean;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getAllCategories();
  }

  goTo(location: string): void {
    window.location.hash = location;
  }
  switchView(type) {
    document.querySelectorAll('.views i').forEach(item => item.classList.remove('text-primary'));
    document.querySelector(`.views i[id=${type}]`).classList.add('text-primary');
    this.viewType = type;
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.allCategories = this.load(data);
        console.log(this.allCategories);
        this.loading = false;

      }
    );
  }

  load(categoryData) {
    return categoryData;
  }

}
