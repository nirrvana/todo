(this.webpackJsonptodo=this.webpackJsonptodo||[]).push([[0],{53:function(e,t,n){e.exports=n(69)},63:function(e,t,n){},65:function(e,t,n){},66:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(20),i=n.n(a),c=n(10),u=n(27),s=n(7),d=n(6),l=n(9),p=function e(){Object(l.a)(this,e)};p.getGroupList=function(){return{type:"GET_GROUP_LIST"}},p.selectGroup=function(e){return{type:"SELECT_GROUP",index:e}},p.addGroup=function(e){return{type:"ADD_GROUP",name:e}},p.deleteGroup=function(e){return{type:"DELETE_GROUP",index:e}},p.updateGroup=function(e,t){return{type:"UPDATE_GROUP",index:e,name:t}},p.renameGroup=function(e,t){return{type:"RENAME_GROUP",index:e,name:t}},p.addTodo=function(e){return{type:"ADD_TODO",content:e}},p.deleteTodo=function(e){return{type:"DELETE_TODO",index:e}},p.updateTodo=function(e,t){return{type:"UPDATE_TODO",index:e,content:t}},p.submitTodo=function(e,t){return{type:"SUBMIT_TODO",index:e,content:t}},p.completeTodo=function(e){return{type:"COMPLETE_TODO",index:e}},p.incompleteTodo=function(e){return{type:"INCOMPLETE_TODO",index:e}};var m=function e(){Object(l.a)(this,e)};m.getGroupList=function(){var e,t=JSON.parse(localStorage.getItem("groupList"));if(Array.isArray(t))e=JSON.stringify(t);else{var n=JSON.stringify([{name:"Untitled",todoList:[{content:"todo1",completed:!1},{content:"todo2",completed:!0}]}]);localStorage.setItem("groupList",n),e=n}return e},m.addGroup=function(e){var t={name:e,todoList:[]},n=JSON.parse(localStorage.getItem("groupList")),o=JSON.stringify(Array.isArray(n)?[].concat(Object(s.a)(n),[t]):[t]);return localStorage.setItem("groupList",o),o},m.deleteGroup=function(e){var t=JSON.parse(localStorage.getItem("groupList")),n=JSON.stringify(t.filter((function(t,n){return n!==e})));return localStorage.setItem("groupList",n),n},m.renameGroup=function(e,t){var n=JSON.parse(localStorage.getItem("groupList")),o=JSON.stringify(n.map((function(n,o){return o===e?Object(d.a)({},n,{name:t}):n})));return localStorage.setItem("groupList",o),o},m.addTodo=function(e,t){var n={content:t,completed:!1},o=JSON.parse(localStorage.getItem("groupList")),r=JSON.stringify(o.map((function(t,o){return o===e?Object(d.a)({},t,{todoList:[].concat(Object(s.a)(t.todoList),[n])}):t})));return localStorage.setItem("groupList",r),r},m.deleteTodo=function(e,t){var n=JSON.parse(localStorage.getItem("groupList")),o=JSON.stringify(n.map((function(n,o){return o===e?Object(d.a)({},n,{todoList:n.todoList.filter((function(e,n){return n!==t}))}):n})));return localStorage.setItem("groupList",o),o},m.submitTodo=function(e,t,n){var o=JSON.parse(localStorage.getItem("groupList")),r=JSON.stringify(o.map((function(o,r){return r===e?Object(d.a)({},o,{todoList:o.todoList.map((function(e,o){return o===t?Object(d.a)({},e,{content:n}):e}))}):o})));return localStorage.setItem("groupList",r),r},m.completeTodo=function(e,t){var n=JSON.parse(localStorage.getItem("groupList")),o=JSON.stringify(n.map((function(n,o){return o===e?Object(d.a)({},n,{todoList:n.todoList.map((function(e,n){return n===t?Object(d.a)({},e,{completed:!0}):e}))}):n})));return localStorage.setItem("groupList",o),o},m.incompleteTodo=function(e,t){var n=JSON.parse(localStorage.getItem("groupList")),o=JSON.stringify(n.map((function(n,o){return o===e?Object(d.a)({},n,{todoList:n.todoList.map((function(e,n){return n===t?Object(d.a)({},e,{completed:!1}):e}))}):n})));return localStorage.setItem("groupList",o),o};var f={groupList:[],groupListForEdit:[],selectedGroupIndex:null},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0,n=e.groupListForEdit,o=e.selectedGroupIndex,r=[];switch(t.type){case"GET_GROUP_LIST":return r=JSON.parse(m.getGroupList()),Object(d.a)({},e,{groupList:Object(s.a)(r),groupListForEdit:Object(s.a)(r)});case"SELECT_GROUP":return Object(d.a)({},e,{selectedGroupIndex:t.index});case"ADD_GROUP":return r=JSON.parse(m.addGroup(t.name)),Object(d.a)({},e,{groupList:Object(s.a)(r),groupListForEdit:Object(s.a)(r)});case"DELETE_GROUP":return r=JSON.parse(m.deleteGroup(t.index)),{groupList:Object(s.a)(r),groupListForEdit:Object(s.a)(r),selectedGroupIndex:o===t.index?null:o>t.index?o-1:o};case"UPDATE_GROUP":return Object(d.a)({},e,{groupListForEdit:n.map((function(e,n){return n===t.index?Object(d.a)({},e,{name:t.name}):e}))});case"RENAME_GROUP":return r=JSON.parse(m.renameGroup(t.index,t.name)),Object(d.a)({},e,{groupList:Object(s.a)(r),groupListForEdit:Object(s.a)(r)});case"ADD_TODO":return r=JSON.parse(m.addTodo(o,t.content)),Object(d.a)({},e,{groupList:Object(s.a)(r),groupListForEdit:Object(s.a)(r)});case"DELETE_TODO":return r=JSON.parse(m.deleteTodo(o,t.index)),Object(d.a)({},e,{groupList:Object(s.a)(r),groupListForEdit:Object(s.a)(r)});case"UPDATE_TODO":return Object(d.a)({},e,{groupListForEdit:n.map((function(e,n){return n===o?Object(d.a)({},e,{todoList:e.todoList.map((function(e,n){return n===t.index?Object(d.a)({},e,{content:t.content}):e}))}):e}))});case"SUBMIT_TODO":return r=JSON.parse(m.submitTodo(o,t.index,t.content)),Object(d.a)({},e,{groupList:Object(s.a)(r),groupListForEdit:Object(s.a)(r)});case"COMPLETE_TODO":return r=JSON.parse(m.completeTodo(o,t.index)),Object(d.a)({},e,{groupList:Object(s.a)(r),groupListForEdit:Object(s.a)(r)});case"INCOMPLETE_TODO":return r=JSON.parse(m.incompleteTodo(o,t.index)),Object(d.a)({},e,{groupList:Object(s.a)(r),groupListForEdit:Object(s.a)(r)});default:return e}},g=n(14),O=n(16),b=n(17),h=n(71),_=n(72),L=n(77),N=n(73),T=n(74),y=n(45),v=n(11),G=(n(63),function(e){return!/\S/.test(e)}),S=function(e){Object(b.a)(n,e);var t=Object(O.a)(n);function n(){var e;Object(l.a)(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={isEditMode:!1,isRenameMode:!1},e.groupNameArea=r.a.createRef(),e.updateGroupName=function(t){var n=t.target.value,o=e.props,r=o.index;(0,o.dispatchUpdateGroup)(r,n)},e.submitGroupName=function(t){return function(n){var o=n.key,r=n.type,a=e.props,i=a.index,c=a.dispatchRenameGroup;"Enter"!==o&&"click"!==r||(c(i,G(t)?"Untitled":t),e.setState({isRenameMode:!1}))}},e.renderGroupName=function(t){var n=e.props,o=n.index,a=n.groupName,i=n.dispatchSelectGroup;if(!t)return r.a.createElement("div",{ref:e.groupNameArea,className:"group-entry-container__name",onClick:function(){return i(o)}},a)},e.renderGroupDeleteButton=function(t,n){var o=e.props,a=o.index,i=o.dispatchDeleteGroup;if(t&&!n)return r.a.createElement(h.a,{size:"sm",variant:"outline-danger",className:"group-entry-container__delete-button",onClick:function(){return i(a)}},"X")},e.renderGroupRenameButton=function(t,n){if(t&&!n)return r.a.createElement(h.a,{size:"sm",variant:"outline-success",className:"group-entry-container__rename-button",onClick:function(){return e.setState({isRenameMode:!0})}},"rename")},e.renderGroupNameInput=function(){var t=e.props.groupListForEdit.filter((function(t,n){return n===e.props.index}))[0].name;return r.a.createElement(_.a,{className:"mb-3"},r.a.createElement(L.a.Control,{autoFocus:!0,value:t,onChange:e.updateGroupName,onKeyDown:e.submitGroupName(t)}),r.a.createElement(_.a.Append,null,r.a.createElement(h.a,{size:"sm",variant:"outline-info",onClick:e.submitGroupName(t)},r.a.createElement(v.a,null))))},e}return Object(g.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.isEditMode,o=t.isRenameMode;return o?this.renderGroupNameInput():r.a.createElement(N.a,{fluid:!0,className:"group-entry-container",onMouseEnter:function(){return e.setState({isEditMode:!0})},onMouseLeave:function(){return e.setState({isEditMode:!1})}},r.a.createElement(T.a,{noGutters:!0,className:"group-entry-container__wrapper"},r.a.createElement(y.a,{className:"group-entry-container__name-area"},this.renderGroupName(o)),r.a.createElement(y.a,{className:"group-entry-container__delete-button-area"},this.renderGroupDeleteButton(n,o)),r.a.createElement(y.a,{className:"group-entry-container__rename-button-area"},this.renderGroupRenameButton(n,o))))}}]),n}(o.Component),j=Object(c.b)((function(e){return{groupListForEdit:e.groupListForEdit}}),(function(e){return{dispatchSelectGroup:function(t){return e(p.selectGroup(t))},dispatchDeleteGroup:function(t){return e(p.deleteGroup(t))},dispatchUpdateGroup:function(t,n){return e(p.updateGroup(t,n))},dispatchRenameGroup:function(t,n){return e(p.renameGroup(t,n))}}}))(S),I=n(78),x=(n(65),function(e){Object(b.a)(n,e);var t=Object(O.a)(n);function n(){var e;Object(l.a)(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={name:"",isAddMode:!1},e.groupListContainer=r.a.createRef(),e.submitGroupName=function(t){return function(n){var o=n.key,r=n.type;if("Enter"===o||"click"===r){var a=G(t)?"Untitled":t;e.props.dispatchAddGroup(a),e.setState({isAddMode:!1,name:""})}}},e.hideGroupNameInput=function(t){var n=t.target;e.state.isAddMode&&!e.groupListContainer.current.contains(n)&&e.setState({isAddMode:!1})},e.renderGroupNameInput=function(t){var n=e.state.name;if(t)return r.a.createElement(y.a,{className:"group-list-container__input-group-area"},r.a.createElement(_.a,{className:"mb-3"},r.a.createElement(L.a.Control,{autoFocus:!0,placeholder:"group name",className:"group-list-container__form-control",onChange:function(t){var n=t.target.value;return e.setState({name:n})},onKeyDown:e.submitGroupName(n),onClick:e.hideGroupNameInput}),r.a.createElement(_.a.Append,null,r.a.createElement(h.a,{variant:"outline-info",className:"group-list-container__check-button",onClick:e.submitGroupName(n)},r.a.createElement(v.a,null)))))},e}return Object(g.a)(n,[{key:"componentDidMount",value:function(){window.addEventListener("click",this.hideGroupNameInput)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("click",this.hideGroupNameInput)}},{key:"render",value:function(){var e=this,t=this.props.groupList,n=this.state.isAddMode;return r.a.createElement(N.a,{fluid:!0,className:"group-list-container",ref:this.groupListContainer},r.a.createElement(T.a,{noGutters:!0,className:"group-list-container__wrapper"},r.a.createElement(h.a,{variant:"outline-danger",className:"group-list-container__add-button",onClick:function(){return e.setState({isAddMode:!n})}},n?"End":"+ Add Group")),r.a.createElement(T.a,{noGutters:!0,className:"group-list-container__wrapper"},this.renderGroupNameInput(n)),r.a.createElement(T.a,{noGutters:!0,className:"group-list-container__wrapper"},r.a.createElement(y.a,{className:"group-list-container__group-entry-area"},r.a.createElement(I.a,null,t.map((function(e,t){return r.a.createElement(I.a.Item,{className:"group-list-container__list-group-item"},r.a.createElement(j,{key:t,index:t,groupName:e.name}))}))))))}}]),n}(o.Component)),C=Object(c.b)((function(e){return{groupList:e.groupList,selectedGroupIndex:e.selectedGroupIndex}}),(function(e){return{dispatchAddGroup:function(t){return e(p.addGroup(t))}}}))(x),M=n(48),k=n(29),A=n(76),w=(n(66),function(e){Object(b.a)(n,e);var t=Object(O.a)(n);function n(){var e;Object(l.a)(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={isEditMode:!1,isUpdateMode:!1,isShowMode:!1},e.updateTodoContent=function(t){var n=t.target.value,o=e.props,r=o.index;(0,o.dispatchUpdateTodo)(r,n)},e.showAlert=function(){return r.a.createElement(A.a,{show:e.state.isShowMode},r.a.createElement(A.a.Header,null,r.a.createElement(A.a.Title,null,"Empty content..")),r.a.createElement(A.a.Body,null,"Please enter the content."),r.a.createElement(A.a.Footer,null,r.a.createElement(h.a,{variant:"outline-info",onClick:function(){return e.setState({isShowMode:!1})}},"Close")))},e.submitTodoContent=function(t){return function(n){var o=n.key,r=n.type;"Enter"!==o&&"click"!==r||(G(t)?e.setState({isShowMode:!0}):(e.props.dispatchSubmitTodo(e.props.index,t),e.setState({isUpdateMode:!1})))}},e.renderTodo=function(){var t=e.props,n=t.index,o=t.todo,a=t.dispatchCompleteTodo;return r.a.createElement(T.a,{noGutters:!0,className:"todo-entry-container__wrapper flex-nowrap"},r.a.createElement(y.a,{className:"todo-entry-container__check-box-area"},r.a.createElement("input",{className:"todo-entry-container__check-box",type:"checkbox",checked:o.completed,onChange:function(){return a(n)}})),r.a.createElement(y.a,{className:"todo-entry-container__content-area"},r.a.createElement("div",{className:"todo-entry-container__content",onClick:function(){return e.setState({isUpdateMode:!0})}},o.content)),r.a.createElement(y.a,{className:"todo-entry-container__delete-button-area"},e.renderDeleteTodoButton()))},e.renderCompletedTodo=function(){var t=e.props,n=t.index,o=t.todo,a=t.dispatchIncompleteTodo;return r.a.createElement(T.a,{noGutters:!0,className:"todo-entry-container__wrapper flex-nowrap"},r.a.createElement(y.a,{className:"todo-entry-container__check-box-area"},r.a.createElement("input",{className:"todo-entry-container__check-box",type:"checkbox",checked:o.completed,onChange:function(){return a(n)}})),r.a.createElement(y.a,{className:"todo-entry-container__completed-content-area"},r.a.createElement("div",{className:"todo-entry-container__completed-content"},o.content)),r.a.createElement(y.a,{className:"todo-entry-container__delete-button-area"},e.renderDeleteTodoButton()))},e.renderDeleteTodoButton=function(){var t=Object(k.a)(e),n=t.state,o=n.isEditMode,a=n.isUpdateMode,i=t.props,c=i.index,u=i.dispatchDeleteTodo;if(o&&!a)return r.a.createElement(h.a,{size:"sm",variant:"outline-danger",className:"todo-entry-container__delete-button",onClick:function(){return u(c)}},"X")},e.renderTodoInput=function(){var t=e.props,n=t.index,o=t.groupListForEdit,a=t.selectedGroupIndex,i=o.filter((function(e,t){return t===a}))[0].todoList[n].content;return r.a.createElement(T.a,{noGutters:!0,className:"todo-entry-container__wrapper"},r.a.createElement(y.a,{className:"todo-entry-container__input-group-area"},r.a.createElement(_.a,{className:"mb-3 todo-entry-container__input-group"},r.a.createElement(L.a.Control,{autoFocus:!0,className:"todo-entry-container__form-control",value:i,onChange:e.updateTodoContent,onKeyDown:e.submitTodoContent(i)}),r.a.createElement(_.a.Append,null,r.a.createElement(h.a,{size:"sm",variant:"outline-info",onClick:e.submitTodoContent(i)},r.a.createElement(v.a,null))))))},e.renderTodoOrInput=function(){var t=e.props.todo;return e.state.isUpdateMode?e.renderTodoInput():t.completed?e.renderCompletedTodo():e.renderTodo()},e}return Object(g.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement(N.a,{fluid:!0,className:"todo-entry-container",onMouseEnter:function(){return e.setState({isEditMode:!0})},onMouseLeave:function(){return e.setState({isEditMode:!1})}},this.renderTodoOrInput(),this.showAlert())}}]),n}(o.Component)),D=Object(c.b)((function(e){return{groupList:e.groupList,groupListForEdit:e.groupListForEdit,selectedGroupIndex:e.selectedGroupIndex}}),(function(e){return{dispatchDeleteTodo:function(t){return e(p.deleteTodo(t))},dispatchUpdateTodo:function(t,n){return e(p.updateTodo(t,n))},dispatchSubmitTodo:function(t,n){return e(p.submitTodo(t,n))},dispatchCompleteTodo:function(t){return e(p.completeTodo(t))},dispatchIncompleteTodo:function(t){return e(p.incompleteTodo(t))}}}))(w),U=n(75),J=(n(67),function(e){Object(b.a)(n,e);var t=Object(O.a)(n);function n(){var e;Object(l.a)(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={content:"",isAddMode:!1,isShowMode:!1,isSpreadMode:!0},e.todoListContainer=r.a.createRef(),e.showAlert=function(){return r.a.createElement(A.a,{show:e.state.isShowMode},r.a.createElement(A.a.Header,null,r.a.createElement(A.a.Title,null,"Empty content..")),r.a.createElement(A.a.Body,null,"Please enter the content."),r.a.createElement(A.a.Footer,null,r.a.createElement(h.a,{variant:"outline-info",onClick:function(){return e.setState({isShowMode:!1})}},"Close")))},e.submitTodo=function(t){return function(n){var o=n.key,r=n.type;"Enter"!==o&&"click"!==r||(G(t)?e.setState({isShowMode:!0}):(e.props.dispatchAddTodo(t),e.setState({isAddMode:!1,content:""})))}},e.hideTodoInput=function(t){var n=t.target;e.state.isAddMode&&!e.todoListContainer.current.contains(n)&&e.setState({isAddMode:!1})},e.renderTodoInput=function(){var t=e.state,n=t.isAddMode,o=t.content;if(n)return r.a.createElement(I.a.Item,{className:"todo-list-container__list-group-item"},r.a.createElement(_.a,{className:"mb-3 todo-list-container__input-group"},r.a.createElement(L.a.Control,{autoFocus:!0,className:"todo-list-container__form-control",placeholder:"todo",onChange:function(t){var n=t.target.value;return e.setState({content:n})},onKeyDown:e.submitTodo(o),onClick:e.hideTodoInput}),r.a.createElement(_.a.Append,null,r.a.createElement(h.a,{size:"sm",variant:"outline-info",onClick:e.submitTodo(o)},r.a.createElement(v.a,null)))))},e.renderListOrInput=function(t){return 0===t.length?r.a.createElement(y.a,null,r.a.createElement(U.a,{className:"todo-list-container__alert"},r.a.createElement(v.d,{className:"todo-list-container__info-icon"}),"List is empty."),e.renderTodoInput()):r.a.createElement(y.a,null,r.a.createElement(I.a,null,t.map((function(e,t){return e.completed?null:r.a.createElement(I.a.Item,{className:"todo-list-container__list-group-item"},r.a.createElement(D,{key:t,index:t,todo:e}))})),e.renderTodoInput()))},e.renderCompletedTodoSpreadButton=function(t,n){if(t.length>0)return r.a.createElement(y.a,null,r.a.createElement(h.a,{variant:"link",onClick:function(){return e.setState({isSpreadMode:!n})}},n?r.a.createElement(v.b,null):r.a.createElement(v.c,null)),r.a.createElement(h.a,{disabled:!0,variant:"link"},"Completed Todo"))},e.countCompletedTodo=function(e){var t,n=0,o=Object(M.a)(e);try{for(o.s();!(t=o.n()).done;){t.value.completed&&(n+=1)}}catch(r){o.e(r)}finally{o.f()}return n},e.renderCompletedTodo=function(t,n){if(n&&t.length>0)return 0===e.countCompletedTodo(t)?r.a.createElement(U.a,{className:"todo-list-container__alert"},r.a.createElement(v.d,{className:"todo-list-container__info-icon"}),"none"):r.a.createElement(y.a,null,r.a.createElement(I.a,null,t.map((function(e,t){return e.completed?r.a.createElement(I.a.Item,{className:"todo-list-container__list-group-item todo-list-container__completed-list-group-item"},r.a.createElement(D,{key:t,index:t,todo:e})):null}))))},e}return Object(g.a)(n,[{key:"componentDidMount",value:function(){window.addEventListener("click",this.hideTodoInput)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("click",this.hideTodoInput)}},{key:"render",value:function(){var e=this,t=this.props,n=t.groupList,o=t.selectedGroupIndex,a=this.state,i=a.isAddMode,c=a.isSpreadMode,u=n[o].todoList;return r.a.createElement(N.a,{fluid:!0,className:"todo-list-container",ref:this.todoListContainer},r.a.createElement(T.a,{noGutters:!0},r.a.createElement(h.a,{variant:"outline-dark",className:"todo-list-container__add-button",onClick:function(){return e.setState({isAddMode:!i})}},i?"End":"+")),r.a.createElement(T.a,{noGutters:!0},this.renderListOrInput(u)),r.a.createElement(T.a,{noGutters:!0,className:"todo-list-container__completed-list"},this.renderCompletedTodoSpreadButton(u,c)),r.a.createElement(T.a,{noGutters:!0},this.renderCompletedTodo(u,c)),this.showAlert())}}]),n}(o.Component)),F=Object(c.b)((function(e){return{groupList:e.groupList,selectedGroupIndex:e.selectedGroupIndex}}),(function(e){return{dispatchAddTodo:function(t){return e(p.addTodo(t))}}}))(J),R=(n(68),function(e){Object(b.a)(n,e);var t=Object(O.a)(n);function n(){var e;Object(l.a)(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).renderTodoList=function(){if(null!==e.props.selectedGroupIndex)return r.a.createElement(F,null)},e}return Object(g.a)(n,[{key:"componentDidMount",value:function(){this.props.dispatchGetGroupList()}},{key:"render",value:function(){return r.a.createElement(N.a,{fluid:!0,className:"app-container"},r.a.createElement(T.a,{noGutters:!0,className:"app-container__wrapper flex-nowrap"},r.a.createElement(y.a,{xl:4},r.a.createElement(C,null)),r.a.createElement(y.a,{xl:8},this.renderTodoList())))}}]),n}(o.Component)),P=Object(c.b)((function(e){return{selectedGroupIndex:e.selectedGroupIndex}}),(function(e){return{dispatchGetGroupList:function(){return e(p.getGroupList())}}}))(R),B=Object(u.b)(E);i.a.render(r.a.createElement(c.a,{store:B},r.a.createElement(P,null)),document.getElementById("root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.4037392d.chunk.js.map