import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe } from 'lucide-react'

export default function LandingPage() {
    const globeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!globeRef.current) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(window.devicePixelRatio)

        const container = globeRef.current
        const resizeRenderer = () => {
            const { clientWidth, clientHeight } = container
            camera.aspect = clientWidth / clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(clientWidth, clientHeight)
        }
        resizeRenderer()
        container.appendChild(renderer.domElement)

        const geometry = new THREE.SphereGeometry(1, 32, 32)
        const textureLoader = new THREE.TextureLoader()
        const material = new THREE.MeshPhongMaterial()

        textureLoader.load(
            '/placeholder.svg?height=512&width=1024',
            (texture) => {
                material.map = texture
                material.needsUpdate = true
            },
            undefined,
            (error) => console.error('Texture loading failed:', error)
        )
        const globe = new THREE.Mesh(geometry, material)
        scene.add(globe)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)
        const pointLight = new THREE.PointLight(0xffffff, 0.5)
        pointLight.position.set(5, 3, 5)
        scene.add(pointLight)

        camera.position.z = 2.5

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableZoom = false
        controls.enablePan = false

        const animate = () => {
            globe.rotation.y += 0.005
            controls.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()

        window.addEventListener('resize', resizeRenderer)

        return () => {
            window.removeEventListener('resize', resizeRenderer)
            controls.dispose()
            renderer.dispose()
            scene.remove(globe)
            geometry.dispose()
            material.dispose()
            if (material.map) material.map.dispose()
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Lorem Ipsum Lorem Ipsum
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Join our lorem lorem lorem lorem opportunities across the globe.
                                Connect, collaborate, and grow with us.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div ref={globeRef} className="w-[300px] h-[300px]" />
                    </div>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {[
                        { icon: Globe, title: "Lorem Ipsum", description: "Lorem impsum lorem impus lorem lorem" },
                        { icon: Globe, title: "Lorem Ipsum", description: "Lorem impsum lorem impus lorem lorem" },
                        { icon: Globe, title: "Lorem Ipsum", description: "Lorem impsum lorem impus lorem lorem" },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <item.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold">{item.title}</h2>
                            <p className="text-center text-muted-foreground">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
