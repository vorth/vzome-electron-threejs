
var container;

var camera, scene, renderer;

var mesh;
var objects = [];

init();
animate();

function init() {

	container = document.getElementById( 'container' );

	//

	camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
	camera.position.z = 10;

	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 5.0;
	controls.zoomSpeed = 3;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [ 65, 83, 68 ];
	controls.addEventListener( 'change', render );

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x88ccff, 2000, 3500 );

	// get the camera in the scene, so we can make the light move with the camera
	scene.add(camera);

	//

	scene.add( new THREE.AmbientLight( 0x666666 ) );

	var dLight1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	dLight1.position.set( 1, 1, 1 );
	camera.add( dLight1 );
	camera.add( dLight1.target );

	var dLight2 = new THREE.DirectionalLight( 0x888888, 0.5 );
	dLight2.position.set( -1, 0, 0 );
	camera.add( dLight2 );
	camera.add( dLight2.target );

	var material = new THREE.MeshPhongMaterial( {
		color: 0xddeeff, specular: 0xff9999, shininess: 500,
		side: THREE.DoubleSide, vertexColors: THREE.VertexColors
	} );

	var geometryJson= {
							"vertices":[0.309,-0.809,0.618,0.809,-0.618,0.309,0.618,-0.309,0.809,1,0.309,0.191,0.809,0.618,0.309,0.618,0.309,0.809,0.809,
								0,0.691,0.191,-1,0.309,-0.191,-1,0.309,-0.191,-1,-0.309,0.191,-1,-0.309,1,-0.309,-0.191,0.809,-0.618,-0.309,0.618,-0.309,
								-0.809,0.809,0,-0.691,0,0.691,-0.809,0.309,0.809,-0.618,0.618,0.309,-0.809,0.309,0.191,-1,1,0.309,-0.191,-0.309,-0.809,
								0.618,0,-0.691,0.809,0.809,0.618,-0.309,0.691,0.809,0,-0.691,0.809,0,-0.809,0.618,0.309,-0.309,0.809,0.618,-0.191,1,0.309,
								0.309,-0.191,-1,0.191,1,0.309,0.309,0.809,0.618,-0.809,-0.618,0.309,-0.691,-0.809,0,0,0.691,0.809,0.309,-0.809,-0.618,0,
								-0.691,-0.809,-1,0.309,0.191,-0.809,0,0.691,-0.618,0.309,0.809,1,-0.309,0.191,-0.309,-0.809,-0.618,-1,0.309,-0.191,-1,
								-0.309,-0.191,-1,-0.309,0.191,0.191,1,-0.309,-0.809,0.618,-0.309,-0.191,1,-0.309,-0.309,0.809,-0.618,-0.618,-0.309,0.809,
								0.309,0.191,1,-0.309,0.191,-1,-0.309,0.191,1,-0.309,-0.191,1,0.309,-0.191,1,0.691,-0.809,0,-0.809,0,-0.691,-0.618,-0.309,
								-0.809,-0.309,-0.191,-1,-0.618,0.309,-0.809,-0.809,-0.618,-0.309],
							"normals":[0,-0.8507,-0.5257,0.5774,-0.5774,0.5774,0,0.3568,0.9342,-0.809,0.309,0.5,-0.9342,0,-0.3568,-0.5,-0.809,-0.309,-0.309,
								-0.5,0.809,0,0.8507,0.5257,0.809,0.309,0.5,0,1,0,-0.5257,0,-0.8507,-0.309,0.5,0.809,-0.5774,0.5774,-0.5774,0,0,-1,-0.5774,-0.5774,
								-0.5774,-0.809,-0.309,0.5,0,-1,0,-1,0,0,-0.5,0.809,-0.309,0.5774,0.5774,0.5774,0,0.8507,-0.5257,-0.309,0.5,-0.809,-0.8507,0.5257,
								0,0.9342,0,-0.3568,0.9342,0,0.3568,0.809,-0.309,0.5,-0.3568,-0.9342,0,0.809,-0.309,-0.5,0.5774,0.5774,-0.5774,0,-0.8507,0.5257,
								0.5774,-0.5774,-0.5774,-0.309,-0.5,-0.809,0.5,-0.809,0.309,0.309,0.5,-0.809,0.8507,0.5257,0,0.3568,-0.9342,0,-0.809,0.309,-0.5,1,
								0,0,0.809,0.309,-0.5,0.309,-0.5,0.809,0,0,1,-0.8507,-0.5257,0,0,0.3568,-0.9342,-0.809,-0.309,-0.5,0.5,0.809,0.309,-0.5774,0.5774,
								0.5774,0.5257,0,-0.8507,-0.5,-0.809,0.309,0.3568,0.9342,0,-0.3568,0.9342,0,-0.5257,0,0.8507,-0.5774,-0.5774,0.5774,-0.5,0.809,
								0.309,0.5,0.809,-0.309,0.309,-0.5,-0.809,0.5,-0.809,-0.309,0.5257,0,0.8507,-0.9342,0,0.3568,0.309,0.5,0.809,0.8507,-0.5257,0,0,
								-0.3568,-0.9342,0,-0.3568,0.9342],
							"faces":[34,9,40,35,0,0,0,0,34,9,35,34,0,0,0,0,34,9,34,10,0,0,0,0,34,0,1,2,0,1,1,1,34,33,51,49,0,2,2,2,34,25,36,37,0,3,3,3,34,25,
								37,38,0,3,3,3,34,41,55,42,0,4,4,4,34,9,32,59,0,5,5,5,34,9,59,40,0,5,5,5,34,20,21,52,0,6,6,6,34,20,52,48,0,6,6,6,34,26,33,30,0,
								7,7,7,34,26,30,29,0,7,7,7,34,26,29,27,0,7,7,7,34,3,4,5,0,8,8,8,34,3,5,6,0,8,8,8,34,27,29,44,0,9,9,9,34,27,44,46,0,9,9,9,34,50,
								57,56,0,10,10,10,34,50,56,55,0,10,10,10,34,50,55,58,0,10,10,10,34,26,38,51,0,11,11,11,34,26,51,33,0,11,11,11,34,45,47,58,0,12,
								12,12,34,18,28,57,0,13,13,13,34,18,57,50,0,13,13,13,34,40,59,56,0,14,14,14,34,31,48,37,0,15,15,15,34,31,37,43,0,15,15,15,34,7,
								8,9,0,16,16,16,34,7,9,10,0,16,16,16,34,36,41,42,0,17,17,17,34,36,42,43,0,17,17,17,34,24,46,47,0,18,18,18,34,24,47,45,0,18,18,
								18,34,4,30,5,0,19,19,19,34,15,47,46,0,20,20,20,34,15,46,44,0,20,20,20,34,15,44,16,0,20,20,20,34,15,50,58,0,21,21,21,34,15,58,
								47,0,21,21,21,34,24,45,41,0,22,22,22,34,24,41,36,0,22,22,22,34,24,36,25,0,22,22,22,34,11,14,19,0,23,23,23,34,3,6,39,0,24,24,24,
								34,1,39,6,0,25,25,25,34,1,6,2,0,25,25,25,34,8,32,9,0,26,26,26,34,11,12,13,0,27,27,27,34,11,13,14,0,27,27,27,34,16,22,17,0,28,
								28,28,34,0,21,20,0,29,29,29,34,0,20,8,0,29,29,29,34,0,8,7,0,29,29,29,34,12,34,13,0,30,30,30,34,35,40,56,0,31,31,31,34,35,56,57,
								0,31,31,31,34,0,7,54,0,32,32,32,34,0,54,1,0,32,32,32,34,15,16,17,0,33,33,33,34,15,17,18,0,33,33,33,34,3,19,22,0,34,34,34,34,3,
								22,23,0,34,34,34,34,3,23,4,0,34,34,34,34,7,10,54,0,35,35,35,34,41,45,58,0,36,36,36,34,41,58,55,0,36,36,36,34,3,39,11,0,37,37,37,
								34,3,11,19,0,37,37,37,34,14,17,22,0,38,38,38,34,14,22,19,0,38,38,38,34,0,2,53,0,39,39,39,34,0,53,21,0,39,39,39,34,49,51,52,0,40,
								40,40,34,49,52,53,0,40,40,40,34,31,43,42,0,41,41,41,34,31,42,59,0,41,41,41,34,31,59,32,0,41,41,41,34,15,18,50,0,42,42,42,34,42,
								55,56,0,43,43,43,34,42,56,59,0,43,43,43,34,4,23,29,0,44,44,44,34,4,29,30,0,44,44,44,34,25,38,26,0,45,45,45,34,13,28,18,0,46,46,
								46,34,13,18,17,0,46,46,46,34,13,17,14,0,46,46,46,34,8,20,31,0,47,47,47,34,8,31,32,0,47,47,47,34,23,44,29,0,48,48,48,34,24,27,46,
								0,49,49,49,34,37,48,52,0,50,50,50,34,37,52,51,0,50,50,50,34,37,51,38,0,50,50,50,34,20,48,31,0,51,51,51,34,24,25,26,0,52,52,52,
								34,24,26,27,0,52,52,52,34,16,44,23,0,53,53,53,34,16,23,22,0,53,53,53,34,13,34,35,0,54,54,54,34,13,35,28,0,54,54,54,34,10,34,12,
								0,55,55,55,34,10,12,54,0,55,55,55,34,2,6,5,0,56,56,56,34,2,5,49,0,56,56,56,34,2,49,53,0,56,56,56,34,36,43,37,0,57,57,57,34,5,30,
								33,0,58,58,58,34,5,33,49,0,58,58,58,34,1,54,12,0,59,59,59,34,1,12,11,0,59,59,59,34,1,11,39,0,59,59,59,34,28,35,57,0,60,60,60,34,
								21,53,52,0,61,61,61]};

	// Snippet from https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_collada.html
	var loader = new THREE.JSONLoader();
	var loadedGeometry = loader .parse( geometryJson );
	mesh = new THREE.Mesh( loadedGeometry.geometry, material );
	scene.add( mesh );
	// loader.parse( './model.json', function ( loadedGeometry ) {
	// 	mesh = new THREE.Mesh( loadedGeometry, material );
	// 	scene.add( mesh );
	// 	// var object = loaded.scene;
	// 	// object.scale.set( 10, 10, 10 );
	// 	// object.position.set( 0, 0, 0 );
	// 	// scene.add( object );
	// 	// var geomJSON = loaded.dae.geometries['shape1-geom'].mesh.geometry3js.toJSON();
	// 	// localStorage.setItem( 'geometry', JSON.stringify( geomJSON ) );

	// 	// var dragControls = new THREE.DragControls( object.children, camera, renderer.domElement );
	// 	// dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
	// 	// dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );
	// } );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	
	// renderer.setClearColor(0x000000, 0);
	renderer.setClearColor( scene.fog.color );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	// renderer.gammaInput = true;
	// renderer.gammaOutput = true;

	container.appendChild( renderer.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();
	render();
}

//

function animate() {

	requestAnimationFrame( animate );

	controls.update();
	render();

}

function render() {

	var time = Date.now() * 0.001;

	renderer.render( scene, camera );

}
