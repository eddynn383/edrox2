import { NavigationMenuItem } from "../NavigationMenuItem"
import { NavigationMenuProps } from "./interface"
import sx from "@/styles/component.module.scss"

export const NavigationMenu = ({data, state}: NavigationMenuProps) => {

    return (
        <nav className={sx["menu"]}>
            <ul className={sx["menu-list"]}>
                {
                    data?.map((item: any) => (
                        <li className={sx["menu-list-item"]} key={item?.id}>
                            <NavigationMenuItem path={item.path} icon={item?.icon} text={item?.title} iconsOnly={state} />
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
