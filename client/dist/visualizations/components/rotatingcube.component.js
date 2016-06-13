"use strict";var __decorate=this&&this.__decorate||function(e,t,n,i){var r,o=arguments.length,a=3>o?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(3>o?r(a):o>3?r(t,n,a):r(t,n))||a);return o>3&&a&&Object.defineProperty(t,n,a),a},__metadata=this&&this.__metadata||function(e,t){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(e,t):void 0},core_1=require("@angular/core"),RotatingCubeComponent=function(){function e(e){this.elRef=e}return e.prototype.ngOnInit=function(){},e.prototype.ngAfterViewInit=function(){this.init(),this.animate()},e.prototype.init=function(){this.scene=new THREE.Scene,this.camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1e4),this.camera.position.z=1e3,this.geometry=new THREE.BoxGeometry(200,200,200),this.material=new THREE.MeshBasicMaterial({color:16711680,wireframe:!0}),this.mesh=new THREE.Mesh(this.geometry,this.material),this.scene.add(this.mesh),this.renderer=new THREE.WebGLRenderer,this.renderer.setSize(window.innerWidth,window.innerHeight),this.container.appendChild(this.renderer.domElement),document.body.appendChild(this.renderer.domElement)},e.prototype.animate=function(){requestAnimationFrame(this.animate.bind(this)),this.mesh.rotation.x+=.01,this.mesh.rotation.y+=.02,this.renderer.render(this.scene,this.camera)},__decorate([core_1.ViewChild("container"),__metadata("design:type",HTMLElement)],e.prototype,"container",void 0),e=__decorate([core_1.Component({selector:"rotatingcube-cmp",templateUrl:"visualizations/templates/rotatingcube-component.html",styleUrls:["visualizations/styles/rotatingcube.css"]}),__metadata("design:paramtypes",[core_1.ElementRef])],e)}();exports.RotatingCubeComponent=RotatingCubeComponent;