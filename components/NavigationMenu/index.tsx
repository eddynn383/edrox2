import { NavigationMenuItem } from "../NavigationMenuItem"
import { NavigationMenuProps } from "./interface"
import navigation from "./navigation.module.css"

export const NavigationMenu = ({data, state}: NavigationMenuProps) => {

    return (
        <nav className={navigation.menu}>
            <ul className={navigation.list}>
                {
                    data?.map((item: any) => (
                        <li className={navigation["list-item"]} key={item?.id}>
                            <NavigationMenuItem path={item.path} icon={item?.icon} text={item?.title} iconsOnly={state} />
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
