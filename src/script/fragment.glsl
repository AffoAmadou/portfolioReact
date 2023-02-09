varying vec2 vUv;
varying float VNoise;

uniform float time;
uniform float color;
void main() {

    vec3 color2 = vec3(1., 1., 1.);
    vec3 color1 = vec3(0., 0., 0.);
    if(color == 1.0) {
        color2 = vec3(1., 1., 1.);
        color1 = vec3(0., 0., 0.);
    } else {
        color1 = vec3(1., 1., 1.);
        color2 = vec3(1., 0., 0.);
    }
    vec3 color3 = mix(color1, color2, .5 * (VNoise + .5));

    gl_FragColor = vec4(color3, 1.);
}
