import { SkeletonCard } from "@/components";
import CatalogToolbar from "@/module/CatalogToolbar";
import sx from "@/styles/module.module.scss";


export default function Loading() {
    return (
        <span>Loading...</span>
        // <div className={sx["catalog"]}>
        //     <CatalogToolbar pageTitle="Catalog" />
        //     <div className={sx["catalog-content"]}>
        //         {/* <Category data={categories} current={selectedCategory} /> */}
        //         <ul className={sx["catalog-list"]}>
        //             {
        //                 [...Array(20)].map((item, index) => (
        //                     <li key={index}>
        //                         <SkeletonCard />
        //                     </li>
        //                 ))
        //             }
        //         </ul>
        //     </div>
        // </div>
    )
}