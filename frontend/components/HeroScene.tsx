'use client'

import { Environment, Float, Html as DreiHtml, OrbitControls, Stars, useCursor, useGLTF, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Link from 'next/link'
import { Suspense, useMemo, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { Box3, Group, Vector3 } from 'three'
import { recordIslandClick } from '@/lib/interactions'
import styles from './HeroScene.module.css'

type IslandId = 'about' | 'career' | 'research' | 'project' | 'server' | 'github' | 'contact'

type IslandConfig = {
  id: IslandId
  title: string
  description: string
  modelUrl: string
  href: string
  external: boolean
  position: [number, number, number]
  visualSize: number
  yawOffset: number
  pitch?: number
  roll?: number
}

const ringRadius = 3.5

function getRingPosition(index: number, radius: number): [number, number, number] {
  const angle = -Math.PI / 2 + index * (Math.PI * 2) / 6

  return [
    Math.cos(angle) * radius,
    0,
    Math.sin(angle) * radius,
  ]
}

const islands: IslandConfig[] = [
  {
    id: 'about',
    title: 'About',
    description: 'このポートフォリオ自身の設計・実装・運用について説明します。',
    modelUrl: '/models/about.glb',
    href: '/about',
    external: false,
    position: [0, 0, 0],
    visualSize: 2.8,
    yawOffset: 0,
  },
  {
    id: 'career',
    title: 'Career',
    description: '学歴、業務経験、スキル、これまでの経歴を説明します。',
    modelUrl: '/models/career.glb',
    href: '/career',
    external: false,
    position: getRingPosition(0, ringRadius),
    visualSize: 2.65,
    yawOffset: 0,
  },
  {
    id: 'research',
    title: 'Research',
    description: '研究、数値計算、制御、最適化に関する取り組みを説明します。',
    modelUrl: '/models/research.glb',
    href: '/research',
    external: false,
    position: getRingPosition(1, ringRadius),
    visualSize: 2.65,
    yawOffset: 1.7,
  },
  {
    id: 'project',
    title: 'Project',
    description: '個人開発、制作物、アプリケーション開発について説明します。',
    modelUrl: '/models/project.glb',
    href: '/projects',
    external: false,
    position: getRingPosition(2, ringRadius),
    visualSize: 2.65,
    yawOffset: 0,
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'GitHub の外部リポジトリへ移動します。',
    modelUrl: '/models/github.glb',
    href: 'https://github.com/navyracooon',
    external: true,
    position: getRingPosition(3, ringRadius),
    visualSize: 2.65,
    yawOffset: 0,
  },
  {
    id: 'contact',
    title: 'Contact',
    description: '問い合わせページへ移動します。',
    modelUrl: '/models/contact.glb',
    href: '/contact',
    external: false,
    position: getRingPosition(4, ringRadius),
    visualSize: 2.65,
    yawOffset: 0,
  },
  {
    id: 'server',
    title: 'Server',
    description: '自宅サーバ、Docker、リバースプロキシ、インフラ運用について説明します。',
    modelUrl: '/models/server.glb',
    href: '/server',
    external: false,
    position: getRingPosition(5, ringRadius),
    visualSize: 2.65,
    yawOffset: 0.0,
  },
]

function LoadingLabel() {
  const { progress } = useProgress()

  return (
    <DreiHtml center>
      <div
        style={{
          padding: '10px 14px',
          borderRadius: '999px',
          background: 'rgba(5, 9, 20, 0.75)',
          color: '#eaf7ff',
          fontSize: '13px',
          border: '1px solid rgba(120, 220, 255, 0.35)',
          whiteSpace: 'nowrap',
        }}
      >
        Loading {Math.round(progress)}%
      </div>
    </DreiHtml>
  )
}

function IslandLabel({ title, visible }: { title: string; visible: boolean }) {
  return (
    <DreiHtml
      center
      position={[0, 2.2, 0]}
      distanceFactor={8}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 160ms ease',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          padding: '8px 12px',
          borderRadius: '999px',
          background: 'rgba(5, 9, 20, 0.72)',
          color: '#f5f7fb',
          fontSize: '12px',
          fontWeight: 700,
          border: '1px solid rgba(120, 220, 255, 0.42)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(12px)',
        }}
      >
        {title}
      </div>
    </DreiHtml>
  )
}

function getYawFacingCenter(position: [number, number, number]) {
  const [x, , z] = position

  if (x === 0 && z === 0) {
    return 0
  }

  return Math.atan2(-x, -z)
}

function useNormalizedScene(modelUrl: string, visualSize: number) {
  const gltf = useGLTF(modelUrl)

  return useMemo(() => {
    const scene = gltf.scene.clone(true) as Group
    scene.updateMatrixWorld(true)

    const box = new Box3().setFromObject(scene)
    const size = new Vector3()
    const center = new Vector3()

    box.getSize(size)
    box.getCenter(center)

    const maxSize = Math.max(size.x, size.y, size.z)
    const scale = maxSize > 0 ? visualSize / maxSize : 1
    const yOffset = -box.min.y

    return {
      scene,
      offset: [-center.x, yOffset, -center.z] as [number, number, number],
      scale,
    }
  }, [gltf.scene, visualSize])
}

