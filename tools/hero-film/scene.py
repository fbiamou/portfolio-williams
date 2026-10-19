# Hero cinématique : travelling à travers réseau -> anneaux (marque) -> grille d'outils, arrêt sur image calme.
# Usage : blender -b -P scene.py -- <dossier_sortie> <largeur> <hauteur> <images> [première] [dernière]
import bpy, sys, math, random
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:]
out, W, H, N = argv[0], int(argv[1]), int(argv[2]), int(argv[3])
f0 = int(argv[4]) if len(argv) > 4 else 1
f1 = int(argv[5]) if len(argv) > 5 else N
random.seed(7)

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE'
sc.render.resolution_x, sc.render.resolution_y = W, H
sc.render.resolution_percentage = 100
sc.render.image_settings.file_format = 'PNG'
sc.render.filepath = out + '/f_'
sc.frame_start, sc.frame_end = 1, N
try: sc.eevee.taa_render_samples = 24
except Exception: pass
sc.view_settings.view_transform = 'AgX'
sc.view_settings.look = 'None'

# monde : #0b0d10 teinté
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
bg = w.node_tree.nodes['Background']; bg.inputs[0].default_value = (0.004, 0.006, 0.009, 1); bg.inputs[1].default_value = 1

def emit(name, color, strength):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    e = nt.nodes.new('ShaderNodeEmission'); e.inputs[0].default_value = color; e.inputs[1].default_value = strength
    o = nt.nodes.new('ShaderNodeOutputMaterial'); nt.links.new(e.outputs[0], o.inputs[0])
    return m

CY = (0.0, 0.52, 0.8, 1)       # #00a8cc
CY2 = (0.37, 0.84, 0.94, 1)    # #5fd6ef
mat_ring = emit('ring', CY, 2.0)
mat_ring2 = emit('ring2', CY2, 3.2)
mat_node = emit('node', CY2, 9.0)
mat_line = emit('line', CY, 0.9)
mat_tile = emit('tile', (0.02, 0.07, 0.09, 1), 0.35)

def put(obj, mat):
    obj.data.materials.append(mat); return obj

L = 60.0  # longueur du couloir (axe -Y)
# anneaux (marque) le long du couloir
for i, y in enumerate([-8, -17, -27, -38, -50]):
    r = 3.2 + i * 0.35
    bpy.ops.mesh.primitive_torus_add(major_radius=r, minor_radius=0.035 + 0.01 * (i % 2), major_segments=96, minor_segments=8,
                                     location=(0, y, 0), rotation=(math.radians(90), 0, 0))
    put(bpy.context.object, mat_ring2 if i == 4 else mat_ring)
# anneau final large (zone de repos)
bpy.ops.mesh.primitive_torus_add(major_radius=5.2, minor_radius=0.06, major_segments=128, minor_segments=8,
                                 location=(0, -58, 0), rotation=(math.radians(90), 0, 0))
put(bpy.context.object, mat_ring2)

# nœuds + liaisons (réseau) dans la première moitié
pts = []
for _ in range(110):
    p = Vector((random.uniform(-7, 7), random.uniform(-50, 2), random.uniform(-4, 5)))
    if Vector((p.x, 0, p.z)).length < 1.7: continue
    pts.append(p)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=random.uniform(.03, .09), location=p)
    put(bpy.context.object, mat_node)
def link(a, b):
    cu = bpy.data.curves.new('c', 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.006
    sp = cu.splines.new('POLY'); sp.points.add(1)
    sp.points[0].co = (*a, 1); sp.points[1].co = (*b, 1)
    ob = bpy.data.objects.new('l', cu); sc.collection.objects.link(ob); put(ob, mat_line)
for a in pts:
    near = sorted(pts, key=lambda q: (q - a).length)[1:3]
    for b in near:
        if (b - a).length < 5.5: link(a, b)

# grille d'outils (cartes de verre) dans la seconde moitié, arrivée calme
for i in range(26):
    ang = random.uniform(0, 2 * math.pi); rr = random.uniform(2.6, 6.4)
    y = random.uniform(-56, -22)
    bpy.ops.mesh.primitive_plane_add(size=1, location=(math.cos(ang) * rr, y, math.sin(ang) * rr * .7),
                                     rotation=(math.radians(90), 0, math.radians(random.uniform(-12, 12))))
    o = bpy.context.object; o.scale = (random.uniform(.5, 1.1), random.uniform(.35, .7), 1)
    put(o, mat_tile)
    # liseré lumineux
    bpy.ops.mesh.primitive_plane_add(size=1, location=o.location, rotation=o.rotation_euler)
    o2 = bpy.context.object; o2.scale = (o.scale.x * 1.0, 0.012, 1); o2.location.z -= o.scale.y / 2; o2.location.y += 0.001
    put(o2, mat_line)

# poussière lumineuse (profondeur)
for _ in range(260):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=random.uniform(.008, .028),
        location=(random.uniform(-9, 9), random.uniform(-62, 6), random.uniform(-4, 7)))
    put(bpy.context.object, mat_node)

# sol : fines lignes de fuite
for k in range(-12, 13):
    cu = bpy.data.curves.new('g', 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 0.004
    sp = cu.splines.new('POLY'); sp.points.add(1)
    sp.points[0].co = (k * 1.2, 6, -4.2, 1); sp.points[1].co = (k * 1.2, -64, -4.2, 1)
    ob = bpy.data.objects.new('g', cu); sc.collection.objects.link(ob); put(ob, mat_line)

# caméra : travelling avec arrêt doux (easing sortie)
cam_d = bpy.data.cameras.new('cam'); cam_d.lens = 28
cam = bpy.data.objects.new('cam', cam_d); sc.collection.objects.link(cam); sc.camera = cam
def ease(t): return 1 - (1 - t) ** 3  # easeOutCubic
for f in range(1, N + 1):
    t = (f - 1) / (N - 1)
    e = 0.55 * t + 0.45 * ease(t)  # départ vif, arrivée calme
    y = 4 - 60 * e
    cam.location = (math.sin(t * 2.4) * 0.5 * (1 - t), y, 0.25 + math.sin(t * 3.0) * 0.18 * (1 - t))
    cam.rotation_euler = (math.radians(90) + math.sin(t * 2.0) * .012, 0, math.sin(t * 2.4) * .02 * (1 - t))
    cam.keyframe_insert('location', frame=f); cam.keyframe_insert('rotation_euler', frame=f)

for f in range(f0, f1 + 1):
    sc.frame_set(f); sc.render.filepath = f'{out}/f_{f:04d}.png'
    bpy.ops.render.render(write_still=True)
