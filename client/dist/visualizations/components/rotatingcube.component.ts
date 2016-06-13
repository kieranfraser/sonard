import {Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

declare var THREE: any;

@Component({
  selector: 'rotatingcube-cmp',
  templateUrl: 'visualizations/templates/rotatingcube-component.html',
  styleUrls: ['visualizations/styles/rotatingcube.css']
})

export class RotatingCubeComponent implements OnInit, AfterViewInit{

  @ViewChild('container') container: HTMLElement;

  private scene;
  private camera;
  private renderer;
  private geometry;
  private material;
  private mesh;

  constructor(private elRef:ElementRef){}

  ngOnInit(){}

  ngAfterViewInit(){
    this.init();
    this.animate();
  }

  init() {

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 1000;

    this.geometry = new THREE.BoxGeometry( 200, 200, 200 );
    this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.container.appendChild( this.renderer.domElement );

    document.body.appendChild( this.renderer.domElement );

  }

  animate() {

    requestAnimationFrame( this.animate.bind(this) );

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    this.renderer.render( this.scene, this.camera );

  }

}
