import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";


const AdminUserManagement = () => {
    return (
        <>
            <Header isFixedColor={true}></Header>
            <div className="other_pages_container">
                <h1 className="title text-center">My Orders</h1>
                <div className="container">
                    <table className="table mpartial_table">
                        <thead>
                            <tr>
                                <th>Order No.</th>
                                <th>Email</th>
                                <th>Order Date</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
            </div>
        </>
    );
}


export default withRouter(AdminUserManagement);
