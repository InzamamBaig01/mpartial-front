import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "app/components/Header";

import viewicon from '../../../assets/view.svg';
const MyOrders = () => {
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
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>

                            <tr>
                                <td>0215</td>
                                <td>dummy.wmail@gmail.com</td>
                                <td>Apr 02,2020</td>
                                <td>$250</td>
                                <td className="text-center order_view_icon"><img src={viewicon} alt="" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}


export default withRouter(MyOrders);
