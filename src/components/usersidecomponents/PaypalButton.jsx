import React, { useEffect, useRef } from "react";

function PaypalButton({ product, orderInfo }) {
    const paypalRef = useRef()
    let user_id = window.localStorage.getItem('user_id')

    const addCart = (data) => {
        fetch(`https://apibounwe.herokuapp.com/cart`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                window.localStorage.setItem('cartId', json.insertId)
                //console.log(orderInsert)
                window.location.href = 'http://localhost:3000/successfulorder/' + orderInsert
            }).catch((err) => {
                alert(`Error at addCart: ${err}`)
                console.log(err);
            });
    }

    const getCartItemByUserId = (user_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/cartuser/${user_id}`)
                .then(res => res.json())
                .then((json) => {
                    resolve(json)
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                });
        })
    }

    const deleteCartItemByCartId = (cart_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/cartitembycartid/${cart_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then((json) => {
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const deleteCartbyUserId = (user_id) => {
        return new Promise((resolve, reject) => {
            fetch(`https://apibounwe.herokuapp.com/cart/${user_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    let orderInsert = 0
    const createOrder = (data) => {
        return new Promise((resolve, reject) => {
            // alert(JSON.stringify(data))
            fetch(`https://apibounwe.herokuapp.com/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    console.log("json " + JSON.stringify(json));
                    //setOrderInsert(json.insertId)
                    orderInsert = json.insertId
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const createOrderItem = (data) => {
        return new Promise((resolve, reject) => {
            // alert(JSON.stringify(data))
            fetch(`https://apibounwe.herokuapp.com/orderItem`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then((json) => {
                    // console.log("json " + JSON.stringify(json));
                    return resolve(json)
                }).catch((err) => {
                    console.log(err);
                    return reject(err);
                });
        })
    }

    const getUserById = (user_id) => {
        return new Promise((resolve, reject) => {
            if (user_id === null) {
                return
            }
            fetch(`https://apibounwe.herokuapp.com/user/${user_id}`, { headers: { 'access_right': localStorage.getItem('access_right') } })
                .then(res => res.json())
                .then((json) => {
                    resolve(json)
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                });
        })
    }

    const sendEmail = (data) => {
        fetch(`https://apibounwe.herokuapp.com/sendEmail`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((json) => {
            }).catch((err) => {
                alert(`Error at sendEmail(Invoicing): ${err}`)
                console.log(err);
            });
    }

    useEffect(() => {
        getCartItemByUserId(user_id).then((jsonCartItems) => {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: product
                    });
                },
                onApprove: async (data, actions) => {
                    console.log(data)
                    await actions.order.capture()
                    let orderData = {
                        user_id: user_id,
                        invoice_id: data.orderID,
                        delivery_date: orderInfo.delivery_date.toISOString().substr(0, 10),
                        delivery_time_range: orderInfo.delivery_time_range,
                        total_amount: product[0].amount.value,
                        shipping_address: orderInfo.shipping_address + " " + orderInfo.unit,
                        postal_code: orderInfo.postal_code,
                        status: "Pending"
                    }
                    console.log(JSON.stringify(orderData))
                    createOrder(orderData)
                        .then((json) => {
                            let items = jsonCartItems
                            for (let i of items) {
                                let itemData = {
                                    order_id: json.insertId,
                                    stock_id: i.stock_id,
                                    quantity: i.quantity,
                                    item_price: (i.quantity * i.stock_price).toFixed(2)
                                }
                                createOrderItem(itemData)
                            }
                            getUserById(localStorage.getItem('user_id')).then((userResult) => {
                                sendEmail({
                                    from: 'eugenekeezl20.19@ichat.sp.edu.sg', to: userResult[0].email,
                                    subject: 'Invoice from Ninemars Enterprise', text: 'Invoice',
                                    html: `<!DOCTYPE html>
                                    <html>
                                        <head>
                                            <meta charset="utf-8" />
                                            <title>A simple, clean, and responsive HTML invoice template</title>
                                    
                                            <style>
                                                .invoice-box {
                                                    max-width: 800px;
                                                    margin: auto;
                                                    padding: 30px;
                                                    border: 1px solid #eee;
                                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                                                    font-size: 16px;
                                                    line-height: 24px;
                                                    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                                                    color: #555;
                                                }
                                    
                                                .invoice-box table {
                                                    width: 100%;
                                                    line-height: inherit;
                                                    text-align: left;
                                                }
                                    
                                                .invoice-box table td {
                                                    padding: 5px;
                                                    vertical-align: top;
                                                }
                                    
                                                .invoice-box table tr td:nth-child(2) {
                                                    text-align: right;
                                                }
                                    
                                                .invoice-box table tr.top table td {
                                                    padding-bottom: 20px;
                                                }
                                    
                                                .invoice-box table tr.top table td.title {
                                                    font-size: 45px;
                                                    line-height: 45px;
                                                    color: #333;
                                                }
                                    
                                                .invoice-box table tr.information table td {
                                                    padding-bottom: 40px;
                                                }
                                    
                                                .invoice-box table tr.heading td {
                                                    background: #eee;
                                                    border-bottom: 1px solid #ddd;
                                                    font-weight: bold;
                                                }
                                    
                                                .invoice-box table tr.details td {
                                                    padding-bottom: 20px;
                                                }
                                    
                                                .invoice-box table tr.item td {
                                                    border-bottom: 1px solid #eee;
                                                }
                                    
                                                .invoice-box table tr.item.last td {
                                                    border-bottom: none;
                                                }
                                    
                                                .invoice-box table tr.total td:nth-child(2) {
                                                    border-top: 2px solid #eee;
                                                    font-weight: bold;
                                                }
                                    
                                                @media only screen and (max-width: 600px) {
                                                    .invoice-box table tr.top table td {
                                                        width: 100%;
                                                        display: block;
                                                        text-align: center;
                                                    }
                                    
                                                    .invoice-box table tr.information table td {
                                                        width: 100%;
                                                        display: block;
                                                        text-align: center;
                                                    }
                                                }
                                            </style>
                                        </head>
                                    
                                        <body>
                                            <div class="invoice-box">
                                                <table cellpadding="0" cellspacing="0">
                                                    <tr class="top">
                                                        <td colspan="2">
                                                            <table>
                                                                <tr>
                                                                    <td class="title">
                                                                        <img src='https://res.cloudinary.com/dptmkjeww/image/upload/v1629032035/proposals/logo_ik32wp.png' style="width: 100%; max-width: 300px" />
                                                                    </td>
                                    
                                                                    <td>
                                                                        Invoice #: ${orderData.invoice_id}<br />
                                                                        Created: ${new Date().toDateString()}<br />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                    
                                                    <tr class="information">
                                                        <td colspan="2">
                                                            <table>
                                                                <tr>
                                                                    <td>
                                                                        Ninemars, Enterprise.<br />
                                                                        1 BUKIT BATOK CRESCENT, #05-20, WCEGA PLAZA<br />
                                                                        Singapore 658064
                                                                    </td>
                                    
                                                                    <td>
                                                                        Personal<br />
                                                                        ${userResult[0].first_name} ${userResult[0].last_name}<br />
                                                                        ${userResult[0].email}
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                    
                                                    <tr class="heading">
                                                        <td>Item</td>
                                    
                                                        <td>Price</td>
                                                    </tr>
                                        ${jsonCartItems.map((jsonCartItem, index) => (
                                        `<tr class=${jsonCartItems.length - index == 1 ? "item" : "item_last"} key=${index}>
                                                        <td>${jsonCartItem.product_name}</td>
                                                        <td>$${(jsonCartItem.stock_price * jsonCartItem.quantity).toFixed(2)}</td></tr>`
                                    ))} 
                                        <tr class="total">
                                                        <td></td>
                                    
                                                        <td>Total: $${Number(orderData.total_amount).toFixed(2)}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </body>
                                    </html>`
                                })
                                sendEmail({
                                    from: 'eugenekeezl20.19@ichat.sp.edu.sg', to: 'eugenekee@hotmail.sg',
                                    subject: 'A New Order Has Been Made', text: 'Invoice',
                                    html: `<!DOCTYPE html>
                                    <html>
                                        <head>
                                        </head>
                                        <body>
                                        <div>
                                            <p>${userResult[0].first_name} ${userResult[0].last_name} has made an order.</p>
                                        </div>
                                        </body>
                                    </html>`
                                })
                            })
                        })
                        .then(() => {
                            deleteCartItemByCartId(localStorage.getItem('cartId'))
                                .then(() => {
                                    deleteCartbyUserId(user_id).then(() => {
                                        addCart({ user_id: user_id })
                                    })
                                })
                        })
                },
                onError: async (data, actions) => {
                    console.log(data)
                }
            }).render(paypalRef.current)
        })

    }, [])

    return (
        <div ref={paypalRef}>
        </div>
    )
}

export default PaypalButton