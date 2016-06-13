"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var RotatingCubeComponent = (function () {
    function RotatingCubeComponent(elRef) {
        this.elRef = elRef;
    }
    RotatingCubeComponent.prototype.ngOnInit = function () { };
    RotatingCubeComponent.prototype.ngAfterViewInit = function () {
        this.init();
        this.animate();
    };
    RotatingCubeComponent.prototype.init = function () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;
        this.geometry = new THREE.BoxGeometry(200, 200, 200);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        document.body.appendChild(this.renderer.domElement);
    };
    RotatingCubeComponent.prototype.animate = function () {
        requestAnimationFrame(this.animate.bind(this));
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
    };
    __decorate([
        core_1.ViewChild('container'), 
        __metadata('design:type', HTMLElement)
    ], RotatingCubeComponent.prototype, "container", void 0);
    RotatingCubeComponent = __decorate([
        core_1.Component({
            selector: 'rotatingcube-cmp',
            templateUrl: 'visualizations/templates/rotatingcube-component.html',
            styleUrls: ['visualizations/styles/rotatingcube.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], RotatingCubeComponent);
    return RotatingCubeComponent;
}());
exports.RotatingCubeComponent = RotatingCubeComponent;
