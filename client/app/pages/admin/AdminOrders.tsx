import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";
import AdminSidebar from "./_components/AdminSidebar";
import DataTable, { createTheme } from 'react-data-table-component';

createTheme('solarized', {
    text: {
        primary: '#000000',
        secondary: '#000000',
    },
    background: {
        default: '#ffffff',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});

const AdminOrders = () => {

    const data = [{
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    }, {
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    }, {
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    }, {
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    }, {
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    }, {
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    }, {
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    }, {
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    }, {
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    }, {
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    }, {
        "orderno": "Dummy Data",
        "email": "Dummy Data",
        "date": "Dummy Data",
        "total": "Dummy Data",
        "action": "Dummy Data",
    },];

    const columns = [
        {
            name: 'Order No.',
            selector: 'orderno',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            right: true,
        }, {
            name: 'Order Date',
            selector: 'date',
            sortable: true,
            right: true,
        }, {
            name: 'Total',
            selector: 'total',
            sortable: true,
            right: true,
        }, {
            name: 'Action',
            selector: 'action',
            sortable: true,
            right: true,
        },
    ];


    return (
        <>
            <Header isFixedColor={true}></Header>
            <div className="other_pages_container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 admin_sidebar">
                            <AdminSidebar></AdminSidebar>
                        </div>
                        <div className="col-9 admin_orders">
                            <div className="row">
                                <div className="col">
                                    <div className="admin_order_heading">
                                        Orders
                                    </div>
                                </div>
                                <div className="col text-right">
                                    <input type="text" className="form-control admin_orders_search" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <DataTable
                                        title=""
                                        columns={columns}
                                        data={data}
                                        pagination={true}
                                        theme="solarized"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default withRouter(AdminOrders);
