import { ProductDto } from "./product.model";

export interface CategorySummaryResponseModel {
    Name: string;
    Id: number;
    ExtendedName: string;
    ImageFile: string;
}

export class CategoryDto {
    id: number;
    name: string;
    Description: string;
    ParentcategoryId: number;
    ExtendedName: string;
    image: string;
    IconUrl: string;
    ChildCategories: CategoryDto[];
    Products?: ProductDto[];
    ProductPageNum?: number;
}
