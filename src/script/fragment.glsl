uniform sampler2D oceanTexture;
varying vec2 vUv;
varying float VNoise;

void main() {
    vec3 color2 = vec3(1., 0., 1.);
    vec3 color1 = vec3(0.1, 0.5, 1.);
    vec3 color3 = mix(color1, color2, VNoise);
    
    gl_FragColor = vec4(color3,.8);
}