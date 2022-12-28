import { Text, Html, ContactShadows, PresentationControls, Float, useGLTF, Environment, PerspectiveCamera} from '@react-three/drei'
import { useSpring, a} from '@react-spring/three'
import { useState } from 'react'

export default function Experience()
{
    const computerModel = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
    const [active, setActive] = useState(false)

    const computerSpring = useSpring({
        position: active ? [-2, -1.555, 2.5]: [0, -1.2, 0],
        rotation: active ? [ -Math.PI / 80, -Math.PI / 4, 0]:[0, 0, 0],
        scale: active ? 1.5 : 1
    })

    return <>
        <Environment preset="city" />
        <color args={['#695b5b']} attach="background" />

        <PresentationControls //control limits to the rotation of the object
            global
            rotation={ [0.13,  0.1,  0] }
            polar={ [-0.4, 0.2] }
            azimuth={ [-1, 0.75] }
            config={{ mass: 2, tension: 400 }} //elastic effect
            snap={{ mass: 2, tension: 400 }} // snap back to original position
        >
        <Float rotationIntensity={ 0.4 }>
            <rectAreaLight
                width={ 2.5 }
                height={ 1.65 }
                intensity={ 65 }
                color={ '#ffffff' }
                rotation={ [0, 0.55, -1.15] }
                position={ [-0.1, Math.PI, 0] }
            />

        <a.mesh
            rotation={computerSpring.rotation}
            position={computerSpring.position}
            scale={computerSpring.scale}
        >
            <primitive
                    object={ computerModel.scene }
                >
                    <Html
                        transform
                        wrapperClass='htmlScreen'
                        distanceFactor={ 1.17 }
                        position={ [0, 1.56, -1.4] }
                        rotation-x={ -0.256 }
                    >
                        <iframe
                            src='https://www.sep.com'
                            onPointerOver={() =>{
                                setActive(true)
                            }}
                            onPointerOut={() => {
                                setActive(false)
                            }}
                        />
                    </Html>
                </primitive>
        </ a.mesh>

            <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={ 1 }
            position={ [ 2, 0.75, 0.75 ] }
            rotation-y={ -1.25 }
            maxWidth={ 2 }
            textAlign='center'
        >
            NICOLE SELIG
        </Text>
        </Float>
        </PresentationControls>

        <ContactShadows
            position-y={ -1.4 }
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.4 }
        />
    </>
}