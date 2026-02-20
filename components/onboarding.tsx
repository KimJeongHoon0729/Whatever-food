"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Shuffle, RotateCw, Link2, X } from "lucide-react"
import { RiceBallMascot, DumplingMascot, TacoMascot, BowlMascot, SparkleIcon } from "@/components/cute-mascots"

const ONBOARDING_KEY = "whatever-onboarding-done"

interface OnboardingProps {
  onDone: () => void
}

const SLIDES = [
  {
    id: "welcome",
    bg: "from-primary/20 via-background to-background",
    mascot: "riceball",
    badge: "안녕하세요 👋",
    title: "오늘 뭐 먹을지\n고민되시나요?",
    desc: "Whatever가 대신 골라드릴게요.\n취향 저격 메뉴를 딱 골라줘요!",
    accent: "#F5B7B1",
  },
  {
    id: "filter",
    bg: "from-accent/30 via-background to-background",
    mascot: "dumpling",
    badge: "기능 1",
    title: "조건 뽑기",
    desc: "먹고 싶은 종류와 맛을 고르면\n딱 맞는 메뉴를 추천해줘요.\n숫자는 해당 조건의 메뉴 수예요!",
    accent: "#F9E79F",
    demo: "filter",
  },
  {
    id: "roulette",
    bg: "from-[#D5F5E3]/60 via-background to-background",
    mascot: "taco",
    badge: "기능 2",
    title: "룰렛 돌리기",
    desc: "내 메뉴를 직접 고르거나 랜덤으로 뽑아서\n룰렛을 돌려요.\n필터랑 서로 연결돼 있어요!\n\n⚙️ 설정에서 시작 화면도 바꿀 수 있어요.",
    accent: "#D5F5E3",
    demo: "roulette",
  },
]

function MascotByType({ type, size }: { type: string; size: number }) {
  if (type === "riceball") return <RiceBallMascot size={size} />
  if (type === "dumpling") return <DumplingMascot size={size} />
  if (type === "taco") return <TacoMascot size={size} />
  if (type === "bowl") return <BowlMascot size={size} />
  return null
}

