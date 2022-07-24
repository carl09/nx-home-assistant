(()=>{"use strict";var __webpack_modules__={352:module=>{module.exports=require("ws")}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),__webpack_require__.r=exports=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})};var __webpack_exports__={};(()=>{__webpack_require__.r(__webpack_exports__);const transforms={"action.devices.traits.TemperatureSetting":{query:(_device,entity)=>{let thermostatMode=entity.state;return"heat_cool"===thermostatMode?thermostatMode="heatcool":"fan_only"===thermostatMode&&(thermostatMode="fan-only"),{thermostatMode,thermostatTemperatureSetpoint:entity.attributes.temperature,thermostatTemperatureAmbient:entity.attributes.current_temperature,thermostatTemperatureSetpointHigh:entity.attributes.temperature,thermostatTemperatureSetpointLow:entity.attributes.min_temp,thermostatHumidityAmbient:entity.attributes.humidity}},sync:(_device,entity)=>{if(entity.entity_id.startsWith("climate")&&entity.attributes.hvac_modes&&Array.isArray(entity.attributes.hvac_modes)){entity.attributes.hvac_modes.filter((x=>"off"!==x)).map((x=>{switch(x){case"heat_cool":return"heatcool";case"fan_only":return"fan-only";default:return x}})).join(",")}return{availableThermostatModes:"heat,cool,off",thermostatTemperatureUnit:"C",commandOnlyTemperatureSetting:!1,queryOnlyTemperatureSetting:!1}}},"action.devices.traits.OnOff":{query:(device,entity)=>(device.deviceType,{on:"off"!==entity.state}),sync:(_device,_entity)=>({commandOnlyOnOff:!1})},"action.devices.traits.FanSpeed":{query:(_device,entity)=>({currentFanSpeedSetting:entity.attributes.fan_mode}),sync:(_device,entity)=>{const defaultResult={availableFanSpeeds:{speeds:[],ordered:!1},reversible:!1,commandOnlyFanSpeed:!0};if(entity.entity_id.startsWith("climate")&&entity.attributes.fan_modes&&Array.isArray(entity.attributes.fan_modes)){const fan_modes=entity.attributes.fan_modes;defaultResult.availableFanSpeeds.speeds=fan_modes.map((x=>({speed_name:x,speed_values:{speed_synonym:[x],lang:"en"}})))}return defaultResult}},"action.devices.traits.CameraStream":{query:(_device,_entity)=>({}),sync:(_device,_entity)=>({cameraStreamSupportedProtocols:["hls"],cameraStreamNeedAuthToken:!1,cameraStreamNeedDrmEncryption:!1})}},getTransforms=traits=>(traits||[]).map((x=>transforms[x])),external_tslib_namespaceObject=require("tslib"),commandMap={},createCommand=(id,status)=>({ids:[id],status:"SUCCESS",states:status});commandMap["action.devices.commands.OnOff"]=(callService,entityId,parms)=>(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){const on=parms.on;if(entityId.startsWith("climate"))yield callService("climate",on?"turn_on":"turn_off",{entity_id:entityId}),on&&(yield callService("climate","set_hvac_mode",{entity_id:entityId,hvac_mode:"heat"}));else{const[domain]=entityId.split(".");yield callService(domain||"switch",on?"turn_on":"turn_off",{entity_id:entityId})}return createCommand(entityId,{on})})),commandMap["action.devices.commands.ThermostatSetMode"]=(callService,entityId,parms)=>(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){const thermostatMode=parms.thermostatMode;return yield callService("climate","set_hvac_mode",{entity_id:entityId,hvac_mode:thermostatMode}),createCommand(entityId,{thermostatMode})})),commandMap["action.devices.commands.ThermostatTemperatureSetpoint"]=(callService,entityId,parms)=>(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){const thermostatTemperatureSetpoint=parms.thermostatTemperatureSetpoint;return yield callService("climate","set_temperature",{entity_id:entityId,temperature:thermostatTemperatureSetpoint}),createCommand(entityId,{thermostatTemperatureSetpoint})}));const external_axios_namespaceObject=require("axios");var external_axios_default=__webpack_require__.n(external_axios_namespaceObject);var LogLevel;!function(LogLevel){LogLevel[LogLevel.DEBUG=0]="DEBUG",LogLevel[LogLevel.INFO=1]="INFO",LogLevel[LogLevel.WARN=2]="WARN",LogLevel[LogLevel.ERROR=3]="ERROR"}(LogLevel||(LogLevel={}));const baseLog=(level,message,agrs)=>{const msg=`${(new Date).toLocaleString()} ${LogLevel[level]} ${message}`;switch(level){case LogLevel.DEBUG:console.info(msg,...agrs);break;case LogLevel.INFO:console.log(msg,...agrs);break;case LogLevel.WARN:console.warn(msg,...agrs);break;case LogLevel.ERROR:console.error(msg,...agrs)}},namedLog=name=>{const formattedName=`[${name}]`;return{info:(message,...agrs)=>{((message,...agrs)=>{baseLog(LogLevel.INFO,message,agrs)})(`${formattedName} ${message}`,...agrs)},debug:(message,...agrs)=>{((message,...agrs)=>{baseLog(LogLevel.DEBUG,message,agrs)})(`${formattedName} ${message}`,...agrs)},warn:(message,...agrs)=>{((message,...agrs)=>{baseLog(LogLevel.WARN,message,agrs)})(`${formattedName} ${message}`,...agrs)},error:(message,...agrs)=>{((message,...agrs)=>{baseLog(LogLevel.ERROR,message,agrs)})(`${formattedName} ${message}`,...agrs)}}},external_express_namespaceObject=require("express"),external_http_namespaceObject=require("http"),environment={production:!0,homeAssistaneRestUri:"http://hassio/homeassistant/api",homeAssistaneSocketUri:"ws://hassio/homeassistant/api"},external_firebase_admin_namespaceObject=require("firebase-admin"),external_actions_on_google_namespaceObject=require("actions-on-google"),external_rxjs_namespaceObject=require("rxjs"),operators_namespaceObject=require("rxjs/operators"),webSocket_namespaceObject=require("rxjs/webSocket"),home_assistant_server_log=namedLog("Home assistant Socket Client");global.WebSocket=__webpack_require__(352);class HomeAssistantWebSocket{constructor(url,token){this.url=url,this.token=token,this.homeAssistantResult=new external_rxjs_namespaceObject.ReplaySubject(1),this.subscribedMessages=[]}initWebSocket(){this.webSocketSubject=(0,webSocket_namespaceObject.webSocket)({url:this.url,closeObserver:{next:err=>{home_assistant_server_log.error("Home Assistant Web Socket Closed",err),setTimeout((()=>{home_assistant_server_log.debug("Re connecting"),this.initWebSocket()}),5e3)}}}),this.webSocketSubject.subscribe((msg=>{this.processMessage(msg)}),(err=>{home_assistant_server_log.error("ws error",err.message),this.webSocketSubject.complete()}),(()=>{home_assistant_server_log.warn("webSocket completed")}))}messages(){return this.homeAssistantResult.asObservable()}next(massageBase){this.subscribedMessages.push(massageBase),this.webSocketSubject?(home_assistant_server_log.debug("Adding Messages - WS Open",massageBase),this.webSocketSubject.next(massageBase)):this.initWebSocket()}processMessage(msg){"auth_required"===msg.type?this.webSocketSubject.next({type:"auth",access_token:this.token}):"auth_ok"===msg.type?this.subscribedMessages.forEach((m=>{home_assistant_server_log.debug("Adding Messages",m),this.webSocketSubject.next(m)})):"result"===msg.type||"event"===msg.type?this.homeAssistantResult.next(msg):"auth_invalid"===msg.type?(home_assistant_server_log.error("Auth Error",msg.message),home_assistant_server_log.info("Token",{token:this.token,url:`${environment.homeAssistaneSocketUri}/websocket`})):home_assistant_server_log.warn("processMessage unknown",msg)}}const data_access_log=namedLog("Data Access");const external_cbor_namespaceObject=require("cbor"),external_dgram_namespaceObject=require("dgram"),discover_server_log=namedLog("UDP Service"),external_body_parser_namespaceObject=require("body-parser"),external_cors_namespaceObject=require("cors"),external_fs_namespaceObject=require("fs"),external_path_namespaceObject=require("path"),file_log=namedLog("File Util"),readFileAsJson=filePath=>{file_log.info("Reading File:",filePath);const rawdata=external_fs_namespaceObject.readFileSync(filePath);return JSON.parse(rawdata.toString())},getRootPath=()=>external_path_namespaceObject.join(__dirname),getWebRootPath=fileName=>fileName?external_path_namespaceObject.join(getRootPath(),"../web-admin",fileName):external_path_namespaceObject.join(getRootPath(),"../web-admin"),rest_server_log=namedLog("Rest Service"),express=external_express_namespaceObject,callLocalService=token=>(domain,service,data)=>((url,token,body)=>(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){const var1=JSON.stringify(body);return console.log("post url:",url),console.log("post body:",var1),(yield external_axios_default()(url,{method:"post",data:body,headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}})).data})))(`${environment.homeAssistaneRestUri}/services/${domain}/${service}`,token,data);var external_ws_=__webpack_require__(352);const socket_server_log=namedLog("Socket Service"),main_log=namedLog("Main");main_log.debug("Environment",environment);const options=environment.production?readFileAsJson("/data/options.json"):environment.options;main_log.debug("App options",options);const jwt=readFileAsJson(options.googleJwtPath);external_firebase_admin_namespaceObject.initializeApp({credential:external_firebase_admin_namespaceObject.credential.cert(jwt),databaseURL:options.firebase.databaseURL});const main_express=external_express_namespaceObject,smarthomeApp=(0,external_actions_on_google_namespaceObject.smarthome)({debug:!environment.production,key:options.firebase.apikey,jwt}),app=main_express(),env=process.env,token=env.HASSIO_TOKEN||environment.homeAssistaneApiKey;main_log.debug("Token",token);const supervisorToken=env.SUPERVISOR_TOKEN;main_log.debug("SupervisorToken",supervisorToken);const argv={udp_discovery_port:3311,udp_discovery_packet:"A5A5A5A5",device_id:"strand1",device_model:"",hardware_revision:"",firmware_revision:""},dataAccess=new class DataAccess{constructor(token,googleHome){this.token=token,this.googleHome=googleHome,this.counter=1,this.homeAssistantWebSocket=new HomeAssistantWebSocket(`${environment.homeAssistaneSocketUri}/websocket`,token)}upsertManagedDevice(update){(managedDevice=>{const db=external_firebase_admin_namespaceObject.firestore();managedDevice.uid="v7QW5h3ehIUV9Kze9sHY1yLudoI2";const{id}=managedDevice,update=(0,external_tslib_namespaceObject.__rest)(managedDevice,["id"]);managedDevice.id?db.collection("devices").doc(id).set(update):db.collection("devices").add(update)})(update),this.requestSync()}deleteManagedDevice(id){(id=>external_firebase_admin_namespaceObject.firestore().collection("devices").doc(id).delete())(id).then((()=>{})),this.requestSync()}getManagedDevices(){return this.fireBase||this.initFireBase(),this.fireBase.asObservable()}getEntityStatus(){return this.entityStatus||(this.entityStatus=this.createSubScription({id:this.counter,type:"get_states"},this.counter++).pipe((0,operators_namespaceObject.map)((msg=>msg.result)),(0,operators_namespaceObject.shareReplay)(1))),this.entityStatus}getEntityStatusUpdated(){return this.entityStatusUpdated||(this.entityStatusUpdated=this.createSubScription({id:this.counter,type:"subscribe_events",event_type:"state_changed"},this.counter++).pipe((0,operators_namespaceObject.filter)((x=>{var _a;return"state_changed"===(null===(_a=x.event)||void 0===_a?void 0:_a.event_type)})),(0,operators_namespaceObject.map)((msg=>msg.event.data.new_state)),(0,operators_namespaceObject.shareReplay)(1))),this.entityStatusUpdated}getAreas(){return this.areas||(this.areas=this.createSubScription({id:this.counter,type:"config/area_registry/list"},this.counter++).pipe((0,operators_namespaceObject.map)((msg=>msg.result)),(0,operators_namespaceObject.shareReplay)(1))),this.areas}getEntities(){return this.entities||(this.entities=this.createSubScription({id:this.counter,type:"config/entity_registry/list"},this.counter++).pipe((0,operators_namespaceObject.map)((msg=>msg.result)),(0,operators_namespaceObject.shareReplay)(1))),this.entities}getDevices(){return this.devices||(this.devices=this.createSubScription({id:this.counter,type:"config/device_registry/list"},this.counter++).pipe((0,operators_namespaceObject.map)((msg=>msg.result)),(0,operators_namespaceObject.shareReplay)(1))),this.devices}initFireBase(){var callback;this.fireBase=new external_rxjs_namespaceObject.ReplaySubject(1),callback=d=>{this.fireBase.next(d)},(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){external_firebase_admin_namespaceObject.firestore().collection("devices").where("uid","==","v7QW5h3ehIUV9Kze9sHY1yLudoI2").onSnapshot((devicesCollection=>{const deviceModels=[];devicesCollection.forEach((device=>{const deviceModel=device.data();deviceModel.id=device.id,deviceModels.push(deviceModel)})),callback(deviceModels)}),(err=>{console.error(err)}))}))}createSubScription(iniMessage,resultId){return this.homeAssistantWebSocket.next(iniMessage),this.homeAssistantWebSocket.messages().pipe((0,operators_namespaceObject.filter)((x=>x.id===resultId)))}requestSync(){this.googleHome&&this.googleHome.requestSync("fedf0bfd-5e8b-422c-8886-04bf293dde9f").then((resp=>{data_access_log.info("[DataAccess] Google Home requestSync",resp)})).catch((err=>{data_access_log.error("[DataAccess] Google Home requestSync",err)}))}}(token,smarthomeApp);((app,dataAccess,token,supervisorToken)=>{dataAccess.getManagedDevices().pipe((0,operators_namespaceObject.take)(1),(0,operators_namespaceObject.map)((x=>x.map((y=>y.entityId))))).toPromise().then((x=>{rest_server_log.info("managedDevices",x)})),app.use(external_body_parser_namespaceObject.urlencoded({extended:!0})),app.use(external_body_parser_namespaceObject.json()),app.use(external_body_parser_namespaceObject.raw()),environment.production||app.use(external_cors_namespaceObject()),app.get("/",((_req,res)=>(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){rest_server_log.info("request 404",{url:_req.url,originalUrl:_req.originalUrl,path:_req.path});const addonsInfo=yield((url,token)=>(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){return(yield external_axios_default().get(url,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`}})).data})))("http://supervisor/addons/self/info",supervisorToken||token),data=external_fs_namespaceObject.readFileSync(getWebRootPath("index.html"),"utf8").replace('<base href="/" />',`<base href="${addonsInfo.ingress_url}" />`);res.writeHead(200,{"Content-Type":"text/html"}),res.write(data),res.end()})))),app.get("/api/devices",((_req,res)=>(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){const devices=yield dataAccess.getManagedDevices().pipe((0,operators_namespaceObject.take)(1),(0,operators_namespaceObject.map)((x=>x.map((y=>y.entityId))))).toPromise();res.json({devices:devices||[]})})))),app.post("/api/execute/:id",((req,res)=>(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){const id=req.params.id,body=req.body;rest_server_log.info("Local Execution",{command:body.execution[0].command,params:body.execution[0].params});const result=yield((cmd,callService,entityId,parms)=>{if(cmd in commandMap)return commandMap[cmd](callService,entityId,parms);console.error(`can't find ${cmd}`)})(body.execution[0].command,callLocalService(token),id,body.execution[0].params);res.status(200).json(result)})))),app.use("/assets",express.static(getWebRootPath("assets"))),app.use(((_req,res,_next)=>{const segments=_req.url.split("/"),fileName=segments[segments.length-1];if(external_fs_namespaceObject.existsSync(getWebRootPath(fileName))){let contentType="text/html";fileName.endsWith("js")?contentType="text/javascript":fileName.endsWith("css")&&(contentType="text/css"),res.writeHead(200,{"Content-Type":contentType});const file=external_fs_namespaceObject.readFileSync(getWebRootPath(fileName),null);res.write(file),res.end()}else res.status(404).send("Sorry can't find that!")}))})(app,dataAccess,token,supervisorToken);const server=external_http_namespaceObject.createServer(app);((server,dataAccess)=>{const wss=new external_ws_.Server({server,path:"/ws"});(0,external_rxjs_namespaceObject.combineLatest)([dataAccess.getManagedDevices(),dataAccess.getEntityStatusUpdated()]).pipe((0,operators_namespaceObject.filter)((([ids,update])=>ids.map((x=>x.entityId)).includes(update.entity_id))),(0,operators_namespaceObject.catchError)(((err,caught)=>(socket_server_log.error("Device Filter Error",err),caught)))).subscribe((([managedDevices,device])=>{const managedDevice=managedDevices.find((x=>x.entityId===device.entity_id)),update=((device,entity)=>getTransforms(device.traits).reduce(((acc,t)=>{const result=t.query(device,entity);return Object.keys(result).map((x=>{void 0!==result[x]&&(acc[x]=result[x])})),acc}),{online:!0}))(managedDevice,device);var managedDeviceId,deviceStatus;((obj1={},obj2={})=>{const obj1Keys=Object.keys(obj1||{}),obj2Keys=Object.keys(obj2||{}),allKeys=new Set;obj1Keys.forEach((x=>allKeys.add(x))),obj2Keys.forEach((x=>allKeys.add(x)));const diff=Array.from(allKeys).reduce(((acc,key)=>(obj1[key]!==obj2[key]&&(acc[key]={oldValue:obj1[key],newValue:obj2[key]}),acc)),{});return 0===Object.keys(diff).length||(socket_server_log.info("props changed",diff),!1)})(managedDevice.states,update)||(managedDeviceId=managedDevice.id,deviceStatus=update,(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){const db=external_firebase_admin_namespaceObject.firestore();return yield db.collection("devices").doc(managedDeviceId).update({states:deviceStatus}),!0})),socket_server_log.info("Updating Entity ",device.entity_id,managedDevice.id,update))}),(err=>{socket_server_log.error("Device Update Error",err)})),wss.on("connection",(ws=>(0,external_tslib_namespaceObject.__awaiter)(void 0,void 0,void 0,(function*(){const subject$=new external_rxjs_namespaceObject.Subject;ws.on("message",(message=>{const serverMessage=JSON.parse(message);switch(serverMessage.type){case"firebase_update":dataAccess.upsertManagedDevice(serverMessage.update);break;case"firebase_delete":dataAccess.deleteManagedDevice(serverMessage.id);break;default:socket_server_log.warn("received: %s",message)}})),dataAccess.getManagedDevices().pipe((0,operators_namespaceObject.takeUntil)(subject$)).subscribe((manageDevices=>{ws.send(JSON.stringify({type:"firebase",devices:manageDevices||[]}))})),dataAccess.getEntityStatus().pipe((0,operators_namespaceObject.takeUntil)(subject$)).subscribe((homeAssistantDevices=>{ws.send(JSON.stringify({type:"device_list",devices:homeAssistantDevices||[]}))})),dataAccess.getEntityStatusUpdated().pipe((0,operators_namespaceObject.takeUntil)(subject$)).subscribe((homeAssistantDevices=>{ws.send(JSON.stringify({type:"device_updated",device:homeAssistantDevices}))})),(0,external_rxjs_namespaceObject.combineLatest)([dataAccess.getAreas(),dataAccess.getEntities(),dataAccess.getDevices()]).pipe((0,operators_namespaceObject.takeUntil)(subject$),(0,operators_namespaceObject.map)((([areas,entities,devices])=>{const areasMap=(areas||[]).reduce(((acc,a)=>(acc[a.area_id]=a.name,acc)),{}),devicesMap=(devices||[]).reduce(((acc,a)=>(acc[a.id]=a,acc)),{});return(entities||[]).map((e=>{const device=devicesMap[e.device_id];if(device)return{entity_id:e.entity_id,area:areasMap[device.area_id],manufacturer:device.manufacturer,model:device.model,name:device.name,sw_version:device.sw_version}})).filter((x=>x))}))).subscribe((devicesInfo=>{ws.send(JSON.stringify({type:"device_info",devices:devicesInfo}))})),ws.onclose=()=>{subject$.next(),subject$.complete()},ws.onerror=err=>{socket_server_log.error("createWebSocket onerror",err)}}))))})(server,dataAccess),server.listen(8088),environment.production&&(argv=>{const socket=(0,external_dgram_namespaceObject.createSocket)("udp4");socket.on("message",((msg,rinfo)=>{const discoveryPacket=Buffer.from(argv.udp_discovery_packet,"hex");if(0!==msg.compare(discoveryPacket))return void discover_server_log.warn(`received unknown payload from ${rinfo}:`,msg);const discoveryData={id:argv.device_id,model:argv.device_model,hw_rev:argv.hardware_revision,fw_rev:argv.firmware_revision,isLocalOnly:!0,isProxy:!0},responsePacket=(0,external_cbor_namespaceObject.encode)(discoveryData);socket.send(responsePacket,rinfo.port,rinfo.address,(error=>{null===error||discover_server_log.error("failed to send ack:",error)}))})),socket.on("listening",(()=>{discover_server_log.info("discovery listening",socket.address())})).bind(argv.udp_discovery_port)})(argv)})();var __webpack_export_target__=exports;for(var i in __webpack_exports__)__webpack_export_target__[i]=__webpack_exports__[i];__webpack_exports__.__esModule&&Object.defineProperty(__webpack_export_target__,"__esModule",{value:!0})})();