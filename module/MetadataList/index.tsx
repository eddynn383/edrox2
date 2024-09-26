import { Button } from "@/components";
import { MetadataListProps } from "./interface";
import metadata from "./metadata.module.css"
import { Edit, Trash2 } from "lucide-react";

export const MetadataList = ({data, edit=false}: MetadataListProps) => {

    console.log("Metadata List Data:", data)

    return ( 
        <>
            {
                data &&
                <ul className={metadata.list}>
                    {
                        data.map((item: any) => (
                            <li className={metadata.item} key={item.id}>
                                <div className={metadata.icon}>
                                    {item.icon}
                                </div>
                                <div className={metadata.text}>
                                    <span className={metadata.key}>{item.key}</span>
                                    <span className={metadata.value}>{item.value}</span>
                                </div>
                                {
                                    edit &&
                                    <div className={metadata.actions}>
                                        <Button variant="primary" content="icon"><Edit /></Button>
                                        <Button variant="accent" status="fail" content="icon"><Trash2 /></Button>
                                    </div>
                                }
                            </li>
                        ))
                    }
                </ul>
            }
            {
                !data.length &&
                <p>Metadata are not defined</p>
            }
        </>
    );
}
