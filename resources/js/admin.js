import axios from 'axios'
import moment from 'moment'
import Noty from 'noty'

export function initAdmin(socket){
    const tableBody = document.querySelector("#tableBody")
    let orders = []
    let markup

    axios.get("/admin/orders",{
        headers:{"X-Requested-With":"XMLHttpRequest"}
    }).then(res=>{
        orders = res.data
        // console.log(orders[0].items);
        markup = generateMarkup(orders)
        tableBody.innerHTML = markup
    }).catch(err=>{
        console.log(err);
    })

    function renderItems(items){
        let parseItems = Object.values(items)
        return parseItems.map((menuItem)=>{
            return `<p>${menuItem.item.name} - ${menuItem.qty} Qty </p>`
        }).join('')       
    }

    function generateMarkup(orders){
        return orders.map(order=>{
            return `
            <tr>
                <td class="border px-4 py-2 text-red-600 ">
                    <p>${order._id}</p>
                    <div>${renderItems(order.items)}</div>
                </td>
                <td class="border px-4 py-2">${order.custId.name}</td>
                <td class="border px-4 py-2">${order.phone}</td>
                <td class="border px-4 py-2">${order.address}</td>
                <td class="border px-4 py-2">
                    <div class="inline-block relative w-64">
                    <form action="/admin/orders/status" method="POST">
                    <input type="hidden" name="orderId" value="${ order._id }">
                    <select name="status" onchange="this.form.submit()" class="w-full border 
                            bg-white rounded px-3 py-2 outline-none">
                        <option value="order_placed"
                            ${ order.status === 'order_placed' ? 'selected' : '' }>
                            Placed</option>
                        <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                            Confirmed</option>
                        <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                            Prepared</option>
                        <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                            Delivered
                        </option>
                        <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                            Completed
                        </option>
                    </select>
                </form>
                    </div>
                </td>
                <td class="border px-4 py-2">${moment(order.createdAt).format("hh:mm A")}</td>
            </tr>
            `      
        }).join('')       
    }

    socket.on("orderPlaced",(order)=>{
        new Noty({
            type:"success",
            timeout:1000,
            text:"New Order Received"
        }).show();
        orders.unshift(order)
        tableBody.innerHTML = generateMarkup(orders)
    })
}

// module.exports = initAdmin