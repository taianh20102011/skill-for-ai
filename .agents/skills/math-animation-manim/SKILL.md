---
name: math-animation-manim
description: Programmatic mathematical animation and visual proofs using 3Blue1Brown's Manim engine (Manim Community), TeX formulas, and geometric transforms.
---

# Mathematical Animation with Manim (3Blue1Brown Engine)

This skill governs the creation of mathematical animations, geometric proofs, calculus visualizations, and algorithmic demonstrations using **Manim** (`manim` / Manim Community).

---

## 1. Core Manim Scene Anatomy

```python
from manim import *

class CalculusTheorem(Scene):
    def construct(self):
        # 1. Title with LaTeX formatting
        title = Title(r"The Fundamental Theorem of Calculus")
        self.play(Write(title))
        self.wait(0.5)

        # 2. Formula with color highlighting
        formula = MathTex(
            r"\int_a^b f(x)\,dx = F(b) - F(a)",
            substrings_to_isolate=["f(x)", "F(b)", "F(a)"]
        )
        formula.set_color_by_tex("f(x)", BLUE)
        formula.set_color_by_tex("F(b)", GREEN)
        formula.set_color_by_tex("F(a)", YELLOW)
        formula.next_to(title, DOWN, buff=1.0)

        self.play(FadeIn(formula, shift=UP))
        self.wait(1)

        # 3. Coordinate Plane and Function Graph
        axes = Axes(
            x_range=[0, 5, 1],
            y_range=[0, 10, 2],
            x_length=6,
            y_length=4,
            axis_config={"include_numbers": True}
        ).to_edge(DOWN)

        curve = axes.plot(lambda x: 0.5 * x**2, color=BLUE)
        area = axes.get_area(curve, x_range=[1, 4], color=[BLUE, TEAL], opacity=0.5)

        self.play(Create(axes), Create(curve))
        self.play(FadeIn(area))
        self.wait(2)
```

---

## 2. Dynamic Formula Transformations (`TransformMatchingTex`)

Seamlessly morph one equation into another without jumping:

```python
class EquationDerivation(Scene):
    def construct(self):
        step1 = MathTex(r"E = mc^2")
        step2 = MathTex(r"m = \frac{E}{c^2}")

        self.play(Write(step1))
        self.wait(1)
        self.play(TransformMatchingTex(step1, step2))
        self.wait(2)
```

---

## 3. 3D Mathematical Surfaces & Camera Motion

```python
class Surface3D(ThreeDScene):
    def construct(self):
        axes = ThreeDAxes()
        surface = Surface(
            lambda u, v: np.array([u, v, np.sin(np.sqrt(u**2 + v**2))]),
            u_range=[-3, 3],
            v_range=[-3, 3],
            checkerboard_colors=[BLUE_D, BLUE_B]
        )

        self.set_camera_orientation(phi=65 * DEGREES, theta=30 * DEGREES)
        self.play(Create(axes), Create(surface))
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(4)
```

---

## 4. Headless Execution & CLI Rendering Flags

- **Quick Draft Preview (Low Quality, Fast Render)**:
  ```bash
  manim -pql scene.py CalculusTheorem
  ```
- **Production 4K 60FPS Video**:
  ```bash
  manim -pqk --fps 60 scene.py CalculusTheorem
  ```
- **Transparent Background (for Web / Remotion Overlays)**:
  ```bash
  manim -pql -t scene.py CalculusTheorem
  ```
- **Export GIF**:
  ```bash
  manim -pql --format=gif scene.py CalculusTheorem
  ```
