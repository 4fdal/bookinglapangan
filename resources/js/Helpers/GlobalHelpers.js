export function currency(number) {
    // number = number?.replace(/[^0-9]/g, "");

    let rupiah = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(number);

    return rupiah;
}

export function classList(classNames = {}) {
    const status = Object.values(classNames);
    return Object.keys(classNames)
        .filter((_, index) => status[index])
        .join(" ");
}
