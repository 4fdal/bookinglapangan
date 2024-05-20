import { classList } from "@/Helpers/GlobalHelpers";
import { Link } from "@inertiajs/react";

export default function Breadcrumb({ data }) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb my-2">
                {data.map((item, index) => (
                    <li
                        className={classList({
                            "breadcrumb-item": true,
                            active: item.active ?? false,
                        })}
                        key={"breadcrumb-index-" + index}
                    >
                        {!item.active ? (
                            <Link href={item.link ?? "#"}>{item.label}</Link>
                        ) : (
                            item.label
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
