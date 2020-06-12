(this["webpackJsonp2020-06-03_template_material-ui_task-manager"]=this["webpackJsonp2020-06-03_template_material-ui_task-manager"]||[]).push([[0],{163:function(e,t,n){e.exports=n(214)},168:function(e,t,n){},169:function(e,t,n){},214:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"authAPI",(function(){return p})),n.d(a,"usersAPI",(function(){return f})),n.d(a,"projectsAPI",(function(){return h})),n.d(a,"tasksAPI",(function(){return E}));var r=n(0),c=n.n(r),i=n(12),s=n.n(i),l=(n(168),n(18)),o=n(24),u=(n(169),n(125)),d=function(e,t){return t?t.map((function(t){return"".concat(e,"=").concat(t,"&")})).toString().replace(/,/g,""):""},m=n.n(u).a.create({withCredentials:!0,baseURL:"https://my-json-server.typicode.com/genekomarov/task-manager_mui",headers:{}}),p={auth:function(e,t){return m.get("/authData?email=".concat(e,"&password=").concat(t)).then((function(e){return e.data}))}},f={getUsersByIds:function(e){return e.length?m.get("/users?".concat(d("id",e))).then((function(e){return e.data})):[]},getUserIdsByProjectIds:function(e){return e.length?m.get("/projects-to-users?".concat(d("projectId",e))).then((function(e){return e.data})):[]},addNewUser:function(){return console.error("method 'addNewUser' is not implemented")},changeUser:function(){return console.error("method 'changeUser' is not implemented")},deleteUser:function(){return console.error("method 'deleteUser' is not implemented")}},h={getProjectsByIds:function(e){return e.length?m.get("/projects?".concat(d("id",e))).then((function(e){return e.data})):[]},getProjectIdsByUserIds:function(e){return e.length?m.get("/projects-to-users?".concat(d("userId",e))).then((function(e){return e.data})):[]},addNewProject:function(){return console.error("method 'addNewProject' is not implemented")},changeProject:function(){return console.error("method 'changeProject' is not implemented")},deleteProject:function(){return console.error("method 'deleteProject' is not implemented")}},E={getTasksByProjectOrUserIds:function(e,t){return e||t?m.get("/tasks?".concat(d("project",e)).concat(d("author",t))).then((function(e){return e.data})):[]},addNewTask:function(e){return m.post("/tasks",e).then((function(e){return e.data}))},changeTask:function(e,t,n){return m.patch("/tasks/".concat(e),{title:t,isDone:n}).then((function(e){return e.data}))},deleteTask:function(e){return m.delete("/tasks/".concat(e)).then((function(e){return e.data}))}},g=n(49),b=n(126),j=n(60),O=n(7),I={clientSideData:{users:{items:[],deleted:[]},authData:{items:[],deleted:[]},projectsToUsers:{items:[],deleted:[]},projects:{items:[],deleted:[]},tasks:{items:[],deleted:[]}}},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_ID_TO_DELETED":return Object(O.a)(Object(O.a)({},e),{},{clientSideData:Object(O.a)(Object(O.a)({},e.clientSideData),{},Object(o.a)({},t.tableName,Object(O.a)(Object(O.a)({},e.clientSideData[t.tableName]),{},{deleted:[].concat(Object(j.a)(e.clientSideData[t.tableName].deleted),[t.itemId])})))});case"ADD_NEW_ITEM":return Object(O.a)(Object(O.a)({},e),{},{clientSideData:Object(O.a)(Object(O.a)({},e.clientSideData),{},Object(o.a)({},t.tableName,Object(O.a)(Object(O.a)({},e.clientSideData[t.tableName]),{},{items:[].concat(Object(j.a)(e.clientSideData[t.tableName].items),[t.item])})))});case"DELETE_ITEM":return Object(O.a)(Object(O.a)({},e),{},{clientSideData:Object(O.a)(Object(O.a)({},e.clientSideData),{},Object(o.a)({},t.tableName,Object(O.a)(Object(O.a)({},e.clientSideData[t.tableName]),{},{items:Object(j.a)(e.clientSideData[t.tableName].items).filter((function(e){return e.id!==t.itemId}))})))});default:return e}},k=n(11),y=n.n(k),w=n(17),S=n(127),P=function e(){Object(S.a)(this,e),this.message=void 0,this.message="\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f \u043d\u0435 \u0443\u0434\u0430\u043b\u0430\u0441\u044c"},T={id:null,email:null,nickname:null,isAuth:!1},N=function(e,t,n,a){return{type:"auth/SET_USER_DATA",id:e,email:t,nickname:n,isAuth:a}},x=function(e,t){return function(){var n=Object(w.a)(y.a.mark((function n(a){var r,c;return y.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,p.auth(e,t);case 3:if(0!==(r=n.sent).length){n.next=6;break}throw new P;case 6:return n.next=8,f.getUsersByIds([r[0].id]);case 8:if(c=n.sent,0!==r.length){n.next=11;break}throw new P;case 11:a(N(r[0].id,r[0].email,c[0].nickname,!0)),n.next=17;break;case 14:n.prev=14,n.t0=n.catch(0),alert(n.t0.message);case 17:case"end":return n.stop()}}),n,null,[[0,14]])})));return function(e){return n.apply(this,arguments)}}()},_=function(){return function(){var e=Object(w.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t(N(null,null,null,!1));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"auth/SET_USER_DATA":return Object(O.a)(Object(O.a)({},e),{},{id:t.id,email:t.email,nickname:t.nickname,isAuth:t.isAuth});default:return e}},F={projects:[],isFetching:!1,selectedProjectId:null},U=function(e){return{type:"projects/SET_PROJECTS",projects:e,selectedProjectId:e.length>0?e[0].id:null}},C=function(e){return{type:"projects/SET_FETCHING",isFetching:e}},A=function(e){return{type:"projects/SET_SELECTED_PROJECT_ID",selectedProjectId:e}},z=function(e){return function(){var t=Object(w.a)(y.a.mark((function t(n){var a,r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h.getProjectIdsByUserIds(e);case 3:return a=t.sent,t.next=6,h.getProjectsByIds(a.map((function(e){return e.projectId})));case 6:r=t.sent,n(U(r)),n(C(!1)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),alert(t.t0.message);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"projects/SET_PROJECTS":return Object(O.a)(Object(O.a)({},e),{},{projects:t.projects,selectedProjectId:t.selectedProjectId});case"projects/SET_FETCHING":return Object(O.a)(Object(O.a)({},e),{},{isFetching:t.isFetching});case"projects/SET_SELECTED_PROJECT_ID":return Object(O.a)(Object(O.a)({},e),{},{selectedProjectId:t.selectedProjectId});default:return e}},B={users:[],isFetching:!1,selectedUserId:null},L=function(e){return{type:"users/SET_USERS",users:e}},W=function(e){return{type:"users/SET_FETCHING",isFetching:e}},G=function(e){return{type:"users/SET_SELECTED_USER_ID",selectedUserId:e}},M=function(e){return function(){var t=Object(w.a)(y.a.mark((function t(n){var a,r;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n(W(!0)),t.next=4,f.getUserIdsByProjectIds(e);case 4:return a=t.sent,t.next=7,f.getUsersByIds(a.map((function(e){return e.userId})));case 7:r=t.sent,n(L(r)),n(W(!1)),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),alert(t.t0.message);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e){return t.apply(this,arguments)}}()},H=function(e){return function(){var t=Object(w.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n(G(e));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"users/SET_USERS":return Object(O.a)(Object(O.a)({},e),{},{users:t.users});case"users/SET_FETCHING":return Object(O.a)(Object(O.a)({},e),{},{isFetching:t.isFetching});case"users/SET_SELECTED_USER_ID":return Object(O.a)(Object(O.a)({},e),{},{selectedUserId:t.selectedUserId});default:return e}},Z={tasks:[],isFetching:!1},V=function(e){return{type:"tasks/SET_TASKS",tasks:e}},K=function(e){return{type:"tasks/SET_FETCHING",isFetching:e}},X=function(e,t,n){return function(){var a=Object(w.a)(y.a.mark((function a(r){var c;return y.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,E.getTasksByProjectOrUserIds(e,t);case 3:c=a.sent,n&&(null!==n.status&&(c=c.filter((function(e){return e.isDone===n.status}))),""!==n.content&&(c=c.filter((function(e){return!!e.title.match(new RegExp(n.content,"g"))})))),r(V(c)),r(K(!1)),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(0),alert(a.t0.message);case 12:case"end":return a.stop()}}),a,null,[[0,9]])})));return function(e){return a.apply(this,arguments)}}()},$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"tasks/SET_TASKS":return Object(O.a)(Object(O.a)({},e),{},{tasks:t.tasks});case"tasks/SET_FETCHING":return Object(O.a)(Object(O.a)({},e),{},{isFetching:t.isFetching});default:return e}},q={isInitialized:!1,initializationInProgress:!1},Q=function(e){return{type:"app/SET_INITIALIZED",isInitialized:e}},Y=function(e){return{type:"app/SET_INITIALIZATION_IN_PROGRESS",inProgress:e}},ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"app/SET_INITIALIZED":return Object(O.a)(Object(O.a)({},e),{},{isInitialized:t.isInitialized});case"app/SET_INITIALIZATION_IN_PROGRESS":return Object(O.a)(Object(O.a)({},e),{},{initializationInProgress:t.inProgress});default:return e}},te=Object(g.c)({api:v,auth:D,projects:R,users:J,tasks:$,app:ee}),ne=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||g.d,ae=Object(g.e)(te,ne(Object(g.a)(b.a))),re=1e3,ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re;return e!==re&&(re=e),re++},ie=n(251),se=n(253),le=n(15),oe=n(271),ue=n(270),de=n(267),me=n(280),pe=n(274),fe=n(262),he=n(272),Ee=n(145),ge=n.n(Ee),be=n(259),je=n(258),Oe=n(94),Ie=n.n(Oe),ve=n(217),ke=n(254),ye=n(255),we=n(257),Se=n(54),Pe=n.n(Se),Te=n(55),Ne=n.n(Te),xe=n(132),_e=n.n(xe),De=n(134),Fe=n.n(De),Ue=n(256),Ce=n(35),Ae=n(133),ze=n.n(Ae),Re=Object(ie.a)((function(e){return Object(se.a)({root:{display:"flex",flexDirection:"column"},progress:{alignSelf:"center",margin:e.spacing(2)},nested:{paddingLeft:e.spacing(4)}})})),Be={getProjects:z,setFetching:function(e){return function(){var t=Object(w.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n(C(e));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},setProjects:function(e){return function(){var t=Object(w.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n(U(e));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},setSelectedProjectId:function(e){return function(){var t=Object(w.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n(A(e));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},setSelectedUserId:H},Le=Object(Ce.b)((function(e){return{isFetching:e.projects.isFetching,isAuth:e.auth.isAuth,projects:e.projects.projects,myId:e.auth.id,selectedProjectId:e.projects.selectedProjectId,initializationInProgress:e.app.initializationInProgress,isInitialized:e.app.isInitialized}}),Be)((function(e){Object(r.useEffect)((function(){e.initializationInProgress&&e.setFetching(!0)}),[e.initializationInProgress,e.isAuth]),Object(r.useEffect)((function(){null!==e.myId?e.getProjects([e.myId]):e.setProjects([])}),[e.myId]);var t=Re(),n=c.a.useState(!0),a=Object(l.a)(n,2),i=a[0],s=a[1];return c.a.createElement("div",{className:t.root},c.a.createElement(ve.a,{button:!0,onClick:function(){s(!i)}},c.a.createElement(ke.a,null,c.a.createElement(_e.a,null)),c.a.createElement(ye.a,{primary:"\u041f\u0440\u043e\u0435\u043a\u0442\u044b",primaryTypographyProps:{variant:"body1"}}),i?c.a.createElement(Pe.a,null):c.a.createElement(Ne.a,null)),e.isFetching&&e.isAuth?c.a.createElement(Ue.a,{className:t.progress}):c.a.createElement(we.a,{in:i,timeout:"auto",unmountOnExit:!0},e.isAuth&&e.projects.map((function(n){return c.a.createElement(je.a,{component:"div",disablePadding:!0,key:n.id},c.a.createElement(ve.a,{button:!0,className:t.nested,onClick:function(){return t=n.id,e.setSelectedProjectId(t),void e.setSelectedUserId(null);var t}},c.a.createElement(ke.a,null,n.id===e.selectedProjectId?c.a.createElement(ze.a,null):c.a.createElement(Fe.a,null)),c.a.createElement(ye.a,{primary:n.projectName})))}))))})),We=n(135),Ge=n.n(We),Me=n(80),He=n.n(Me),Je=n(137),Ze=n.n(Je),Ve=n(136),Ke=n.n(Ve),Xe=Object(ie.a)((function(e){return Object(se.a)({root:{display:"flex",flexDirection:"column"},progress:{alignSelf:"center",margin:e.spacing(2)},nested:{paddingLeft:e.spacing(4)}})})),$e={setFetching:function(e){return function(){var t=Object(w.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n(W(e));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},getUsers:M,setSelectedUserId:H},qe=Object(Ce.b)((function(e){return{isFetching:e.users.isFetching,isAuth:e.auth.isAuth,projectsIsFetching:e.projects.isFetching,selectedProjectId:e.projects.selectedProjectId,users:e.users.users,selectedUserId:e.users.selectedUserId,tasks:e.tasks.tasks}}),$e)((function(e){Object(r.useEffect)((function(){e.projectsIsFetching&&e.setFetching(!0)}),[e.projectsIsFetching]),Object(r.useEffect)((function(){null!==e.selectedProjectId&&e.getUsers([e.selectedProjectId])}),[e.selectedProjectId]);var t=Xe(),n=c.a.useState(!0),a=Object(l.a)(n,2),i=a[0],s=a[1];return c.a.createElement("div",{className:t.root},c.a.createElement(ve.a,{button:!0,onClick:function(){s(!i)}},c.a.createElement(ke.a,null,c.a.createElement(Ge.a,null)),c.a.createElement(ye.a,{primary:"\u041a\u043e\u043c\u0430\u043d\u0434\u0430",primaryTypographyProps:{variant:"body1"}}),i?c.a.createElement(Pe.a,null):c.a.createElement(Ne.a,null)),e.isFetching&&e.isAuth?c.a.createElement(He.a,{className:t.progress}):c.a.createElement(we.a,{in:i,timeout:"auto",unmountOnExit:!0},e.isAuth&&e.users.map((function(n){return c.a.createElement(je.a,{component:"div",disablePadding:!0,key:n.id},c.a.createElement(ve.a,{button:!0,className:t.nested,onClick:function(){return t=n.id,void e.setSelectedUserId(t);var t}},c.a.createElement(ke.a,null,n.id===e.selectedUserId?c.a.createElement(Ke.a,null):c.a.createElement(Ze.a,null)),c.a.createElement(ye.a,{primary:"".concat(n.nickname," (").concat(e.tasks.filter((function(e){return n.id===e.author})).length,")")})))}))))})),Qe=Object(ie.a)((function(e){return Object(se.a)({root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper},verticalSpacing:{display:"flex",alignItems:"center",padding:e.spacing(2,1),justifyContent:"flex-end"}})})),Ye=function(){var e=Qe();return c.a.createElement(je.a,{component:"nav","aria-labelledby":"nested-list-subheader",subheader:c.a.createElement(be.a,{component:"div",id:"nested-list-subheader"},"\u041c\u0435\u043d\u044e"),className:e.root},c.a.createElement(Ie.a,null),c.a.createElement(Le,null),c.a.createElement("div",{className:e.verticalSpacing}),c.a.createElement(qe,null),c.a.createElement(Ie.a,null))},et=n(68),tt=n(261),nt=n(146),at=n(95),rt=n.n(at),ct=n(138),it=n.n(ct),st=Object(ie.a)((function(e){return Object(se.a)({grow:{flexGrow:1},title:Object(o.a)({display:"none"},e.breakpoints.up("sm"),{display:"block"}),sectionDesktop:Object(o.a)({display:"none"},e.breakpoints.up("md"),{display:"flex"}),sectionMobile:Object(o.a)({display:"flex"},e.breakpoints.up("md"),{display:"none"})})})),lt=function(){var e=st(),t=c.a.useState(null),n=Object(l.a)(t,2),a=n[0],r=n[1],i=c.a.useState(null),s=Object(l.a)(i,2),o=s[0],u=s[1],d=Boolean(a),m=Boolean(o),p=function(e){r(e.currentTarget)},f=function(){u(null)},h=function(){r(null),f()},E="primary-search-account-menu",g=c.a.createElement(nt.a,{anchorEl:a,anchorOrigin:{vertical:"top",horizontal:"right"},id:E,keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:d,onClose:h},c.a.createElement(tt.a,{onClick:h},"\u0412\u044b\u0439\u0442\u0438")),b=c.a.createElement(nt.a,{anchorEl:o,anchorOrigin:{vertical:"top",horizontal:"right"},id:"primary-search-account-menu-mobile",keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:m,onClose:f},c.a.createElement(tt.a,{onClick:p},c.a.createElement(fe.a,{"aria-label":"account of current user","aria-controls":"primary-search-account-menu","aria-haspopup":"true",color:"inherit"},c.a.createElement(rt.a,null)),c.a.createElement("p",null,"Profile")));return c.a.createElement(c.a.Fragment,null,c.a.createElement(et.a,{className:e.title,variant:"h6",noWrap:!0},"\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440 \u0437\u0430\u0434\u0430\u0447"),c.a.createElement("div",{className:e.grow}),c.a.createElement("div",{className:e.sectionDesktop},c.a.createElement(fe.a,{edge:"end","aria-label":"account of current user","aria-controls":E,"aria-haspopup":"true",onClick:p,color:"inherit"},c.a.createElement(rt.a,null))),c.a.createElement("div",{className:e.sectionMobile},c.a.createElement(fe.a,{"aria-label":"show more","aria-controls":"primary-search-account-menu-mobile","aria-haspopup":"true",onClick:function(e){u(e.currentTarget)},color:"inherit"},c.a.createElement(it.a,null))),b,g)},ot=n(143),ut=n.n(ot),dt=n(268),mt=n(142),pt=n.n(mt),ft=n(263),ht=n(275),Et=n(266),gt=n(139),bt=n.n(gt),jt=Object(ie.a)((function(e){return Object(se.a)({formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}})})),Ot=function(){var e=jt(),t=c.a.useState(""),n=Object(l.a)(t,2),a=n[0],r=n[1];return c.a.createElement("div",null,c.a.createElement(ft.a,{className:e.formControl},c.a.createElement(ht.a,{value:a,onChange:function(e){r(e.target.value)},displayEmpty:!0,className:e.selectEmpty,inputProps:{"aria-label":"Without label"},startAdornment:c.a.createElement(Et.a,{position:"start"},c.a.createElement(bt.a,null))},c.a.createElement(tt.a,{value:""},c.a.createElement("em",null,"\u0421\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u043a\u0430")),c.a.createElement(de.a,null),c.a.createElement(tt.a,{value:"NEW_FIRST"},"\u041e\u0442 \u043d\u043e\u0432\u044b\u0445 \u043a \u0441\u0442\u0430\u0440\u044b\u043c"),c.a.createElement(tt.a,{value:"OLD_FIRST"},"\u041e\u0442 \u0441\u0442\u0430\u0440\u044b\u0445 \u043a \u043d\u043e\u0432\u044b\u043c"),c.a.createElement(de.a,null),c.a.createElement(tt.a,{value:"OPEN_FIRST"},"\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u043d\u0435\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u044b\u0435"),c.a.createElement(tt.a,{value:"CLOSE_FIRST"},"\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u044b\u0435"))))},It=n(140),vt=n.n(It),kt=Object(ie.a)((function(e){return Object(se.a)({formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}})})),yt=function(){var e=kt(),t=c.a.useState(""),n=Object(l.a)(t,2),a=n[0],r=n[1];return c.a.createElement("div",null,c.a.createElement(ft.a,{className:e.formControl},c.a.createElement(ht.a,{value:a,onChange:function(e){r(e.target.value)},displayEmpty:!0,className:e.selectEmpty,inputProps:{"aria-label":"Without label"},startAdornment:c.a.createElement(Et.a,{position:"start"},c.a.createElement(vt.a,null))},c.a.createElement(tt.a,{value:""},c.a.createElement("em",null,"\u041f\u043e \u0441\u0442\u0430\u0442\u0443\u0441\u0443")),c.a.createElement(tt.a,{value:"OPEN"},"\u041d\u0435\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u044b\u0435"),c.a.createElement(tt.a,{value:"CLOSE"},"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u044b\u0435"))))},wt=n(273),St=n(278),Pt=Object(ie.a)((function(e){return Object(se.a)({root:{width:"100%","& > * + *":{marginTop:e.spacing(3)}}})})),Tt=[{id:0,nickname:"test-user"},{id:1,nickname:"mom"},{id:2,nickname:"dad"},{id:3,nickname:"wife"},{id:4,nickname:"son"},{id:5,nickname:"daughter"},{id:6,nickname:"colleague-1"},{id:7,nickname:"colleague-2"},{id:8,nickname:"boss"},{id:9,nickname:"teacher"}],Nt=function(){var e=Pt();return c.a.createElement("div",{className:e.root},c.a.createElement(wt.a,{disableClearable:!0,multiple:!0,id:"tags-outlined",options:Tt,getOptionLabel:function(e){return e.nickname},defaultValue:[Tt[0]],filterSelectedOptions:!0,renderInput:function(e){return c.a.createElement(St.a,Object.assign({},e,{variant:"standard",label:"",placeholder:"\u0410\u0432\u0442\u043e\u0440\u044b"}))}}))},xt=Object(ie.a)((function(e){return Object(se.a)({root:{"& > *":{margin:e.spacing(1,0)}}})})),_t=function(){var e=xt();return c.a.createElement("form",{style:{width:"100%"},className:e.root,noValidate:!0,autoComplete:"off"},c.a.createElement(St.a,{id:"standard-basic",label:"\u0418\u0441\u043a\u0430\u0442\u044c \u043f\u043e \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u043c\u0443: ",fullWidth:!0}))},Dt=Object(ie.a)((function(e){return Object(se.a)({root:{flexGrow:1}})})),Ft=function(){var e=Dt(),t=function(e){return c.a.createElement(ve.a,null,e.children,c.a.createElement(dt.a,null,c.a.createElement(fe.a,{edge:"end","aria-label":"delete"},c.a.createElement(pt.a,null))))};return c.a.createElement("div",{className:e.root},c.a.createElement(je.a,{disablePadding:!0},c.a.createElement(t,null,c.a.createElement(Ot,null),c.a.createElement(yt,null)),c.a.createElement(t,null,c.a.createElement(Nt,null)),c.a.createElement(t,null,c.a.createElement(_t,null))))},Ut=(Object(ie.a)((function(e){return Object(se.a)({})})),function(){var e=c.a.useState(!1),t=Object(l.a)(e,2),n=t[0],a=t[1];return c.a.createElement(c.a.Fragment,null,c.a.createElement(ve.a,{button:!0,onClick:function(){a(!n)}},c.a.createElement(ke.a,null,c.a.createElement(ut.a,null)),c.a.createElement(ye.a,{primary:"\u041f\u043e\u0438\u0441\u043a \u0437\u0430\u0434\u0430\u0447",primaryTypographyProps:{variant:"body1"}}),n?c.a.createElement(Pe.a,null):c.a.createElement(Ne.a,null)),c.a.createElement(we.a,{in:n,timeout:"auto",unmountOnExit:!0},c.a.createElement(je.a,{component:"div",disablePadding:!0},c.a.createElement(Ft,null))))}),Ct=n(276),At=n(269),zt=n(144),Rt=n.n(zt),Bt=Object(ie.a)((function(e){return Object(se.a)({root:{width:"100%",maxWidth:600,backgroundColor:e.palette.background.paper,display:"flex",flexDirection:"column"},progress:{alignSelf:"center",margin:e.spacing(2)}})})),Lt={setFetching:function(e){return function(){var t=Object(w.a)(y.a.mark((function t(n){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n(K(e));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},getTasks:X},Wt=Object(Ce.b)((function(e){return{isFetching:e.tasks.isFetching,isAuth:e.auth.isAuth,usersIsFetching:e.users.isFetching,selectedUserId:e.users.selectedUserId,selectedProjectId:e.projects.selectedProjectId,tasks:e.tasks.tasks,users:e.users.users,myId:e.auth.id}}),Lt)((function(e){Object(r.useEffect)((function(){e.usersIsFetching&&e.setFetching(!0)}),[e.usersIsFetching]),Object(r.useEffect)((function(){null!==e.selectedUserId&&null!==e.selectedProjectId?e.getTasks([e.selectedProjectId],[e.selectedUserId]):null!==e.selectedProjectId&&e.getTasks([e.selectedProjectId],[],{status:null,content:""})}),[e.selectedUserId,e.selectedProjectId]);var t=Bt(),n=c.a.useState([0]),a=Object(l.a)(n,2),i=a[0],s=a[1],o=function(t,n){var a=e.users.filter((function(e){return e.id===n.author}));return a.length>0&&a[0].nickname};return c.a.createElement(At.a,{maxWidth:"sm"},c.a.createElement(je.a,{className:t.root},e.isFetching&&e.isAuth?c.a.createElement(He.a,{className:t.progress,size:50}):e.isAuth&&e.tasks.map((function(t){var n,a="checkbox-list-label-".concat(t.id);return c.a.createElement(ve.a,{key:t.id,role:void 0,button:!0,onClick:(n=t.id,function(){var e=i.indexOf(n),t=Object(j.a)(i);-1===e?t.push(n):t.splice(e,1),s(t)})},c.a.createElement(ke.a,null,c.a.createElement(Ct.a,{edge:"start",checked:t.isDone,tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":a}})),c.a.createElement(ye.a,{id:a,primary:t.title,secondary:o(e.users,t)}),t.author===e.myId&&c.a.createElement(dt.a,null,c.a.createElement(fe.a,{edge:"end","aria-label":"comments"},c.a.createElement(Rt.a,null))))}))))})),Gt=n(279),Mt=Object(ie.a)((function(e){return Object(se.a)({root:{display:"flex"},drawer:Object(o.a)({},e.breakpoints.up("sm"),{width:240,flexShrink:0}),appBar:Object(o.a)({},e.breakpoints.up("sm"),{width:"calc(100% - ".concat(240,"px)"),marginLeft:240}),menuButton:Object(o.a)({marginRight:e.spacing(2)},e.breakpoints.up("sm"),{display:"none"}),toolbar:e.mixins.toolbar,drawerPaper:{width:240},content:{flexGrow:1,padding:e.spacing(3)},backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"}})})),Ht={appInitializing:function(){return function(){var e=Object(w.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(Y(!0)),e.next=4,t(function(){var e=Object(w.a)(y.a.mark((function e(t){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){try{setTimeout((function(){t(N(0,"testuser@email.com","testuser",!0)),e()}),2e3)}catch(a){alert(a.message),n()}})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:t(Q(!0)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()}},Jt=Object(Ce.b)((function(e){return{isInitialized:e.app.isInitialized}}),Ht)((function(e){Object(r.useEffect)((function(){e.appInitializing()}),[]),window.api=a,window.counter=ce,window.dispatch=ae.dispatch,window.thunk={},window.thunk.login=x,window.thunk.logout=_,window.thunk.getProjects=z,window.thunk.getUsers=M,window.thunk.getTasks=X;var t=Mt(),n=Object(le.a)(),i=c.a.useState(!1),s=Object(l.a)(i,2),o=s[0],u=s[1],d=function(){u(!o)},m=c.a.createElement("div",null,c.a.createElement("div",{className:t.toolbar}),c.a.createElement(de.a,null),c.a.createElement(Ye,null));return c.a.createElement("div",{className:t.root},c.a.createElement(Gt.a,{className:t.backdrop,open:!e.isInitialized},c.a.createElement(Ue.a,{color:"inherit"})),c.a.createElement(ue.a,null),c.a.createElement(oe.a,{position:"fixed",className:t.appBar},c.a.createElement(he.a,null,c.a.createElement(fe.a,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:d,className:t.menuButton},c.a.createElement(ge.a,null)),c.a.createElement(lt,null))),c.a.createElement("nav",{className:t.drawer,"aria-label":"menu folders"},c.a.createElement(pe.a,{smUp:!0,implementation:"css"},c.a.createElement(me.a,{variant:"temporary",anchor:"rtl"===n.direction?"right":"left",open:o,onClose:d,classes:{paper:t.drawerPaper},ModalProps:{keepMounted:!0}},m)),c.a.createElement(pe.a,{xsDown:!0,implementation:"css"},c.a.createElement(me.a,{classes:{paper:t.drawerPaper},variant:"permanent",open:!0},m))),c.a.createElement("main",{className:t.content},c.a.createElement("div",{className:t.toolbar}),c.a.createElement(Ut,null),c.a.createElement(Wt,null)))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(Ce.a,{store:ae},c.a.createElement(Jt,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[163,1,2]]]);
//# sourceMappingURL=main.ef281290.chunk.js.map