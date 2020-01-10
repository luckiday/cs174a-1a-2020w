window.Minimal_Webgl_Demo = window.classes.Minimal_Webgl_Demo =
    class Minimal_Webgl_Demo extends Scene_Component {
        constructor(context, control_panel) {
            super(context, control_panel);
            this.submit_shapes(context, {triangle: new Minimal_Shape()});
            // Send a Triangle's vertices to the GPU's buffers.
            this.shader = context.get_instance(Basic_Shader).material();
        }

        display(graphics_state)
        // Do this every frame.
        {
            this.shapes.triangle.draw(graphics_state, Mat4.identity(), this.shader);
            // Draw the triangle.
        }

        make_control_panel()
        // Draw buttons, setup their actions and keyboard shortcuts, and monitor live variables.
        {
            this.control_panel.innerHTML += "(This one has no controls)";
        }
    };