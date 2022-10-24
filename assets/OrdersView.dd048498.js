import{d as y,C as m,s as S,o as s,a as d,b as e,f as a,x as r,z as b,F as f,y as I,e as h,g as x,B as w,i as g,p as C,j as O,_ as k,D as A,A as B}from"./index.7ed74f79.js";const _=t=>(C("data-v-c2659f33"),t=t(),O(),t),V={class:"order-container"},T={class:"headers"},D={key:0,class:"header user"},U=_(()=>e("h4",null,"User",-1)),N={class:"header order-id"},F=_(()=>e("h4",null,"Order ID",-1)),q={class:"header date"},z=_(()=>e("h4",null,"Order Date",-1)),E={class:"header total"},G=_(()=>e("h4",null,"Order Total",-1)),L={class:"order-info"},P={class:"order-image"},j=["src","alt"],R={class:"order-details"},H={class:"btn-body add-cart-btn"},J=y({__name:"OrderComponent",props:{order:null},setup(t){const n=t,l="https://apple-shop-backend.herokuapp.com",i=m(),{add:v,isAddingToCart:u}=S();function p(c){v({productId:c,quantity:1})}return(c,ee)=>{const $=g("vue-feather");return s(),d("div",V,[e("div",T,[a(i).user.role==="administrator"?(s(),d("div",D,[U,e("p",null,r(n.order.user),1)])):b("",!0),e("div",N,[F,e("p",null,r(n.order.id),1)]),e("div",q,[z,e("p",null,r(n.order.dateCreated),1)]),e("div",E,[G,e("p",null,r(n.order.OrderTotal),1)])]),e("div",L,[(s(!0),d(f,null,I(n.order.items,o=>(s(),d("div",{class:"order-item",key:o.productId},[e("div",P,[e("img",{src:`${a(l)}/${o.productImage}`,alt:o.product},null,8,j)]),e("div",R,[e("h4",null,r(o.product),1),e("p",null,r(`$${o.unitPrice}.00 x ${o.quantity}`),1),e("p",null,r(`Subtotal: ${new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(o.total)}`),1)]),h(w,{theme:"primary",onClick:()=>p(o.productId)},{default:x(()=>[e("div",H,[e("span",null,r(a(u)?"Adding...":"Buy Again"),1),h($,{type:a(u)?"loader":"shopping-cart",size:"20px"},null,8,["type"])])]),_:2},1032,["onClick"])]))),128))])])}}});const K=k(J,[["__scopeId","data-v-c2659f33"]]),M=t=>(C("data-v-e4498b5c"),t=t(),O(),t),Q={class:"orders-container"},W=M(()=>e("h2",null,"Orders",-1)),X={key:0},Y={key:1,class:"orders"},Z=y({__name:"OrdersView",setup(t){const n=m(),{orders:l,isGettingOrders:i}=A(n.user.role);return(v,u)=>{const p=g("vue-feather");return s(),d("div",Q,[W,a(i)?(s(),d("div",X,[h(p,{type:"loader"})])):(s(),d("div",Y,[(s(!0),d(f,null,I(a(l),c=>(s(),B(K,{key:c.id,order:c},null,8,["order"]))),128))]))])}}});const se=k(Z,[["__scopeId","data-v-e4498b5c"]]);export{se as default};
