function save(){if(null===localStorage.getItem("jwt")||""===localStorage.getItem("jwt"))$.mobile.changePage("#home");else{var e;if(e=localStorage.id?prot+ip+colon+port+update+localStorage.id+"?":prot+ip+colon+port+create,e=e+propietario+$("#textinput-prop").val()+and+telefono+$("#textinput-tel").val()+and+movil+$("#textinput-mov").val()+and+email+$("#textinput-mail").val()+and+nombre+$("#textinput-nom").val()+and+raza+$("#select-razas").val()+and+color+$("#textinput-color").val()+and+edad+$("#textinput-edad").val()+and+caracter+$("#textinput-car").val()+and+problemasMedicos+$("#textarea-prob").val(),uriImage){var a=uriImage.replace("data:image/jpeg;base64,",""),t=encodeURIComponent(a);e+=and+imagen+t}e+=acctoken+localStorage.jwt,$.post(e,function(e){uriImage="",mensaje("Ficha guardada OK :)")}).fail(function(){mensaje("Ficha guardada NOK :(")}),resetCam(),setTimeout(function(){recargaInicio()},100)}}function borraFicha(){if(null===localStorage.getItem("jwt")||""===localStorage.getItem("jwt"))$.mobile.changePage("#home");else{var e;localStorage.id&&$.get(prot+ip+colon+port+"/servicio/elimina?id="+localStorage.id,function(a){e=prot+ip+colon+port+deleteFicha+localStorage.id,$.get(e,function(e){mensaje("Ficha eliminada OK :)"),borraID(),buscaServicios()}).fail(function(){mensaje("error al intentar eliminar la ficha NOK :/")})}).fail(function(){})}}function guardaServicio(e){if(null===localStorage.getItem("jwt")||""===localStorage.getItem("jwt"))$.mobile.changePage("#home");else{var a,t=$("#textinput-precio"+e).val()?$("#textinput-precio"+e).val():0;if(localStorage.idServicio&&!localStorage.id)try{a=prot+ip+colon+port+updateServicio+localStorage.idServicio+"?"+fechaServicio+$("#fecha-servicio"+e).val()+and+horaServicio+$("#input-hora"+e).val()+and+conceptoServicio+$("#textarea-servicio"+e).val()+and+precioServicio+t,a+=acctoken+localStorage.jwt,$.post(a,function(a){setTimeout(function(){mensaje("Servicio actualizado OK :)")},100),e?refrescaTablaServicios():buscaServicios()}).fail(function(){})}catch(i){}finally{clearID()}else a=e&&localStorage.idServicio?prot+ip+colon+port+updateServicio+localStorage.idServicio+"?"+fechaServicio+$("#fecha-servicio"+e).val()+and+horaServicio+$("#input-hora"+e).val()+and+conceptoServicio+$("#textarea-servicio"+e).val()+and+precioServicio+t:prot+ip+colon+port+createServicio+fechaServicio+$("#fecha-servicio"+e).val()+and+horaServicio+$("#input-hora"+e).val()+and+conceptoServicio+$("#textarea-servicio"+e).val()+and+precioServicio+t,a+=acctoken+localStorage.jwt,$.post(a,function(a){$.post("http://"+ip+":"+port+"/ficha/"+localStorage.id+"/serviciosPrestados/"+a.id,function(a){setTimeout(function(){mensaje("Servicio guardado OK :)")},100),e?(refrescaTablaServicios(),localStorage.removeItem("idServicio")):(buscaServicios(),clearID())}).fail(function(){mensaje("Servicio no asociado NOK :/")})}).fail(function(){mensaje("Servicio no guardado NOK :/")})}}function buscaFichas(){if(null===localStorage.getItem("jwt")||""===localStorage.getItem("jwt"))$.mobile.changePage("#home");else{var e=$("#busqueda-fichas").val();$.get("http://"+ip+":"+port+'/ficha?where={"nombre":{"contains":"'+e+'"}}&limit=50'+acctoken+localStorage.jwt,function(e){$("#ul-fichas").listview().empty(),e.forEach(function(e){var a=e.imagen?'<img src="data:image/jpeg;base64,'+e.imagen+'"/>':"";$("#ul-fichas").append("<li id="+e.id+'><a href="#ficha" style="padding-right: 80px;">'+a+"<h1>Nombre: <strong>"+e.nombre+"</strong></h1><p>Due&ntilde;o: <strong>"+e.propietario+"</strong></h1><p>Raza: <strong>"+e.raza+'</strong></p></a><a href="#cita" data-rel="popup" data-position-to="window"  data-transition="pop">Dar cita</a></li>'),$("#ul-fichas").listview("refresh")}),window.scrollTo(0,document.body.scrollHeight)}).fail(function(){})}}function buscaServicios(){if(null===localStorage.getItem("jwt")||""===localStorage.getItem("jwt"))$.mobile.changePage("#home");else{var e=new Date;e=0==dia?e:addDays(e,dia);var a=e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+("0"+e.getDate()).slice(-2);$.get(prot+ip+colon+port+"/servicio/buscaDia?fecha="+a+"&filtro="+filtroServicioID+acctoken+localStorage.jwt,function(e){$("#ul-servicios").empty(),e.forEach(function(e){var a=0==e.precioServicio?'style="color:red"':"";$("#ul-servicios").append('<li id="'+e.id+'"><a href="#cita" data-rel="popup" data-position-to="window"  data-transition="pop"><h1 '+a+">"+e.horaServicio+"  :  "+e.conceptoServicio+"</h1><p>Nombre: "+e.serv.nombre+'</p><a servID="'+e.serv.id+'" href="#ficha">Ficha</a></li>'),$("#ul-servicios").listview("refresh")}),$("#cabecera-citas").text(a)}).fail(function(){})}}function borraID(){clearID(),limpiarLista(),resetCam()}function clearID(){localStorage.removeItem("id")}function nuevaFicha(){clearID(),limpiarLista(),$("#ficha_borra_bttn").css("display","none"),$("#ficha_dar_cita_bttn").css("display","none"),setTimeout(function(){rellenaRazas("mestizo")},200)}function cargaFichas(){if(null===localStorage.getItem("jwt")||""===localStorage.getItem("jwt"))$.mobile.changePage("#home");else if(localStorage.id){$("#ficha_borra_bttn").css("display","block"),$("#ficha_dar_cita_bttn").css("display","block");document.location.href;$.get(prot+ip+colon+port+"/ficha?id="+localStorage.id+acctoken+localStorage.jwt,function(e){setTimeout(function(){if($("#textinput-prop").val(e.propietario),$("#textinput-tel").val(e.telefono),$("#textinput-mov").val(e.movil),$("#textinput-mail").val(e.email),$("#textinput-nom").val(e.nombre),$("#textinput-color").val(e.color),$("#textinput-edad").val(e.edad),$("#textinput-car").val(e.caracter),$("#textarea-prob").val(e.problemasMedicos),$("img").remove(),e.imagen&&$("#retrato").append('<img src="data:image/jpeg;base64,'+e.imagen+'"/>'),$("#tabla-servicios tbody")&&$("#tabla-servicios tbody").remove(),0!=e.serviciosPrestados.length){e.serviciosPrestados.sort(dynamicSortMultiple("-fechaServicio","horaServicio"));$("#div-servicios").css("display","inline"),$("#tabla-servicios").append("<tbody>"),e.serviciosPrestados.forEach(function(e){var a=new Date(e.fechaServicio),t=e.precioServicio?e.precioServicio:"SIN COBRAR";$("#tabla-servicios").append('<tr onclick="tocameFila($(this));" id="'+e.id+'"><td>'+a.getFullYear()+"-"+("0"+(a.getMonth()+1)).slice(-2)+"-"+("0"+a.getDate()).slice(-2)+"</td><td>"+e.horaServicio+'</td><td><a href="#citaFicha" data-rel="popup" data-position-to="window" data-transition="pop">'+e.conceptoServicio+"</a></td><th>"+t+"</th></tr>")}),$("#tabla-servicios").append("</tbody>")}},200),rellenaRazas(e.raza)}).fail(function(){})}}function refrescaTablaServicios(){null===localStorage.getItem("jwt")||""===localStorage.getItem("jwt")?$.mobile.changePage("#home"):$.get(prot+ip+colon+port+"/ficha?id="+localStorage.id+acctoken+localStorage.jwt,function(e){if(0!=e.serviciosPrestados.length){$("#tabla-servicios tbody")?$("#tabla-servicios tbody").remove():$("#tabla-servicios").css("display","inline");e.serviciosPrestados.sort(dynamicSortMultiple("-fechaServicio","horaServicio"));$("#tabla-servicios").append("<tbody>"),e.serviciosPrestados.forEach(function(e){var a=new Date(e.fechaServicio),t=e.precioServicio?e.precioServicio:"SIN COBRAR";$("#tabla-servicios").append('<tr onclick="tocameFila($(this));" id="'+e.id+'"><td>'+a.getFullYear()+"-"+("0"+(a.getMonth()+1)).slice(-2)+"-"+("0"+a.getDate()).slice(-2)+"</td><td>"+e.horaServicio+'</td><td><a href="#citaFicha" data-rel="popup" data-position-to="window" data-transition="pop">'+e.conceptoServicio+"</a></td><th>"+t+"</th></tr>")}),$("#tabla-servicios").append("</tbody>")}}).fail(function(){})}function tocameFila(e){localStorage.idServicio=e.attr("id"),cargaServicio("Ficha")}function foto(){try{Webcam.set({width:150,height:150,dest_width:150,dest_height:130,image_format:"jpeg",jpeg_quality:90,force_flash:!1}),Webcam.cameraIDs.length>1&&(Webcam.cameraID=1),Webcam.attach("#camara")}catch(e){}$("#foto").css("display","none"),$("#hacerFoto").css("display","inline"),Webcam.on("live",function(){cam=!0})}function hacerFoto(){Webcam.snap(function(e){uriImage=e,$("img").remove(),$("#retrato").append('<img src="'+e+'"/>')})}function resetCam(){Webcam&&cam&&(Webcam.reset(),cam=!1)}function limpiarLista(){$("#ul-fichas").listview().empty().listview("refresh")}function cargaServicio(e){null===localStorage.getItem("jwt")||""===localStorage.getItem("jwt")?$.mobile.changePage("#home"):localStorage.idServicio&&$.get(prot+ip+colon+port+"/servicio?id="+localStorage.idServicio+acctoken+localStorage.jwt,function(a){var t=new Date(a.fechaServicio);$("#fecha-servicio"+e).val(t.getFullYear()+"-"+("0"+(t.getMonth()+1)).slice(-2)+"-"+("0"+t.getDate()).slice(-2)),$("#input-hora"+e).val(a.horaServicio),$("#textarea-servicio"+e).val(a.conceptoServicio),$("#textinput-precio"+e).val(a.precioServicio),$("#botonBorrarServicio"+e).css("display","inline")}).fail(function(){})}function recargaInicio(){borraID(),buscaServicios()}function borraServicio(e){if(null===localStorage.getItem("jwt")||""===localStorage.getItem("jwt"))$.mobile.changePage("#home");else try{$.get(prot+ip+colon+port+"/servicio/destroy/"+localStorage.idServicio+acctoken+localStorage.jwt,function(a){e?refrescaTablaServicios():(borraID(),buscaServicios())}).fail(function(){mensaje("Servicio eliminado NOK :(")})}catch(a){}finally{$("#botonBorrarServicio"+e).css("display","none")}}function cerrarSesion(){$.get(prot+ip+":"+port+"/auth/logout",function(e){limipiaLocalstorage(),mensaje("Sesión cerrada :)")}).fail(function(){})}function limipiaLocalstorage(){localStorage.jwt=""}function addDays(e,a){return new Date(e.getTime()+24*a*60*60*1e3)}function dynamicSortMultiple(){var e=arguments;return function(a,t){for(var i=0,o=0,r=e.length;0===o&&r>i;)o=dynamicSort(e[i])(a,t),i++;return o}}function dynamicSort(e){var a=1;return"-"===e[0]&&(a=-1,e=e.substr(1)),function(t,i){var o=t[e]<i[e]?-1:t[e]>i[e]?1:0;return o*a}}function mensaje(e){$("#guardar-popup").children("p").remove(),$("#guardar-popup").append("<p>"+e+"</p>"),$("#guardar-popup").popup("open"),setTimeout(function(){$("#guardar-popup").popup("close")},1500)}function rellenaRazas(e){$.get(prot+ip+colon+port+"/razas?limit=407",function(a){a.forEach(function(a){$("select#select-razas").selectmenu();var t='<option value="'+a.nombre+'">'+a.nombre+"</option>";e&&e==a.nombre&&(t='<option value="'+a.nombre+'" selected="selected">'+a.nombre+"</option>"),$("select#select-razas").append(t)}),$("select#select-razas").selectmenu("refresh"),$("select#select-razas").selectmenu("enable")}).fail(function(){})}var propietario="propietario=",telefono="telefono=",movil="movil=",email="email=",nombre="nombre=",raza="raza=",color="color=",edad="edad=",caracter="caracter=",problemasMedicos="problemasMedicos=",imagen="imagen=",fechaServicio="fechaServicio=",horaServicio="horaServicio=",conceptoServicio="conceptoServicio=",precioServicio="precioServicio=",create="/ficha/create?",createServicio="/servicio/create?",updateServicio="/servicio/update/",update="/ficha/update/",deleteFicha="/ficha/destroy/",and="&",acctoken="&access_token=",uriImage="",cam=!1,dia=0,fichaGuardada="Ficha guardada",filtroServicioID=2,ip,port,prot="http://",colon=":";$(document).ready(function(){ip=appConfig.ip,port=appConfig.port,null===localStorage.getItem("jwt")||""===localStorage.getItem("jwt")?$.mobile.changePage("#home"):(buscaServicios(),$.mobile.changePage("#control"))}),$(document).on("click","#ul-fichas li",function(e){localStorage.id=$(this).attr("id"),cargaFichas()}),$(document).on("click","#ul-servicios li a",function(e){$(this).attr("servID")&&(localStorage.id=$(this).attr("servID"),cargaFichas())}),$(document).on("click","#ul-servicios li",function(){localStorage.idServicio=$(this).attr("id"),cargaServicio("")}),$(document).on("change","input[type='radio']",function(e,a){filtroServicioID=$(this).attr("value"),buscaServicios()}),$(document).on("click","#unDiaMenos",function(){dia-=1,buscaServicios()}),$(document).on("click","#diaHoy",function(){dia=0,buscaServicios()}),$(document).on("click","#unDiaMas",function(){dia+=1,buscaServicios()}),$("#formulario").submit(function(e){e.preventDefault()}),$(document).on("click","#botonLogin",function(e){$.ajax({type:"POST",url:prot+ip+":"+port+"/auth/login",data:{email:$("#emailUsuario").val(),password:$("#claveUsuario").val()},xhrFields:{withCredentials:!0},success:function(e){$.mobile.changePage("#control"),localStorage.jwt=e.token,$("#claveUsuario").val(""),$("#emailUsuario").val()},dataType:"json",error:function(e,a,t){mensaje("Datos incorrectos :(")}})});var Webcam={version:"1.0.0",protocol:location.protocol.match(/https/i)?"https":"http",swfURL:"",loaded:!1,live:!1,userMedia:!0,params:{width:0,height:0,dest_width:0,dest_height:0,image_format:"jpeg",jpeg_quality:90,force_flash:!1},hooks:{load:null,live:null,uploadcomplete:null,uploadprogress:null,error:function(e){}},cameraIDs:[],cameraID:0,init:function(){navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,window.URL=window.URL||window.webkitURL||window.mozURL||window.msURL,this.userMedia=this.userMedia&&!!navigator.getUserMedia&&!!window.URL,navigator.userAgent.match(/Firefox\D+(\d+)/)&&parseInt(RegExp.$1,10)<21&&(this.userMedia=null);try{MediaStreamTrack.getSources(function(e){for(var a=0;a!=e.length;a++){var t=e[a];"video"===t.kind&&Webcam.cameraIDs.push(t.id)}})}catch(e){}},attach:function(e){if("string"==typeof e&&(e=document.getElementById(e)||document.querySelector(e)),!e)return this.dispatch("error","Could not locate DOM element to attach to.");this.container=e,e.innerHTML="";var a=document.createElement("div");e.appendChild(a),this.peg=a,this.params.width||(this.params.width=e.offsetWidth),this.params.height||(this.params.height=e.offsetHeight),this.params.dest_width||(this.params.dest_width=this.params.width),this.params.dest_height||(this.params.dest_height=this.params.height),this.params.force_flash&&(this.userMedia=null);var t=this.params.width/this.params.dest_width,i=this.params.height/this.params.dest_height;if(this.userMedia){var o=document.createElement("video");o.setAttribute("autoplay","autoplay"),o.style.width=""+this.params.dest_width+"px",o.style.height=""+this.params.dest_height+"px",(1!=t||1!=i)&&(e.style.overflow="hidden",o.style.webkitTransformOrigin="0px 0px",o.style.mozTransformOrigin="0px 0px",o.style.msTransformOrigin="0px 0px",o.style.oTransformOrigin="0px 0px",o.style.transformOrigin="0px 0px",o.style.webkitTransform="scaleX("+t+") scaleY("+i+")",o.style.mozTransform="scaleX("+t+") scaleY("+i+")",o.style.msTransform="scaleX("+t+") scaleY("+i+")",o.style.oTransform="scaleX("+t+") scaleY("+i+")",o.style.transform="scaleX("+t+") scaleY("+i+")"),e.appendChild(o),this.video=o;var r={video:!0,audio:!1};Webcam.cameraIDs.length>0&&(r={video:{optional:[{sourceId:Webcam.cameraIDs[Webcam.cameraID]}]},audio:!1});var c=this;navigator.getUserMedia(r,function(e){o.src=window.URL.createObjectURL(e)||e,Webcam.stream=e,Webcam.loaded=!0,Webcam.live=!0,Webcam.dispatch("load"),Webcam.dispatch("live")},function(e){return c.dispatch("error","Could not access webcam.")})}else{var s=document.createElement("div");s.innerHTML=this.getSWFHTML(),e.appendChild(s)}if(this.params.crop_width&&this.params.crop_height){var n=Math.floor(this.params.crop_width*t),l=Math.floor(this.params.crop_height*i);e.style.width=""+n+"px",e.style.height=""+l+"px",e.style.overflow="hidden",e.scrollLeft=Math.floor(this.params.width/2-n/2),e.scrollTop=Math.floor(this.params.height/2-l/2)}else e.style.width=""+this.params.width+"px",e.style.height=""+this.params.height+"px"},reset:function(){if(this.userMedia){try{this.stream.stop()}catch(e){}delete this.stream,delete this.video}this.container.innerHTML="",delete this.container,this.loaded=!1,this.live=!1},set:function(){if(1==arguments.length)for(var e in arguments[0])this.params[e]=arguments[0][e];else this.params[arguments[0]]=arguments[1]},on:function(e,a){if(e=e.replace(/^on/i,"").toLowerCase(),"undefined"==typeof this.hooks[e])throw"Event type not supported: "+e;this.hooks[e]=a},dispatch:function(){var e=arguments[0].replace(/^on/i,"").toLowerCase(),a=Array.prototype.slice.call(arguments,1);return this.hooks[e]?("function"==typeof this.hooks[e]?this.hooks[e].apply(this,a):"array"==typeof this.hooks[e]?this.hooks[e][0][this.hooks[e][1]].apply(this.hooks[e][0],a):window[this.hooks[e]]&&window[this.hooks[e]].apply(window,a),!0):!1},setSWFLocation:function(e){this.swfURL=e},getSWFHTML:function(){var e="";if(location.protocol.match(/file/))return'<h1 style="color:red">Sorry, the Webcam.js Flash fallback does not work from local disk.  Please upload it to a web server first.</h1>';if(!this.swfURL){for(var a="",t=document.getElementsByTagName("script"),i=0,o=t.length;o>i;i++){var r=t[i].getAttribute("src");r&&r.match(/\/webcam(\.min)?\.js/)&&(a=r.replace(/\/webcam(\.min)?\.js.*$/,""),i=o)}a?this.swfURL=a+"/webcam.swf":this.swfURL="webcam.swf"}window.localStorage&&!localStorage.getItem("visited")&&(this.params.new_user=1,localStorage.setItem("visited",1));var c="";for(var s in this.params)c&&(c+="&"),c+=s+"="+escape(this.params[s]);return e+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" type="application/x-shockwave-flash" codebase="'+this.protocol+'://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+this.params.width+'" height="'+this.params.height+'" id="webcam_movie_obj" align="middle"><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+this.swfURL+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+c+'"/><embed id="webcam_movie_embed" src="'+this.swfURL+'" wmode="opaque" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+this.params.width+'" height="'+this.params.height+'" name="webcam_movie_embed" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+c+'"></embed></object>'},getMovie:function(){if(!this.loaded)return this.dispatch("error","Flash Movie is not loaded yet");var e=document.getElementById("webcam_movie_obj");return e&&e._snap||(e=document.getElementById("webcam_movie_embed")),e||this.dispatch("error","Cannot locate Flash movie in DOM"),e},freeze:function(){var e=this,a=this.params;this.preview_active&&this.unfreeze();var t=this.params.width/this.params.dest_width,i=this.params.height/this.params.dest_height,o=a.crop_width||a.dest_width,r=a.crop_height||a.dest_height,c=document.createElement("canvas");c.width=o,c.height=r;var s=c.getContext("2d");this.preview_canvas=c,this.preview_context=s,(1!=t||1!=i)&&(c.style.webkitTransformOrigin="0px 0px",c.style.mozTransformOrigin="0px 0px",c.style.msTransformOrigin="0px 0px",c.style.oTransformOrigin="0px 0px",c.style.transformOrigin="0px 0px",c.style.webkitTransform="scaleX("+t+") scaleY("+i+")",c.style.mozTransform="scaleX("+t+") scaleY("+i+")",c.style.msTransform="scaleX("+t+") scaleY("+i+")",c.style.oTransform="scaleX("+t+") scaleY("+i+")",c.style.transform="scaleX("+t+") scaleY("+i+")"),this.snap(function(){c.style.position="relative",c.style.left=""+e.container.scrollLeft+"px",c.style.top=""+e.container.scrollTop+"px",e.container.insertBefore(c,e.peg),e.container.style.overflow="hidden",e.preview_active=!0},c)},unfreeze:function(){this.preview_active&&(this.container.removeChild(this.preview_canvas),delete this.preview_context,delete this.preview_canvas,this.preview_active=!1)},savePreview:function(e,a){var t=this.params,i=this.preview_canvas,o=this.preview_context;if(a){var r=a.getContext("2d");r.drawImage(i,0,0)}e(a?null:i.toDataURL("image/"+t.image_format,t.jpeg_quality/100),i,o),this.unfreeze()},snap:function(e,a){var t=this.params;if(!this.loaded)return this.dispatch("error","Webcam is not loaded yet");if(!this.live)return this.dispatch("error","Webcam is not live yet");if(!e)return this.dispatch("error","Please provide a callback function or canvas to snap()");if(this.preview_active)return this.savePreview(e,a),null;var i=document.createElement("canvas");i.width=this.params.dest_width,i.height=this.params.dest_height;var o=i.getContext("2d"),r=function(){if(this.src&&this.width&&this.height&&o.drawImage(this,0,0,t.dest_width,t.dest_height),t.crop_width&&t.crop_height){var r=document.createElement("canvas");r.width=t.crop_width,r.height=t.crop_height;var c=r.getContext("2d");c.drawImage(i,Math.floor(t.dest_width/2-t.crop_width/2),Math.floor(t.dest_height/2-t.crop_height/2),t.crop_width,t.crop_height,0,0,t.crop_width,t.crop_height),o=c,i=r}if(a){var s=a.getContext("2d");s.drawImage(i,0,0)}e(a?null:i.toDataURL("image/"+t.image_format,t.jpeg_quality/100),i,o)};if(this.userMedia)o.drawImage(this.video,0,0,this.params.dest_width,this.params.dest_height),r();else{var c=this.getMovie()._snap(),s=new Image;s.onload=r,s.src="data:image/"+this.params.image_format+";base64,"+c}return null},configure:function(e){e||(e="camera"),this.getMovie()._configure(e)},flashNotify:function(e,a){switch(e){case"flashLoadComplete":this.loaded=!0,this.dispatch("load");break;case"cameraLive":this.live=!0,this.dispatch("live");break;case"error":this.dispatch("error",a)}},b64ToUint6:function(e){return e>64&&91>e?e-65:e>96&&123>e?e-71:e>47&&58>e?e+4:43===e?62:47===e?63:0},base64DecToArr:function(e,a){for(var t,i,o=e.replace(/[^A-Za-z0-9\+\/]/g,""),r=o.length,c=a?Math.ceil((3*r+1>>2)/a)*a:3*r+1>>2,s=new Uint8Array(c),n=0,l=0,p=0;r>p;p++)if(i=3&p,n|=this.b64ToUint6(o.charCodeAt(p))<<18-6*i,3===i||r-p===1){for(t=0;3>t&&c>l;t++,l++)s[l]=n>>>(16>>>t&24)&255;n=0}return s},upload:function(e,a,t){t&&Webcam.on("uploadComplete",t);var i="webcam",o="";if(!e.match(/^data\:image\/(\w+)/))throw"Cannot locate image format in Data URI";o=RegExp.$1;var r=e.replace(/^data\:image\/\w+\;base64\,/,""),c=new XMLHttpRequest;c.open("POST",a,!0),c.upload&&c.upload.addEventListener&&c.upload.addEventListener("progress",function(e){if(e.lengthComputable){var a=e.loaded/e.total;Webcam.dispatch("uploadProgress",a,e)}},!1),c.onload=function(){Webcam.dispatch("uploadComplete",c.status,c.responseText,c.statusText)};var s=new Blob([this.base64DecToArr(r)],{type:"image/"+o}),n=new FormData;n.append(i,s,i+"."+o.replace(/e/,"")),c.send(n)}};Webcam.init();