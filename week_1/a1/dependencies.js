window.Basic_Shader = window.classes.Basic_Shader =
    class Basic_Shader extends Shader {
        // Simplest example shader.  Sample pixels from colors that are simply assigned to each vertex.
        material() {
            return {shader: this}
        }

        // Materials here are minimal, without any settings.
        map_attribute_name_to_buffer_name(name)
        // We'll pull single values out per vertex by name.  Map those names onto the arrays we'll pull them from.
        {
            return {object_space_pos: "positions", color: "colors"}[name];
        }

        update_GPU(g_state, model_transform, material, gpu = this.g_addrs, gl = this.gl)
        // Define how to synchronize our JavaScript's variables to the GPU's:
        {
            const [P, C, M] = [g_state.projection_transform, g_state.camera_transform, model_transform],
                PCM = P.times(C).times(M);
            gl.uniformMatrix4fv(gpu.projection_camera_model_transform_loc, false, Mat.flatten_2D_to_1D(PCM.transposed()));
        }

        shared_glsl_code()            // ********* SHARED CODE INCLUDED IN BOTH SHADERS *********
        {
            return `precision mediump float;
                    varying vec4 VERTEX_COLOR;`;
        }

        vertex_glsl_code()           // ********* VERTEX SHADER *********
        {
            return `
            attribute vec4 color;
            attribute vec3 object_space_pos;
            uniform mat4 projection_camera_model_transform;
    
            void main()
            { gl_Position = projection_camera_model_transform * vec4(object_space_pos, 1.0);      // The vertex's final resting place onscreen in normalized coords.         
              VERTEX_COLOR = color;
            }`;
        }

        fragment_glsl_code()           // ********* FRAGMENT SHADER *********
        {
            return `
            void main()
            { gl_FragColor = VERTEX_COLOR;
            }`;
        }
    };

window.Minimal_Shape = window.classes.Minimal_Shape =
    class Minimal_Shape extends Vertex_Buffer {
        // The simplest possible Shape – one triangle.  It has 3 vertices, each
        // containing two values: a 3D position and a color.
        constructor() {
            super("positions", "colors");
            // Name the values we'll define per each vertex.
            this.positions = [
                Vec.of(0, 0, 0), Vec.of(1, 0, 0), Vec.of(0, 1, 0),
            ];
            // Describe the where the points of a triangle are in space.
            this.colors = [
                Color.of(1, 0, 0, 1), Color.of(0, 1, 0, 1), Color.of(0, 0, 1, 1),
            ];
            // Besides a position, vertices also have a color.
            this.indexed = false;
            // With this turned off, every three vertices will be interpreted as one triangle.
        }
    };
