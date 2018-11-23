var fuselageMaterial, wingMaterial, propellerMaterial, stabilizersMaterial, wingShape, horizontalStabilizer, verticalStabilizer;
var fuselage, wings, propellers, stabilizers, cockpit, extrudeSettings;

class Airplane extends Objeto{
  constructor(){
    super();
  }

  rotatePropelers(){
    this.children[2].children[2].rotation.z += 0.7;
    this.children[2].children[3].rotation.z += 0.7;
    this.children[2].children[6].rotation.z += 0.7;
    this.children[2].children[7].rotation.z += 0.7;
  }

  wireframeChanger(){

    for(var i = 0; i < airplane.children.length; i++)
      for(var j = 0; j < airplane.children[i].children.length; j++)
        airplane.children[i].children[j].material.wireframe = !airplane.children[i].children[j].material.wireframe;

  }

}

function createAirplane(){
  var geometry;
  // Airplane constitution
  fuselage = new Objeto();
  wings = new Objeto();
  propellers = new Objeto();
  stabilizers = new Objeto();
  cockpit = new Objeto();

  // Material Types
  fuselageMaterial = new THREE.MeshLambertMaterial( {color: 0xD3D3D3	, wireframe: true} );
  wingMaterial = new THREE.MeshLambertMaterial( {color: 0xC0C0C0	, wireframe: true} );
  propellerMaterial = new THREE.MeshLambertMaterial( {color: 0xa9a9a9, side: THREE.DoubleSide, wireframe: true} );
  stabilizersMaterial = new THREE.MeshLambertMaterial( {color: 0xa8a8a8, side: THREE.DoubleSide, wireframe: true} );
  cockpitMaterial = new THREE.MeshLambertMaterial( {color: 0x696969, side: THREE.DoubleSide, wireframe: true, depthTest: true} );


  /* Airplane fuselage */
  geometry = new THREE.SphereGeometry(5.5, 16, 16);
  geometry.applyMatrix( new THREE.Matrix4().makeScale( 1.2, 1.5, 10.5 ) );
  fuselage.addElement(0, 0, 0, geometry, fuselageMaterial);

  geometry = new THREE.SphereGeometry(5.5, 16, 16);
  geometry.applyMatrix( new THREE.Matrix4().makeScale( 0.7, 1.3, 8) );
  fuselage.addElement(0, 0.7, 22, geometry, fuselageMaterial);
  fuselage.rotateMesh(fuselage.children[1], - Math.PI/80, 'x');

  fuselage.addElement(0, 0, 0, new THREE.CylinderGeometry(1, 1, 1, 16), fuselageMaterial);  // So para fazer numero impar


  /* Airplane wings */
  // Criacao da forma das asas do aviao
  wingShape = new THREE.Shape();
  createShape(wingShape, 80, 4);
  extrudeSettings = { depth: 0.25, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

  // Left Wing
  wings.addElement(0, 4, 0, new THREE.ExtrudeGeometry(wingShape, extrudeSettings), fuselageMaterial); //Left Wing
  wings.rotateMesh(wings.children[0], Math.PI / 2, 'x');

  wings.addElement(-30, 0, -5, new THREE.CylinderGeometry(6, 7, 15, 16), fuselageMaterial); //Big cylinder
  wings.rotateMesh(wings.children[1], Math.PI / 2, 'x');
  wings.rotateMesh(wings.children[1], - Math.PI / 20, 'z');

  wings.addElement(-50, 2, -3, new THREE.CylinderGeometry(3, 4, 10, 16), fuselageMaterial); //Small cylinder
  wings.rotateMesh(wings.children[2], Math.PI / 2, 'x');
  wings.rotateMesh(wings.children[2], - Math.PI / 20, 'z');

  // Right Wing
  wings.addElement(0, 4, 0, new THREE.ExtrudeGeometry(wingShape, extrudeSettings), fuselageMaterial); //Right Wing
  wings.rotateMesh(wings.children[3], Math.PI / 2, 'x');
  wings.rotateMesh(wings.children[3], Math.PI, 'y');

  wings.addElement(30, 0, -5, new THREE.CylinderGeometry(6, 7, 15, 16), fuselageMaterial);  //Big cylinder
  wings.rotateMesh(wings.children[4], Math.PI / 2, 'x');
  wings.rotateMesh(wings.children[4], Math.PI / 20, 'z');

  wings.addElement(50, 2, -3, new THREE.CylinderGeometry(3, 4, 10, 16), fuselageMaterial);  //Small cylinder
  wings.rotateMesh(wings.children[5], Math.PI / 2, 'x');
  wings.rotateMesh(wings.children[5], Math.PI / 20, 'z');


  /* Airplane propellers */

  // Left Side
  propellers.addElement(-31.5, 0, -13, new THREE.ConeGeometry(2, 3, 16), propellerMaterial); //Big cone
  propellers.rotateMesh(propellers.children[0], - Math.PI / 2, 'x');
  propellers.rotateMesh(propellers.children[0], Math.PI / 20, 'z');

  propellers.addElement(-51, 2, -8, new THREE.ConeGeometry(1.5, 2.5, 16), propellerMaterial); //Small cone
  propellers.rotateMesh(propellers.children[1], - Math.PI / 2, 'x');
  propellers.rotateMesh(propellers.children[1], Math.PI / 20, 'z');

  propellers.addElement(-51, 2, -8.5, new THREE.BoxGeometry(0.5, 8, 0.1), propellerMaterial); //Small propeller
  propellers.rotateMesh(propellers.children[2], Math.PI / 20, 'y');

  propellers.addElement(-31.5, 0, -13, new THREE.BoxGeometry(1, 12, 0.1), propellerMaterial); //Big propeller
  propellers.rotateMesh(propellers.children[3], Math.PI / 20, 'y');

  // Right Side
  propellers.addElement(31.5, 0, -13, new THREE.ConeGeometry(2, 3, 16), propellerMaterial);  //Big cone
  propellers.rotateMesh(propellers.children[4], - Math.PI / 2, 'x');
  propellers.rotateMesh(propellers.children[4], - Math.PI / 20, 'z');

  propellers.addElement(51, 2, -8, new THREE.ConeGeometry(1.5, 2.5, 16), propellerMaterial);  //Small cone
  propellers.rotateMesh(propellers.children[5], - Math.PI / 2, 'x');
  propellers.rotateMesh(propellers.children[5], - Math.PI / 20, 'z');

  propellers.addElement(51, 2, -8.5, new THREE.BoxGeometry(0.5, 8, 0.1), propellerMaterial); //Small propeller
  propellers.rotateMesh(propellers.children[6], - Math.PI / 20, 'y');

  propellers.addElement(31.5, 0, -13, new THREE.BoxGeometry(1, 12, 0.1), propellerMaterial); //Big propeller
  propellers.rotateMesh(propellers.children[7], - Math.PI / 20, 'y');


  /* Airplane stabilizers */

  horizontalStabilizer = new THREE.Shape();
  createShape(horizontalStabilizer, 25, 0.5);
  extrudeSettings = { depth: 0.25, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

  stabilizers.addElement(0, 3, 55, new THREE.ExtrudeGeometry(horizontalStabilizer, extrudeSettings), stabilizersMaterial); //Horizontal stabilizer
  stabilizers.rotateMesh(stabilizers.children[0], Math.PI / 2, 'x');

  stabilizers.addElement(-0, 3, 55, new THREE.ExtrudeGeometry(horizontalStabilizer, extrudeSettings), stabilizersMaterial); //Horizontal stabilizer
  stabilizers.rotateMesh(stabilizers.children[1], Math.PI / 2, 'x');
  stabilizers.rotateMesh(stabilizers.children[1], Math.PI, 'y');

  verticalStabilizer = new THREE.Shape();
  createShape(verticalStabilizer, 15, 1);
  extrudeSettings = { depth: 0.25, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 3, bevelThickness: 1 };

  stabilizers.addElement(0, 5, 55, new THREE.ExtrudeGeometry(verticalStabilizer, extrudeSettings), stabilizersMaterial); //Vertical stabilizer
  stabilizers.rotateMesh(stabilizers.children[2], - Math.PI / 2, 'y');
  stabilizers.rotateMesh(stabilizers.children[2], Math.PI, 'z');


  /* Cockpit */
  //TODO: falta adicionar mais uns quantos planos
  cockpit.addElement(0, 5.95, -40, new THREE.PlaneGeometry(2, 8, 16), cockpitMaterial);
  cockpit.rotateMesh(cockpit.children[0], Math.PI / 2, 'x');
  cockpit.rotateMesh(cockpit.children[0], - Math.PI / 25, 'x');

  airplane.add(fuselage);
  airplane.add(wings);
  airplane.add(propellers);
  airplane.add(stabilizers);
  airplane.add(cockpit);

  scene.add(airplane);

}

function createShape(shape, rectLength, rectWidth){
    shape.moveTo( 0, 0 );
    shape.lineTo( 0, rectWidth);
    shape.lineTo( rectLength, rectWidth );
    shape.lineTo( rectLength, 0 );
    shape.lineTo( 0, -15 );

    return shape;
}
