import{d as x,C as S,E as V,r as l,c as u,a as U,b as e,w as p,v as c,n as I,e as i,g as b,f as t,B as k,i as B,p as z,j as D,o as N,x as E,_ as M}from"./index.21b7d199.js";const P=r=>(z("data-v-25043089"),r=r(),D(),r),$={class:"form-container change-password"},j=P(()=>e("h1",null,"Change Password",-1)),A={class:"form password-change-form"},R={class:"criterion"},T=P(()=>e("span",null,"Password must have at least 8 characters, 1 uppercase, 1 digit and 1 special character",-1)),Z={class:"btn-body"},q=x({__name:"ChangePasswordView",setup(r){const g=S(),{isUpdatingPassword:w,updateUserPassword:y}=V(),s=l(""),n=l(""),d=l(""),v=/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,_=u(()=>s.value!==d.value),h=u(()=>!s.value||!n.value?!1:s.value===n.value),f=u(()=>v.test(s.value));function C(){!h.value||!f.value||!_.value||y({userId:g.user.userId,currentPassword:d.value,newPassword:s.value})}return(F,a)=>{const m=B("vue-feather");return N(),U("div",$,[j,e("form",A,[p(e("input",{type:"password","onUpdate:modelValue":a[0]||(a[0]=o=>d.value=o),placeholder:"Current Password"},null,512),[[c,d.value]]),p(e("input",{type:"password","onUpdate:modelValue":a[1]||(a[1]=o=>s.value=o),placeholder:"New Password"},null,512),[[c,s.value]]),e("div",{class:"password-criteria",style:I({display:s.value?"flex":"none"})},[e("div",R,[i(m,{type:v.test(s.value)?"check":"x",size:"20px"},null,8,["type"]),T])],4),p(e("input",{type:"password","onUpdate:modelValue":a[2]||(a[2]=o=>n.value=o),placeholder:"Confirm Password"},null,512),[[c,n.value]]),i(k,{width:"fit-content",disabled:!t(h)||!t(f)||!t(_),onClick:C},{default:b(()=>[e("div",Z,[e("span",null,E(t(w)?"Changing...":"Change Password"),1),i(m,{type:t(w)?"loader":"lock",size:"20px"},null,8,["type"])])]),_:1},8,["disabled"])])])}}});const H=M(q,[["__scopeId","data-v-25043089"]]);export{H as default};
