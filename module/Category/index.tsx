import { Badge } from "@/components";
import { CategoryProps, Category } from "./interface";
import sx from "@/styles/module.module.scss"

const Category = ({ data }: CategoryProps) => {
    return ( 
        <div className={sx["category-filter"]}>
            {
                data && (
                    <ul className={sx["category-filter-list"]}>
                        <li className={sx["category-filter-list-item"]}>
                            <Badge mode="outline" size="XL" shape="rounded" href="/catalog">All</Badge>
                        </li>
                        {
                            data.map((item: Category) => (
                                <li className={sx["category-filter-list-item"]} key={item.id}>
                                    <Badge mode="outline" size="XL" shape="rounded" href={`/catalog/?categoryId=${item.id}`}>{item.name}</Badge>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    );
}
 
export default Category;