import THREE from 'three'
import lerp from 'lerp'

//a and b should be THREE.Vector3
export default function lerp3d(a, b, alpha) {
    const x = a.x + (b.x - a.x) * alpha;
    const y = a.y + (b.y - a.y) * alpha;
    const z = a.z + (b.z - a.z) * alpha;

    return new THREE.Vector3(x, y, z);
}