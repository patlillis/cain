var numPoints = 50;
var subdivision = 1000;
var canvas;			
var points = [], spline;
var timer;

init();

//Re-size
function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;
	$(canvas).css({
		width: width + 'px',
		height: height + 'px'
	});
}

function init () {

	canvas = document.createElement( 'canvas' );
	document.body.appendChild( canvas );		

	$(window).on('resize', resize);
	resize();	


	for ( var i = 0, l = numPoints; i < l; i ++ ) {

		var point = new THREE.Vector3( i / l, Math.random(), 0 );
		points.push( point );
	}


	spline = new THREE.Spline( points );

	var timer = new Timer( 1 );
	timer.loop = true;
	timer.play();

	function animate() {

		requestAnimationFrame( animate );

		// var point = spline.getPoint( timer.currentTime / timer.duration );

		canvas.context = canvas.getContext( '2d' );
		canvas.context.lineWidth = 2;
		canvas.context.strokeStyle = '#ff0000';
		canvas.context.fillStyle = '#f0f0f0';
		canvas.context.fillRect( 0, 0, canvas.width, canvas.height );
		canvas.context.beginPath();

		for ( var i = 0, l = subdivision; i <= l; i ++ ) {

			var point = spline.getPoint( i / l );

			if ( i === 0 ) {

				canvas.context.moveTo( getX( point.x ), getY( point.y ) );

			} else {

				canvas.context.lineTo( getX( point.x ), getY( point.y ) );

			}

		}

		canvas.context.stroke();
	};

	animate();

}

function getX( value ) {

	return value * canvas.width;

}

function getY( value ) {

	return value * canvas.height;

}