function FilterDemo() {
  const tags = [
    { label: "한식 🍚", active: true },
    { label: "중식 🥟", active: false },
    { label: "일식 🍣", active: false },
  ]
  const tastes = [
    { label: "🌶️ 매콤한", count: 90, active: true },
    { label: "✨ 깔끔한", count: 96, active: false },
    { label: "🧈 느끼한", count: 88, active: false },
  ]
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-2xl border border-border bg-card p-4 shadow-sm space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">음식 종류</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t.label}
            className={`rounded-full border-2 px-2.5 py-1 text-xs font-bold ${
              t.active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            {t.label}
          </span>
        ))}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">맛</p>
      <div className="flex flex-wrap gap-1.5">
        {tastes.map((t) => (
          <span
            key={t.label}
            className={`flex items-center gap-1 rounded-full border-2 px-2.5 py-1 text-xs font-bold ${
              t.active
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            {t.label}
            <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-extrabold ${t.active ? "bg-accent-foreground/20" : "bg-muted"}`}>
              {t.count}
            </span>
          </span>
        ))}
      </div>
      <div className="rounded-xl bg-primary px-3 py-2 text-center text-xs font-extrabold text-primary-foreground">
        🍖 제육볶음
      </div>
    </div>
  )
}

function RouletteDemo() {
  const items = ["김치찌개", "파스타", "초밥", "치킨", "떡볶이", "라멘"]
  return (
    <div className="mx-auto w-full max-w-[280px] space-y-2">
      {/* mini wheel placeholder */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-card shadow-lg overflow-hidden">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {items.map((_, i) => {
              const colors = ["#F5B7B1","#FDEBD0","#D5F5E3","#D6EAF8","#F9E79F","#E8DAEF"]
              const sliceAngle = 360 / items.length
              const startAngle = i * sliceAngle - 90
              const endAngle = startAngle + sliceAngle
              const toRad = (d: number) => (d * Math.PI) / 180
              const x1 = 50 + 50 * Math.cos(toRad(startAngle))
              const y1 = 50 + 50 * Math.sin(toRad(startAngle))
              const x2 = 50 + 50 * Math.cos(toRad(endAngle))
              const y2 = 50 + 50 * Math.sin(toRad(endAngle))
              return (
                <path
                  key={i}
                  d={`M50,50 L${x1},${y1} A50,50 0 0,1 ${x2},${y2} Z`}
                  fill={colors[i % colors.length]}
                  stroke="white"
                  strokeWidth="1"
                />
              )
            })}
          </svg>
          <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-primary text-[9px] font-extrabold text-primary-foreground shadow-md">
            SPIN!
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {["필터 추천 결과를", "룰렛에 추가!"].map((line, i) => (
            <div key={i} className={`rounded-xl px-2.5 py-1.5 text-[10px] font-bold ${i === 0 ? "bg-primary/10 text-primary" : "bg-accent/50 text-accent-foreground"}`}>
              {line}
            </div>
          ))}
          <div className="flex items-center gap-1 rounded-xl border border-primary/20 px-2.5 py-1.5">
            <Link2 className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-bold text-primary">서로 연결됨</span>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-primary p-2.5 text-center">
        <p className="text-[10px] font-bold text-primary-foreground/70">당첨! 🎉</p>
        <p className="text-sm font-extrabold text-primary-foreground">초밥</p>
      </div>
    </div>
  )
}

export function Onboarding({ onDone }: OnboardingProps) {
  const [current, setCurrent] = useState(0)
  const [exiting, setExiting] = useState(false)
  const isLast = current === SLIDES.length - 1

  const goNext = () => {
    if (isLast) {
      finish()
      return
    }
    setExiting(true)
    setTimeout(() => {
      setCurrent((p) => p + 1)
      setExiting(false)
    }, 200)
  }

  const finish = () => {
    try {
      window.localStorage.setItem(ONBOARDING_KEY, "done")
    } catch { /* ignore */ }
    onDone()
  }

  const slide = SLIDES[current]

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Skip */}
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-primary" : i < current ? "w-1.5 bg-primary/40" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          onClick={finish}
          className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-muted-foreground hover:bg-muted transition-colors"
        >
          건너뛰기
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* Content */}
      <div
        className={`flex flex-1 flex-col items-center justify-between px-6 pb-8 pt-4 transition-all duration-200 ${
          exiting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Top: badge + mascot + bg glow */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 w-full">
          {/* Badge */}
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
            {slide.badge}
          </span>

          {/* Mascot with glow */}
          <div className="relative flex items-center justify-center">
            <div
              className="absolute h-40 w-40 rounded-full opacity-30 blur-3xl"
              style={{ backgroundColor: slide.accent }}
            />
            <div className="relative animate-[bounce_3s_ease-in-out_infinite]">
              <MascotByType type={slide.mascot} size={100} />
            </div>
            {/* sparkles */}
            <SparkleIcon size={14} className="absolute -right-2 top-2 text-primary animate-pulse" />
            <SparkleIcon size={10} className="absolute -left-3 bottom-4 text-accent-foreground animate-pulse delay-500" />
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="whitespace-pre-line text-2xl font-extrabold leading-tight text-foreground">
              {slide.title}
            </h2>
            <p className="mt-2 whitespace-pre-line text-sm font-medium leading-relaxed text-muted-foreground">
              {slide.desc}
            </p>
          </div>

          {/* Demo UI */}
          <div className="w-full mt-1">
            {slide.demo === "filter" && <FilterDemo />}
            {slide.demo === "roulette" && <RouletteDemo />}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={goNext}
          className="group mt-6 flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl active:scale-[0.97]"
        >
          {isLast ? "시작하기 🎉" : "다음"}
          {!isLast && (
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          )}
        </button>
      </div>
    </div>
  )
}

// 최초 실행 여부 체크 훅
export function useOnboarding() {
  const [show, setShow] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    try {
      const done = window.localStorage.getItem(ONBOARDING_KEY)
      setShow(done !== "done")
    } catch {
      setShow(false)
    }
    setChecked(true)
  }, [])

  const dismiss = () => setShow(false)
  const resetOnboarding = () => {
    try { window.localStorage.removeItem(ONBOARDING_KEY) } catch { /* ignore */ }
    setShow(true)
  }

  return { show: checked && show, dismiss, resetOnboarding }
}
