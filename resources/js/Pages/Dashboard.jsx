import { currency } from "@/Helpers/GlobalHelpers";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Dashboard({
    auth: { user },
    pelanggan,
    pemesanan,
    pembayaran,
    keuntungan,
    grafik_keuntungan,
}) {
    const [showGarfik, setShowGrafik] = React.useState(false);

    React.useEffect(() => {
        if (!showGarfik) {
            var optionsChartKeuntungan = {
                annotations: {
                    position: "back",
                },
                dataLabels: {
                    enabled: false,
                },
                chart: {
                    type: "bar",
                    height: 300,
                },
                fill: {
                    opacity: 1,
                },
                plotOptions: {},
                series: [
                    {
                        name: "Keuntuangan",
                        data: Object.values(grafik_keuntungan),
                    },
                ],
                colors: "#435ebe",
                xaxis: {
                    categories: Object.keys(grafik_keuntungan),
                },
            };

            var chartKeuntungan = new ApexCharts(
                document.querySelector("#chart-keuntungan"),
                optionsChartKeuntungan
            );

            chartKeuntungan.render();
            setShowGrafik(true);
        }
    }, []);

    return (
        <AuthenticatedLayout
            user={user}
            dataBreadcrumb={[{ label: "Dashboard", link: "#", active: true }]}
            header="Dashboard"
        >
            <Head title="Dashboard" />
            <div className="page-content">
                <section className="row">
                    <div className="col-12 col-lg-12">
                        <div className="row">
                            <div className="col-6 col-lg-3 col-md-6">
                                <div className="card">
                                    <div className="card-body px-4 py-4-5">
                                        <div className="row">
                                            <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                <div className="stats-icon purple mb-2">
                                                    <i className="bi bi-people" />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                <h6 className="text-muted font-semibold">
                                                    Pelanggan
                                                </h6>
                                                <h6 className="font-extrabold mb-0">
                                                    {pelanggan}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3 col-md-6">
                                <div className="card">
                                    <div className="card-body px-4 py-4-5">
                                        <div className="row">
                                            <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                <div className="stats-icon blue mb-2">
                                                    <i className="bi bi-cup-hot" />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                <h6 className="text-muted font-semibold">
                                                    Pemesanan
                                                </h6>
                                                <h6 className="font-extrabold mb-0">
                                                    {pemesanan}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3 col-md-6">
                                <div className="card">
                                    <div className="card-body px-4 py-4-5">
                                        <div className="row">
                                            <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                <div className="stats-icon green mb-2">
                                                    <i className="bi bi-cash-coin" />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                <h6 className="text-muted font-semibold">
                                                    Pembayaran
                                                </h6>
                                                <h6 className="font-extrabold mb-0">
                                                    {pembayaran}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3 col-md-6">
                                <div className="card">
                                    <div className="card-body px-4 py-4-5">
                                        <div className="row">
                                            <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                <div className="stats-icon red mb-2">
                                                    <i className="bi bi-graph-up-arrow" />
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                <h6 className="text-muted font-semibold">
                                                    Keuntungan
                                                </h6>
                                                <h6 className="font-extrabold mb-0">
                                                    {currency(keuntungan)}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Grafik Pemasukan</h4>
                                    </div>
                                    <div className="card-body">
                                        <div id="chart-keuntungan" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