function IslandModel({
  island,
  active,
  onSelect,
}: {
  island: IslandConfig
  active: boolean
  onSelect: (island: IslandConfig) => void
}) {
  const [hovered, setHovered] = useState(false)
  const { scene, offset, scale } = useNormalizedScene(island.modelUrl, island.visualSize)

  useCursor(hovered)

  const interactionScale = active ? 1.08 : hovered ? 1.04 : 1
  const baseYaw = getYawFacingCenter(island.position)
  const finalYaw = baseYaw + island.yawOffset
  const pitch = island.pitch ?? 0
  const roll = island.roll ?? 0

  function handlePointerEnter(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation()
    setHovered(true)
  }

  function handlePointerLeave(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation()
    setHovered(false)
  }

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation()
    onSelect(island)
  }

  return (
    <Float speed={1.15} rotationIntensity={0.025} floatIntensity={0.08}>
      <group
        position={island.position}
        rotation={[pitch, finalYaw, roll]}
        scale={interactionScale}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <group scale={scale}>
          <primitive object={scene} position={offset} />
        </group>
        <IslandLabel title={island.title} visible={hovered || active} />
      </group>
    </Float>
  )
}

function IslandField({
  selected,
  onSelect,
}: {
  selected: IslandConfig | null
  onSelect: (island: IslandConfig) => void
}) {
  return (
    <group position={[0, -1.0, 0]}>
      {islands.map((island) => (
        <IslandModel
          key={island.id}
          island={island}
          active={selected?.id === island.id}
          onSelect={onSelect}
        />
      ))}
    </group>
  )
}

function SelectedPanel({
  selected,
  onClose,
}: {
  selected: IslandConfig | null
  onClose: () => void
}) {
  if (!selected) {
    return (
      <aside className={styles.objectPopup} aria-live="polite">
        <p className="eyebrow">Portfolio Village</p>
        <h3>Floating Islands</h3>
        <p>島をクリックすると，対応するカテゴリを確認できます。</p>
      </aside>
    )
  }

  return (
    <aside key={selected.id} className={`${styles.objectPopup} ${styles.objectPopupSelected}`} aria-live="polite">
      <button
        type="button"
        onClick={onClose}
        className={styles.closeButton}
      >
        ×
      </button>
      <p className="eyebrow">Village island</p>
      <h3>{selected.title}</h3>
      <p>{selected.description}</p>
      <div className="cta-row">
        {selected.external ? (
          <a href={selected.href} className="button-primary" target="_blank" rel="noreferrer">
            Open
          </a>
        ) : (
          <Link href={selected.href} className="button-primary">
            View detail
          </Link>
        )}
      </div>
    </aside>
  )
}

export function HeroScene() {
  const [selected, setSelected] = useState<IslandConfig | null>(null)

  function handleSelect(island: IslandConfig) {
    setSelected(island)
    void recordIslandClick({ islandId: island.id, href: island.href }).catch(() => undefined)
  }

  return (
    <div className={styles.sceneShell}>
      <div className={`${styles.heroCanvas} ${styles.villageCanvas}`}>
        <Canvas camera={{ position: [0, 4.9, 6.5], fov: 45 }} dpr={1} frameloop="demand">
          <color attach="background" args={['#050914']} />
          <fog attach="fog" args={['#050914', 12, 27]} />

          <ambientLight intensity={0.9} />
          <directionalLight position={[7, 9, 5]} intensity={2.2} color="#fff4d8" />
          <pointLight position={[0, 4.2, 0]} intensity={1.4} color="#73d7ff" />
          <pointLight position={[-4, 3.2, 3]} intensity={1.0} color="#f2c98a" />
          <pointLight position={[4, 3.2, -3]} intensity={0.85} color="#9fe8ff" />

          <Stars radius={48} depth={22} count={700} factor={2.2} saturation={0} fade speed={0.25} />

          <Suspense fallback={<LoadingLabel />}>
            <IslandField selected={selected} onSelect={handleSelect} />
            <Environment preset="city" />
          </Suspense>

          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={4.2}
            maxDistance={13}
            minPolarAngle={0.9}
            maxPolarAngle={1.35}
            target={[0, 0.35, 0]}
          />
        </Canvas>
      </div>

      <SelectedPanel selected={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

useGLTF.preload('/models/about.glb')
useGLTF.preload('/models/career.glb')
useGLTF.preload('/models/research.glb')
useGLTF.preload('/models/project.glb')
useGLTF.preload('/models/server.glb')
useGLTF.preload('/models/github.glb')
useGLTF.preload('/models/contact.glb')
