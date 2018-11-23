var mesh;

class Objeto extends THREE.Object3D {

    constructor() {
        super();
    }

    createMesh(geometry, material, x, y, z) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);

        return mesh;
    }

    rotateMesh(obj, angle, axis) {
        switch(axis) {
            case 'x':
                obj.rotateX(angle);
                break;
            case 'y':
                obj.rotateY(angle);
                break;
            case 'z':
                obj.rotateZ(angle);
                break;
        }
    }

    addElement(x, y, z, geometry, material) {
		    this.add(this.createMesh(geometry, material, x, y, z));
    }

    addToScene(mesh) {
        scene.add(mesh);
    }
}
