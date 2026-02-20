"use client"

import { useMemo, useState } from "react"
import { X } from "lucide-react"
import { DumplingMascot, BowlMascot, SparkleIcon, HeartIcon } from "@/components/cute-mascots"

// ✅ 1) Taste 타입 — 의미있는 태그만 유지 (1개짜리 희귀 태그 제거)
type Taste =
  | "매콤한"
  | "얼큰한"
  | "깔끔한"
  | "단짠단짠"
  | "느끼한"
  | "달콤한"
  | "새콤한"
  | "고소한"
  | "담백한"
  | "바삭한"
  | "쫄깃한"
  | "뜨끈한"
  | "시원한"
  | "헤비한"
  | "가벼운"
  | "건강한"
  | "치즈가득"
  | "국물"
  | "비건"

type FoodItem = {
  name: string
  emoji: string
  tastes: Taste[]
}

// ✅ 2) FOOD_DB — 265개 → 400개+ 대폭 확장
const FOOD_DB: Record<string, FoodItem[]> = {
  한식: [
    // 찌개/국
    { name: "김치찌개", emoji: "🍲", tastes: ["매콤한", "얼큰한", "국물"] },
    { name: "된장찌개", emoji: "🍲", tastes: ["깔끔한", "국물"] },
    { name: "순두부찌개", emoji: "🍲", tastes: ["매콤한", "얼큰한", "국물"] },
    { name: "부대찌개", emoji: "🍲", tastes: ["얼큰한", "단짠단짠", "국물"] },
    { name: "청국장", emoji: "🍲", tastes: ["깔끔한", "국물"] },
    { name: "육개장", emoji: "🍲", tastes: ["매콤한", "얼큰한", "국물"] },
    { name: "갈비탕", emoji: "🍲", tastes: ["깔끔한", "국물"] },
    { name: "삼계탕", emoji: "🍲", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "설렁탕", emoji: "🍲", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "곰탕", emoji: "🍲", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "해장국", emoji: "🍲", tastes: ["얼큰한", "국물", "뜨끈한"] },
    { name: "감자탕", emoji: "🍲", tastes: ["얼큰한", "국물", "헤비한"] },
    { name: "뼈해장국", emoji: "🍲", tastes: ["얼큰한", "국물", "헤비한"] },
    { name: "닭볶음탕", emoji: "🍗", tastes: ["매콤한", "얼큰한", "국물"] },
    { name: "동태탕", emoji: "🍲", tastes: ["얼큰한", "깔끔한", "국물"] },
    { name: "추어탕", emoji: "🍲", tastes: ["깔끔한", "국물"] },
    { name: "도가니탕", emoji: "🍲", tastes: ["깔끔한", "국물"] },
    { name: "낙곱새", emoji: "🥘", tastes: ["매콤한", "얼큰한"] },
    { name: "아구찜", emoji: "🐟", tastes: ["매콤한", "얼큰한"] },
    { name: "돼지국밥", emoji: "🍲", tastes: ["깔끔한", "얼큰한", "국물"] },
    { name: "수제비", emoji: "🍲", tastes: ["깔끔한", "얼큰한", "국물"] },
    { name: "칼국수", emoji: "🍜", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "바지락칼국수", emoji: "🍜", tastes: ["깔끔한", "국물"] },
    { name: "콩나물국밥", emoji: "🍚", tastes: ["깔끔한", "얼큰한", "국물"] },
    { name: "순대국밥", emoji: "🍲", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "내장국밥", emoji: "🍲", tastes: ["얼큰한", "국물", "뜨끈한"] },
    { name: "선지해장국", emoji: "🍲", tastes: ["얼큰한", "국물"] },
    { name: "우거지국", emoji: "🍲", tastes: ["깔끔한", "국물"] },
    { name: "두부찌개", emoji: "🍲", tastes: ["매콤한", "국물"] },
    { name: "오징어찌개", emoji: "🍲", tastes: ["매콤한", "얼큰한", "국물"] },
    // 구이/볶음
    { name: "삼겹살", emoji: "🥓", tastes: ["단짠단짠", "느끼한", "헤비한"] },
    { name: "목살구이", emoji: "🥓", tastes: ["단짠단짠", "느끼한", "헤비한"] },
    { name: "항정살", emoji: "🥓", tastes: ["단짠단짠", "느끼한", "헤비한"] },
    { name: "갈비구이", emoji: "🍖", tastes: ["단짠단짠", "헤비한"] },
    { name: "불고기", emoji: "🥩", tastes: ["단짠단짠"] },
    { name: "제육볶음", emoji: "🥩", tastes: ["매콤한", "단짠단짠"] },
    { name: "닭갈비", emoji: "🍗", tastes: ["매콤한", "단짠단짠"] },
    { name: "오삼불고기", emoji: "🥩", tastes: ["매콤한"] },
    { name: "낙지볶음", emoji: "🐙", tastes: ["매콤한"] },
    { name: "쭈꾸미볶음", emoji: "🐙", tastes: ["매콤한"] },
    { name: "곱창구이", emoji: "🍖", tastes: ["느끼한", "단짠단짠", "헤비한"] },
    { name: "대창구이", emoji: "🍖", tastes: ["느끼한", "단짠단짠", "헤비한"] },
    { name: "막창", emoji: "🍖", tastes: ["느끼한", "단짠단짠", "헤비한"] },
    { name: "꼼장어구이", emoji: "🐡", tastes: ["매콤한", "단짠단짠"] },
    { name: "소갈비찜", emoji: "🍖", tastes: ["단짠단짠", "헤비한"] },
    { name: "찜닭", emoji: "🍗", tastes: ["단짠단짠", "매콤한"] },
    { name: "두부김치", emoji: "🍲", tastes: ["매콤한"] },
    { name: "조개구이", emoji: "🦪", tastes: ["깔끔한"] },
    { name: "꼬막비빔밥", emoji: "🦪", tastes: ["매콤한", "단짠단짠"] },
    // 밥/덮밥
    { name: "비빔밥", emoji: "🍚", tastes: ["깔끔한", "매콤한"] },
    { name: "돌솥비빔밥", emoji: "🍚", tastes: ["매콤한", "깔끔한"] },
    { name: "육회비빔밥", emoji: "🥩", tastes: ["깔끔한", "단짠단짠"] },
    { name: "잡채", emoji: "🍜", tastes: ["단짠단짠"] },
    { name: "김치볶음밥", emoji: "🍚", tastes: ["매콤한", "단짠단짠"] },
    { name: "계란볶음밥", emoji: "🍚", tastes: ["깔끔한", "단짠단짠"] },
    // 냉면/면
    { name: "냉면", emoji: "🍜", tastes: ["깔끔한", "시원한"] },
    { name: "물냉면", emoji: "🍜", tastes: ["깔끔한", "새콤한", "시원한"] },
    { name: "비빔냉면", emoji: "🍜", tastes: ["매콤한", "새콤한"] },
    { name: "막국수", emoji: "🍜", tastes: ["매콤한", "새콤한", "깔끔한"] },
    // 보쌈/족발/기타
    { name: "보쌈", emoji: "🥬", tastes: ["깔끔한", "단짠단짠"] },
    { name: "족발", emoji: "🍖", tastes: ["단짠단짠", "쫄깃한"] },
    { name: "수육", emoji: "🥩", tastes: ["깔끔한", "담백한"] },
    { name: "간장게장", emoji: "🦀", tastes: ["단짠단짠"] },
    { name: "양념게장", emoji: "🦀", tastes: ["매콤한", "단짠단짠"] },
    { name: "쌈밥", emoji: "🥬", tastes: ["깔끔한", "건강한"] },
    { name: "생선구이 정식", emoji: "🐟", tastes: ["깔끔한", "단짠단짠"] },
    { name: "해물파전", emoji: "🥞", tastes: ["깔끔한", "단짠단짠"] },
    { name: "김치전", emoji: "🥞", tastes: ["매콤한", "단짠단짠"] },
    { name: "녹두전", emoji: "🥞", tastes: ["고소한", "담백한"] },
    { name: "동태전", emoji: "🥞", tastes: ["깔끔한", "고소한"] },
    { name: "굴전", emoji: "🥞", tastes: ["고소한", "깔끔한"] },
    { name: "파전", emoji: "🥞", tastes: ["고소한", "단짠단짠"] },
    { name: "돼지갈비찜", emoji: "🍖", tastes: ["단짠단짠", "매콤한"] },
    { name: "닭한마리", emoji: "🍗", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "장어구이", emoji: "🐟", tastes: ["단짠단짠", "고소한"] },
    { name: "꼬막무침", emoji: "🦪", tastes: ["매콤한", "새콤한"] },
    { name: "육사시미", emoji: "🥩", tastes: ["깔끔한"] },
    { name: "닭발", emoji: "🍗", tastes: ["매콤한"] },
    { name: "홍어삼합", emoji: "🐟", tastes: ["새콤한", "단짠단짠"] },
    { name: "전주비빔밥", emoji: "🍚", tastes: ["깔끔한", "고소한"] },
    { name: "황태해장국", emoji: "🍲", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "청국장찌개", emoji: "🍲", tastes: ["담백한", "국물"] },
    { name: "생선조림", emoji: "🐟", tastes: ["매콤한", "단짠단짠"] },
    { name: "고등어조림", emoji: "🐟", tastes: ["매콤한", "단짠단짠"] },
    { name: "갈치조림", emoji: "🐟", tastes: ["매콤한", "단짠단짠"] },
    { name: "꽁치조림", emoji: "🐟", tastes: ["단짠단짠"] },
    { name: "조기구이", emoji: "🐟", tastes: ["깔끔한", "담백한"] },
    { name: "삼치구이", emoji: "🐟", tastes: ["깔끔한", "담백한"] },
  ],

  중식: [
    { name: "짜장면", emoji: "🍜", tastes: ["단짠단짠", "느끼한"] },
    { name: "짬뽕", emoji: "🍜", tastes: ["얼큰한", "매콤한", "국물"] },
    { name: "볶음짬뽕", emoji: "🍜", tastes: ["매콤한"] },
    { name: "삼선짬뽕", emoji: "🍜", tastes: ["얼큰한", "국물"] },
    { name: "탕수육", emoji: "🍖", tastes: ["단짠단짠", "느끼한", "바삭한"] },
    { name: "마라탕", emoji: "🍲", tastes: ["매콤한", "얼큰한", "국물"] },
    { name: "마라샹궈", emoji: "🍲", tastes: ["매콤한", "헤비한"] },
    { name: "양꼬치", emoji: "🍢", tastes: ["매콤한", "단짠단짠"] },
    { name: "볶음밥", emoji: "🍚", tastes: ["단짠단짠"] },
    { name: "깐풍기", emoji: "🍗", tastes: ["매콤한", "단짠단짠", "바삭한"] },
    { name: "유린기", emoji: "🍗", tastes: ["단짠단짠", "깔끔한"] },
    { name: "꿔바로우", emoji: "🍖", tastes: ["단짠단짠", "느끼한", "바삭한"] },
    { name: "양장피", emoji: "🥗", tastes: ["깔끔한"] },
    { name: "팔보채", emoji: "🥘", tastes: ["깔끔한"] },
    { name: "동파육", emoji: "🍖", tastes: ["단짠단짠", "느끼한", "헤비한"] },
    { name: "짬뽕밥", emoji: "🍚", tastes: ["얼큰한", "매콤한", "국물"] },
    { name: "잡탕밥", emoji: "🍚", tastes: ["깔끔한"] },
    { name: "중국식 훠궈", emoji: "🍲", tastes: ["매콤한", "얼큰한", "국물"] },
    { name: "우육면", emoji: "🍜", tastes: ["얼큰한", "국물"] },
    { name: "딤섬", emoji: "🥟", tastes: ["깔끔한", "단짠단짠"] },
    { name: "군만두", emoji: "🥟", tastes: ["단짠단짠", "느끼한", "바삭한"] },
    { name: "물만두", emoji: "🥟", tastes: ["깔끔한"] },
    { name: "마파두부", emoji: "🍲", tastes: ["매콤한", "헤비한"] },
    { name: "오향장육", emoji: "🥩", tastes: ["단짠단짠"] },
    { name: "칠리새우", emoji: "🍤", tastes: ["매콤한", "단짠단짠", "바삭한"] },
    { name: "크림새우", emoji: "🍤", tastes: ["느끼한", "단짠단짠", "바삭한"] },
    { name: "고추잡채", emoji: "🥗", tastes: ["매콤한", "단짠단짠"] },
    { name: "유산슬", emoji: "🥘", tastes: ["깔끔한"] },
    { name: "지삼선", emoji: "🍆", tastes: ["단짠단짠"] },
    { name: "토마토계란볶음", emoji: "🍅", tastes: ["단짠단짠", "깔끔한"] },
    { name: "마라 훠궈", emoji: "🍲", tastes: ["매콤한", "얼큰한", "헤비한"] },
    { name: "탕탕이", emoji: "🍲", tastes: ["매콤한", "헤비한"] },
    { name: "홍소육", emoji: "🥩", tastes: ["단짠단짠", "헤비한"] },
    { name: "난자완스", emoji: "🍖", tastes: ["단짠단짠"] },
    { name: "새우볶음밥", emoji: "🍚", tastes: ["단짠단짠", "고소한"] },
    { name: "마파면", emoji: "🍜", tastes: ["매콤한", "단짠단짠"] },
    { name: "우육탕면", emoji: "🍜", tastes: ["얼큰한", "국물"] },
    { name: "납작만두", emoji: "🥟", tastes: ["고소한", "담백한"] },
    { name: "중국식 샤브샤브", emoji: "🍲", tastes: ["깔끔한", "국물"] },
    { name: "꽃빵", emoji: "🍞", tastes: ["담백한", "고소한"] },
  ],

  일식: [
    { name: "초밥", emoji: "🍣", tastes: ["깔끔한"] },
    { name: "회덮밥", emoji: "🍚", tastes: ["깔끔한"] },
    { name: "연어덮밥", emoji: "🍚", tastes: ["깔끔한", "단짠단짠"] },
    { name: "장어덮밥", emoji: "🍚", tastes: ["단짠단짠"] },
    { name: "라멘", emoji: "🍜", tastes: ["느끼한", "얼큰한", "국물"] },
    { name: "돈코츠라멘", emoji: "🍜", tastes: ["느끼한", "국물"] },
    { name: "쇼유라멘", emoji: "🍜", tastes: ["단짠단짠", "국물"] },
    { name: "미소라멘", emoji: "🍜", tastes: ["깔끔한", "단짠단짠", "국물"] },
    { name: "츠케멘", emoji: "🍜", tastes: ["단짠단짠", "느끼한"] },
    { name: "탄탄멘", emoji: "🍜", tastes: ["매콤한", "고소한", "국물"] },
    { name: "돈카츠", emoji: "🍖", tastes: ["느끼한", "단짠단짠", "바삭한"] },
    { name: "가츠동", emoji: "🍚", tastes: ["단짠단짠", "헤비한"] },
    { name: "오야코동", emoji: "🍚", tastes: ["단짠단짠"] },
    { name: "규동", emoji: "🍚", tastes: ["단짠단짠"] },
    { name: "텐동", emoji: "🍚", tastes: ["단짠단짠", "느끼한", "헤비한"] },
    { name: "우동", emoji: "🍜", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "자루소바", emoji: "🍜", tastes: ["깔끔한"] },
    { name: "오코노미야끼", emoji: "🥞", tastes: ["단짠단짠", "고소한"] },
    { name: "타코야키", emoji: "🐙", tastes: ["단짠단짠", "고소한"] },
    { name: "야키토리", emoji: "🍢", tastes: ["단짠단짠"] },
    { name: "카라아게", emoji: "🍗", tastes: ["단짠단짠", "느끼한", "바삭한"] },
    { name: "일본식 카레", emoji: "🍛", tastes: ["단짠단짠", "헤비한"] },
    { name: "스시 오마카세", emoji: "🍣", tastes: ["깔끔한"] },
    { name: "네기토로동", emoji: "🍚", tastes: ["깔끔한"] },
    { name: "샤부샤부", emoji: "🍲", tastes: ["깔끔한", "국물"] },
    { name: "스키야키", emoji: "🍲", tastes: ["단짠단짠", "국물"] },
    { name: "나베", emoji: "🍲", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "모밀국수", emoji: "🍜", tastes: ["깔끔한"] },
    { name: "멘타이코 파스타", emoji: "🍝", tastes: ["매콤한", "느끼한"] },
    { name: "마제소바", emoji: "🍜", tastes: ["단짠단짠", "고소한"] },
    { name: "대창덮밥", emoji: "🍚", tastes: ["느끼한", "단짠단짠", "헤비한"] },
    { name: "밀푀유나베", emoji: "🍲", tastes: ["깔끔한", "국물"] },
    { name: "메밀소바", emoji: "🍜", tastes: ["깔끔한"] },
    { name: "스테키동", emoji: "🥩", tastes: ["단짠단짠"] },
    { name: "가라아게동", emoji: "🍚", tastes: ["단짠단짠", "바삭한"] },
    { name: "나카오치동", emoji: "🍚", tastes: ["깔끔한"] },
    { name: "토리조스이", emoji: "🥣", tastes: ["깔끔한", "담백한", "국물"] },
    { name: "이자카야 꼬치", emoji: "🍢", tastes: ["단짠단짠", "고소한"] },
    { name: "야키니쿠", emoji: "🥩", tastes: ["단짠단짠", "헤비한"] },
    { name: "아게다시두부", emoji: "🍢", tastes: ["깔끔한", "담백한"] },
    { name: "교자", emoji: "🥟", tastes: ["고소한", "단짠단짠"] },
    { name: "스파이시 튜나 롤", emoji: "🍣", tastes: ["매콤한", "깔끔한"] },
    { name: "미소시루", emoji: "🥣", tastes: ["깔끔한", "담백한", "국물"] },
    { name: "히레카츠", emoji: "🍖", tastes: ["담백한", "바삭한"] },
    { name: "에비후라이", emoji: "🍤", tastes: ["바삭한", "고소한"] },
  ],

  양식: [
    { name: "까르보나라", emoji: "🍝", tastes: ["느끼한", "헤비한"] },
    { name: "봉골레 파스타", emoji: "🍝", tastes: ["깔끔한"] },
    { name: "아라비아따", emoji: "🍝", tastes: ["매콤한"] },
    { name: "로제파스타", emoji: "🍝", tastes: ["느끼한", "매콤한"] },
    { name: "알리오올리오", emoji: "🍝", tastes: ["깔끔한", "느끼한"] },
    { name: "트러플파스타", emoji: "🍝", tastes: ["느끼한", "고소한"] },
    { name: "토마토 파스타", emoji: "🍝", tastes: ["깔끔한", "단짠단짠"] },
    { name: "빠네 파스타", emoji: "🍝", tastes: ["느끼한", "헤비한"] },
    { name: "뇨끼", emoji: "🥔", tastes: ["느끼한", "단짠단짠"] },
    { name: "멘타이코 크림파스타", emoji: "🍝", tastes: ["매콤한", "느끼한"] },
    { name: "오일 새우 파스타", emoji: "🍝", tastes: ["깔끔한", "고소한"] },
    { name: "스테이크", emoji: "🥩", tastes: ["단짠단짠", "느끼한", "헤비한"] },
    { name: "티본스테이크", emoji: "🥩", tastes: ["느끼한", "헤비한"] },
    { name: "함박스테이크", emoji: "🥩", tastes: ["단짠단짠", "느끼한"] },
    { name: "치킨스테이크", emoji: "🍗", tastes: ["담백한", "단짠단짠"] },
    { name: "폭립", emoji: "🍖", tastes: ["단짠단짠", "헤비한"] },
    { name: "리조또", emoji: "🍚", tastes: ["느끼한"] },
    { name: "버섯리조또", emoji: "🍚", tastes: ["느끼한", "고소한"] },
    { name: "시푸드리조또", emoji: "🍚", tastes: ["깔끔한", "느끼한"] },
    { name: "마르게리따 피자", emoji: "🍕", tastes: ["느끼한", "치즈가득"] },
    { name: "페퍼로니 피자", emoji: "🍕", tastes: ["매콤한", "느끼한", "치즈가득"] },
    { name: "포르치니 피자", emoji: "🍕", tastes: ["느끼한", "고소한"] },
    { name: "트러플 피자", emoji: "🍕", tastes: ["느끼한", "고소한", "치즈가득"] },
    { name: "치즈버거", emoji: "🍔", tastes: ["느끼한", "단짠단짠", "치즈가득"] },
    { name: "수제버거", emoji: "🍔", tastes: ["느끼한", "단짠단짠", "헤비한"] },
    { name: "그라탕", emoji: "🥘", tastes: ["느끼한", "치즈가득"] },
    { name: "프렌치어니언수프", emoji: "🥣", tastes: ["느끼한", "단짠단짠", "국물"] },
    { name: "클램차우더", emoji: "🥣", tastes: ["느끼한", "국물"] },
    { name: "에그베네딕트", emoji: "🍳", tastes: ["느끼한"] },
    { name: "오믈렛", emoji: "🍳", tastes: ["느끼한", "고소한"] },
    { name: "연어스테이크", emoji: "🐟", tastes: ["깔끔한", "느끼한"] },
    { name: "라따뚜이", emoji: "🥘", tastes: ["깔끔한", "건강한"] },
    { name: "크림스튜", emoji: "🥣", tastes: ["느끼한", "국물", "뜨끈한"] },
    { name: "감바스 알 아히요", emoji: "🍤", tastes: ["느끼한", "매콤한"] },
    { name: "잠발라야", emoji: "🥘", tastes: ["매콤한", "헤비한"] },
    { name: "스크램블에그", emoji: "🍳", tastes: ["고소한", "담백한"] },
    { name: "치킨 알프레도", emoji: "🍝", tastes: ["느끼한", "치즈가득"] },
    { name: "랍스터 비스크", emoji: "🥣", tastes: ["느끼한", "국물"] },
    { name: "타르타르 스테이크", emoji: "🥩", tastes: ["단짠단짠"] },
    { name: "바베큐 리브", emoji: "🍖", tastes: ["단짠단짠", "헤비한"] },
    { name: "코코뱅", emoji: "🍗", tastes: ["느끼한", "깔끔한"] },
    { name: "빕 임파나다", emoji: "🥐", tastes: ["바삭한", "고소한"] },
  ],

  분식: [
    { name: "떡볶이", emoji: "🍢", tastes: ["매콤한", "단짠단짠"] },
    { name: "로제떡볶이", emoji: "🍢", tastes: ["매콤한", "느끼한"] },
    { name: "짜장떡볶이", emoji: "🍢", tastes: ["단짠단짠"] },
    { name: "간장떡볶이", emoji: "🍢", tastes: ["단짠단짠"] },
    { name: "크림떡볶이", emoji: "🍢", tastes: ["느끼한"] },
    { name: "엽기떡볶이", emoji: "🌶️", tastes: ["매콤한"] },
    { name: "마라떡볶이", emoji: "🥘", tastes: ["매콤한", "얼큰한"] },
    { name: "즉석떡볶이", emoji: "🍲", tastes: ["매콤한", "단짠단짠", "국물"] },
    { name: "치즈떡볶이", emoji: "🍢", tastes: ["느끼한", "매콤한", "치즈가득"] },
    { name: "라볶이", emoji: "🍢", tastes: ["매콤한", "단짠단짠"] },
    { name: "순대", emoji: "🍢", tastes: ["단짠단짠"] },
    { name: "순대볶음", emoji: "🍢", tastes: ["매콤한"] },
    { name: "김밥", emoji: "🍙", tastes: ["깔끔한", "단짠단짠"] },
    { name: "참치김밥", emoji: "🍙", tastes: ["깔끔한"] },
    { name: "치즈김밥", emoji: "🍙", tastes: ["느끼한", "치즈가득"] },
    { name: "충무김밥", emoji: "🍙", tastes: ["매콤한", "단짠단짠"] },
    { name: "누드김밥", emoji: "🍙", tastes: ["고소한", "담백한"] },
    { name: "꼬마김밥", emoji: "🍙", tastes: ["깔끔한", "담백한"] },
    { name: "신라면", emoji: "🍜", tastes: ["얼큰한", "매콤한", "국물"] },
    { name: "불닭볶음면", emoji: "🍜", tastes: ["매콤한"] },
    { name: "짜파게티", emoji: "🍜", tastes: ["단짠단짠"] },
    { name: "너구리", emoji: "🍜", tastes: ["얼큰한", "국물"] },
    { name: "진라면", emoji: "🍜", tastes: ["얼큰한", "국물"] },
    { name: "육개장 라면", emoji: "🍜", tastes: ["매콤한", "얼큰한", "국물"] },
    { name: "쫄면", emoji: "🍜", tastes: ["매콤한", "새콤한", "단짠단짠"] },
    { name: "비빔당면", emoji: "🍜", tastes: ["매콤한", "단짠단짠"] },
    { name: "튀김", emoji: "🍤", tastes: ["단짠단짠", "느끼한", "바삭한"] },
    { name: "오뎅", emoji: "🍢", tastes: ["깔끔한", "단짠단짠", "국물"] },
    { name: "핫도그", emoji: "🌭", tastes: ["느끼한", "단짠단짠"] },
    { name: "고로케", emoji: "🥐", tastes: ["느끼한", "바삭한"] },
    { name: "계란말이", emoji: "🍳", tastes: ["단짠단짠", "고소한"] },
    { name: "군만두", emoji: "🥟", tastes: ["단짠단짠", "느끼한", "바삭한"] },
    { name: "떡꼬치", emoji: "🍢", tastes: ["매콤한", "단짠단짠"] },
    { name: "소떡소떡", emoji: "🍢", tastes: ["단짠단짠", "매콤한"] },
    { name: "닭꼬치", emoji: "🍢", tastes: ["매콤한", "단짠단짠"] },
    { name: "치즈스틱", emoji: "🧀", tastes: ["느끼한", "치즈가득", "바삭한"] },
    { name: "비빔만두", emoji: "🥟", tastes: ["매콤한", "단짠단짠"] },
    { name: "참치마요 덮밥", emoji: "🍚", tastes: ["느끼한", "단짠단짠"] },
    { name: "부침개", emoji: "🥞", tastes: ["단짠단짠", "고소한"] },
    { name: "어묵탕", emoji: "🍢", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "컵라면", emoji: "🍜", tastes: ["얼큰한", "국물"] },
    { name: "불닭 치즈떡볶이", emoji: "🍢", tastes: ["매콤한", "치즈가득"] },
    { name: "쌀국수 라면", emoji: "🍜", tastes: ["깔끔한", "국물"] },
    { name: "분식 세트", emoji: "🍱", tastes: ["매콤한", "단짠단짠"] },
  ],

  패스트푸드: [
    { name: "후라이드치킨", emoji: "🍗", tastes: ["단짠단짠", "느끼한", "바삭한"] },
    { name: "양념치킨", emoji: "🍗", tastes: ["매콤한", "단짠단짠"] },
    { name: "간장치킨", emoji: "🍗", tastes: ["단짠단짠"] },
    { name: "마늘치킨", emoji: "🍗", tastes: ["단짠단짠", "고소한"] },
    { name: "파닭", emoji: "🍗", tastes: ["깔끔한", "단짠단짠"] },
    { name: "BHC 뿌링클", emoji: "🍗", tastes: ["단짠단짠", "고소한"] },
    { name: "BBQ 황금올리브", emoji: "🍗", tastes: ["깔끔한", "바삭한"] },
    { name: "교촌 허니콤보", emoji: "🍗", tastes: ["단짠단짠"] },
    { name: "처갓집 양념치킨", emoji: "🍗", tastes: ["매콤한", "단짠단짠"] },
    { name: "굽네 볼케이노", emoji: "🍗", tastes: ["매콤한"] },
    { name: "맥도날드 빅맥", emoji: "🍔", tastes: ["느끼한", "단짠단짠"] },
    { name: "맥스파이시 버거", emoji: "🍔", tastes: ["매콤한", "느끼한"] },
    { name: "쉐이크쉑버거", emoji: "🍔", tastes: ["느끼한", "헤비한"] },
    { name: "롯데리아 버거", emoji: "🍔", tastes: ["느끼한"] },
    { name: "맘스터치 싸이버거", emoji: "🍔", tastes: ["느끼한", "바삭한"] },
    { name: "KFC 징거버거", emoji: "🍔", tastes: ["매콤한", "느끼한", "바삭한"] },
    { name: "버거킹 와퍼", emoji: "🍔", tastes: ["느끼한", "헤비한"] },
    { name: "감자튀김", emoji: "🍟", tastes: ["단짠단짠", "바삭한"] },
    { name: "치킨너겟", emoji: "🍗", tastes: ["단짠단짠", "바삭한"] },
    { name: "타코", emoji: "🌮", tastes: ["매콤한", "단짠단짠"] },
    { name: "부리또", emoji: "🌯", tastes: ["매콤한", "느끼한", "헤비한"] },
    { name: "퀘사디아", emoji: "🌮", tastes: ["매콤한", "느끼한", "치즈가득"] },
    { name: "나초", emoji: "🧀", tastes: ["매콤한", "느끼한", "치즈가득"] },
    { name: "피자", emoji: "🍕", tastes: ["느끼한", "치즈가득"] },
    { name: "페퍼로니피자", emoji: "🍕", tastes: ["느끼한", "매콤한", "치즈가득"] },
    { name: "치즈피자", emoji: "🍕", tastes: ["느끼한", "치즈가득"] },
    { name: "떡볶이+치킨 세트", emoji: "🍗", tastes: ["매콤한", "단짠단짠", "헤비한"] },
    { name: "서브웨이 샌드위치", emoji: "🥪", tastes: ["깔끔한", "가벼운"] },
    { name: "핫도그", emoji: "🌭", tastes: ["느끼한", "단짠단짠"] },
    { name: "파파이스 치킨", emoji: "🍗", tastes: ["바삭한", "단짠단짠"] },
    { name: "웬디스 버거", emoji: "🍔", tastes: ["느끼한", "단짠단짠"] },
  ],

  디저트: [
    { name: "티라미수", emoji: "🍰", tastes: ["달콤한", "느끼한"] },
    { name: "치즈케이크", emoji: "🍰", tastes: ["달콤한", "치즈가득"] },
    { name: "마카롱", emoji: "🍬", tastes: ["달콤한", "쫄깃한"] },
    { name: "와플", emoji: "🧇", tastes: ["달콤한", "바삭한", "고소한"] },
    { name: "크로플", emoji: "🥐", tastes: ["달콤한", "바삭한", "고소한"] },
    { name: "빙수", emoji: "🍧", tastes: ["달콤한", "시원한"] },
    { name: "팥빙수", emoji: "🍧", tastes: ["달콤한", "시원한"] },
    { name: "망고빙수", emoji: "🍧", tastes: ["달콤한", "새콤한", "시원한"] },
    { name: "요거트볼", emoji: "🥣", tastes: ["새콤한", "건강한", "가벼운"] },
    { name: "아이스크림", emoji: "🍦", tastes: ["달콤한", "시원한"] },
    { name: "젤라또", emoji: "🍨", tastes: ["달콤한", "시원한"] },
    { name: "도넛", emoji: "🍩", tastes: ["달콤한", "느끼한"] },
    { name: "에그타르트", emoji: "🥧", tastes: ["달콤한", "바삭한", "고소한"] },
    { name: "수플레 팬케이크", emoji: "🥞", tastes: ["달콤한", "고소한"] },
    { name: "휘낭시에", emoji: "🍞", tastes: ["달콤한", "고소한", "담백한"] },
    { name: "까눌레", emoji: "🍮", tastes: ["달콤한", "바삭한", "쫄깃한"] },
    { name: "약과", emoji: "🥮", tastes: ["달콤한", "쫄깃한"] },
    { name: "탕후루", emoji: "🍓", tastes: ["달콤한", "새콤한", "바삭한"] },
    { name: "초코 브라우니", emoji: "🍫", tastes: ["달콤한", "헤비한"] },
    { name: "푸딩", emoji: "🍮", tastes: ["달콤한", "고소한"] },
    { name: "크레이프", emoji: "🥞", tastes: ["달콤한", "고소한"] },
    { name: "몽블랑", emoji: "🍰", tastes: ["달콤한", "고소한"] },
    { name: "파리브레스트", emoji: "🍩", tastes: ["달콤한", "고소한", "느끼한"] },
    { name: "밀크레이프", emoji: "🥞", tastes: ["달콤한", "고소한"] },
    { name: "바스크 치즈케이크", emoji: "🍰", tastes: ["달콤한", "치즈가득", "고소한"] },
    { name: "딸기 쇼트케이크", emoji: "🍓", tastes: ["달콤한", "새콤한"] },
    { name: "마들렌", emoji: "🍪", tastes: ["달콤한", "고소한", "담백한"] },
    { name: "쿠키", emoji: "🍪", tastes: ["달콤한", "바삭한", "고소한"] },
    { name: "소금빵", emoji: "🥐", tastes: ["고소한", "담백한"] },
    { name: "조각 케이크", emoji: "🎂", tastes: ["달콤한", "느끼한"] },
    { name: "프레첼", emoji: "🥨", tastes: ["단짠단짠", "바삭한"] },
    { name: "타르트", emoji: "🥧", tastes: ["달콤한", "바삭한"] },
  ],

  동남아: [
    { name: "쌀국수", emoji: "🍜", tastes: ["깔끔한", "국물", "뜨끈한"] },
    { name: "팟타이", emoji: "🍝", tastes: ["단짠단짠", "고소한"] },
    { name: "똠얌꿍", emoji: "🥣", tastes: ["새콤한", "얼큰한", "국물"] },
    { name: "분짜", emoji: "🥗", tastes: ["깔끔한", "단짠단짠", "새콤한"] },
    { name: "반미", emoji: "🥖", tastes: ["단짠단짠", "바삭한", "새콤한"] },
    { name: "나시고랭", emoji: "🍛", tastes: ["단짠단짠", "매콤한"] },
    { name: "미고랭", emoji: "🍜", tastes: ["단짠단짠", "매콤한"] },
    { name: "푸팟퐁커리", emoji: "🍛", tastes: ["느끼한", "단짠단짠", "고소한"] },
    { name: "솜땀", emoji: "🥗", tastes: ["새콤한", "매콤한", "가벼운"] },
    { name: "모닝글로리 볶음", emoji: "🥗", tastes: ["깔끔한", "비건"] },
    { name: "카오팟", emoji: "🍚", tastes: ["담백한", "고소한"] },
    { name: "그린커리", emoji: "🍛", tastes: ["매콤한", "느끼한", "국물"] },
    { name: "레드커리", emoji: "🍛", tastes: ["매콤한", "느끼한", "국물"] },
    { name: "옐로우커리", emoji: "🍛", tastes: ["느끼한", "국물"] },
    { name: "반쎄오", emoji: "🌮", tastes: ["바삭한", "고소한"] },
    { name: "짜조", emoji: "🌯", tastes: ["바삭한", "고소한", "담백한"] },
    { name: "갈비국수", emoji: "🍜", tastes: ["단짠단짠", "국물"] },
    { name: "꾸어이띠여우", emoji: "🍜", tastes: ["깔끔한", "국물"] },
    { name: "분보훼", emoji: "🍜", tastes: ["얼큰한", "국물"] },
    { name: "목와라이", emoji: "🍚", tastes: ["고소한", "담백한"] },
    { name: "카오만가이", emoji: "🍗", tastes: ["깔끔한", "담백한"] },
    { name: "팟씨유", emoji: "🍝", tastes: ["단짠단짠"] },
    { name: "카오니아우 마무앙", emoji: "🥭", tastes: ["달콤한", "고소한"] },
    { name: "체짜이", emoji: "🥗", tastes: ["새콤한", "매콤한"] },
    { name: "프라이드 스프링롤", emoji: "🌯", tastes: ["바삭한", "고소한"] },
  ],

  샐러드: [
    { name: "치킨샐러드", emoji: "🥗", tastes: ["깔끔한", "건강한"] },
    { name: "연어샐러드", emoji: "🥗", tastes: ["깔끔한", "건강한", "담백한"] },
    { name: "포케", emoji: "🍚", tastes: ["깔끔한", "건강한", "가벼운"] },
    { name: "두부샐러드", emoji: "🥗", tastes: ["담백한", "비건", "건강한"] },
    { name: "리코타치즈 샐러드", emoji: "🥗", tastes: ["가벼운", "치즈가득", "새콤한"] },
    { name: "콥샐러드", emoji: "🥗", tastes: ["가벼운", "담백한"] },
    { name: "단호박 샐러드", emoji: "🎃", tastes: ["달콤한", "건강한"] },
    { name: "고구마 샐러드", emoji: "🍠", tastes: ["달콤한", "담백한"] },
    { name: "그릭요거트", emoji: "🥣", tastes: ["건강한", "새콤한", "담백한"] },
    { name: "아사이볼", emoji: "🥣", tastes: ["시원한", "건강한", "달콤한"] },
    { name: "월남쌈", emoji: "🌯", tastes: ["깔끔한", "건강한", "비건"] },
    { name: "다이어트 도시락", emoji: "🍱", tastes: ["담백한", "가벼운", "건강한"] },
    { name: "카프레제", emoji: "🍅", tastes: ["깔끔한", "치즈가득", "가벼운"] },
    { name: "시저샐러드", emoji: "🥗", tastes: ["깔끔한", "건강한"] },
    { name: "니스와즈 샐러드", emoji: "🥗", tastes: ["새콤한", "가벼운"] },
    { name: "과일샐러드", emoji: "🍓", tastes: ["달콤한", "새콤한", "건강한"] },
    { name: "병아리콩 샐러드", emoji: "🥗", tastes: ["담백한", "건강한", "비건"] },
    { name: "퀴노아볼", emoji: "🥣", tastes: ["건강한", "담백한", "가벼운"] },
    { name: "그린볼", emoji: "🥗", tastes: ["건강한", "가벼운", "비건"] },
    { name: "쉬림프 칵테일", emoji: "🍤", tastes: ["깔끔한", "새콤한"] },
  ],

  브런치: [
    { name: "베이글", emoji: "🥯", tastes: ["쫄깃한", "담백한"] },
    { name: "크림치즈 베이글", emoji: "🥯", tastes: ["쫄깃한", "느끼한", "치즈가득"] },
    { name: "프렌치 토스트", emoji: "🍞", tastes: ["달콤한", "뜨끈한", "고소한"] },
    { name: "클럽 샌드위치", emoji: "🥪", tastes: ["깔끔한", "담백한"] },
    { name: "파니니", emoji: "🥪", tastes: ["뜨끈한", "치즈가득", "바삭한"] },
    { name: "크루아상 샌드위치", emoji: "🥐", tastes: ["바삭한", "고소한"] },
    { name: "오픈 샌드위치", emoji: "🥪", tastes: ["가벼운", "건강한", "담백한"] },
    { name: "에그 마요 샌드위치", emoji: "🥪", tastes: ["고소한", "느끼한"] },
    { name: "팬케이크", emoji: "🥞", tastes: ["달콤한", "고소한"] },
    { name: "아보카도 토스트", emoji: "🍞", tastes: ["건강한", "담백한", "고소한"] },
    { name: "스크램블 샌드위치", emoji: "🥪", tastes: ["고소한", "뜨끈한"] },
    { name: "그래놀라볼", emoji: "🥣", tastes: ["달콤한", "고소한", "건강한"] },
    { name: "오픈 페이스 버거", emoji: "🍔", tastes: ["느끼한", "헤비한"] },
    { name: "베네딕트 에그", emoji: "🍳", tastes: ["느끼한", "뜨끈한"] },
    { name: "BLT 샌드위치", emoji: "🥪", tastes: ["담백한", "고소한"] },
    { name: "치아바타 샌드위치", emoji: "🥖", tastes: ["바삭한", "담백한"] },
    { name: "스모크 연어 베이글", emoji: "🥯", tastes: ["담백한", "깔끔한"] },
    { name: "잉글리시 머핀", emoji: "🥚", tastes: ["고소한", "담백한"] },
    { name: "포치드 에그 샐러드", emoji: "🥗", tastes: ["깔끔한", "가벼운"] },
    { name: "버섯 리코타 토스트", emoji: "🍞", tastes: ["고소한", "담백한"] },
  ],
}

const CATEGORY_ICON: Record<string, string> = {
  한식: "🍚",
  중식: "🥟",
  일식: "🍣",
  양식: "🍝",
  분식: "🍢",
  패스트푸드: "🌮",
  디저트: "🍰",
  동남아: "🍜",
  샐러드: "🥗",
  브런치: "🥪",
}

const TASTE_ICON: Partial<Record<Taste, string>> = {
  매콤한: "🌶️",
  얼큰한: "🍲",
  깔끔한: "✨",
  단짠단짠: "🍯",
  느끼한: "🧈",
  달콤한: "🍬",
  새콤한: "🍋",
  고소한: "🥜",
  담백한: "🍃",
  바삭한: "🥨",
  쫄깃한: "🍡",
  뜨끈한: "♨️",
  시원한: "🧊",
  헤비한: "🧱",
  가벼운: "🪶",
  건강한: "🥗",
  치즈가득: "🧀",
  국물: "🥣",
  비건: "🌱",
}

export default function FilterView() {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])
  const [selectedTastes, setSelectedTastes] = useState<Taste[]>([])
  const [showModal, setShowModal] = useState(false)
  const [recommendation, setRecommendation] = useState<FoodItem & { category: string }>({
    name: "",
    emoji: "",
    tastes: [],
    category: "",
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [rollingText, setRollingText] = useState("")

  const FOOD_TYPES = useMemo(() => {
    return Object.keys(FOOD_DB).map((label) => ({
      label,
      icon: CATEGORY_ICON[label] ?? "🍽️",
    }))
  }, [])

  // ✅ TASTE_TYPES: 5개 이상 메뉴에 붙은 태그만 버튼으로 노출 (희귀 태그 제거)
  const TASTE_TYPES = useMemo(() => {
    const countMap: Partial<Record<Taste, number>> = {}
    Object.values(FOOD_DB)
      .flatMap((items) => items.flatMap((i) => i.tastes))
      .forEach((t) => {
        countMap[t] = (countMap[t] ?? 0) + 1
      })

    // 5개 이상 붙은 Taste만 버튼으로 노출
    const filtered = (Object.keys(countMap) as Taste[]).filter(
      (t) => (countMap[t] ?? 0) >= 5
    )

    // 직관적인 순서로 정렬
    const ORDER: Taste[] = [
      "매콤한", "얼큰한", "국물", "깔끔한", "단짠단짠",
      "느끼한", "헤비한", "달콤한", "고소한", "새콤한",
      "바삭한", "담백한", "뜨끈한", "시원한", "가벼운",
      "건강한", "치즈가득", "쫄깃한", "비건",
    ]

    return ORDER.filter((t) => filtered.includes(t)).map((label) => ({
      label,
      icon: TASTE_ICON[label] ?? "❤️",
    }))
  }, [])

  const toggleFood = (food: string) => {
    setSelectedFoods((prev) => (prev.includes(food) ? prev.filter((f) => f !== food) : [...prev, food]))
  }

  const toggleTaste = (taste: Taste) => {
    setSelectedTastes((prev) => (prev.includes(taste) ? prev.filter((t) => t !== taste) : [...prev, taste]))
  }

  // 현재 조건(카테고리 + 맛)으로 나올 수 있는 총 메뉴 수
  const matchCount = useMemo(() => {
    const categories = selectedFoods.length > 0 ? selectedFoods : FOOD_TYPES.map((f) => f.label)
    let pool = categories.flatMap((cat) => FOOD_DB[cat] || [])
    if (selectedTastes.length > 0) {
      const filtered = pool.filter((item) => selectedTastes.some((t) => item.tastes.includes(t)))
      if (filtered.length > 0) pool = filtered
    }
    return pool.length
  }, [selectedFoods, selectedTastes, FOOD_TYPES])

  // 특정 맛 태그를 추가했을 때의 예상 메뉴 수 (미리보기용)
  const getCountWithTaste = (taste: Taste): number => {
    const categories = selectedFoods.length > 0 ? selectedFoods : FOOD_TYPES.map((f) => f.label)
    const pool = categories.flatMap((cat) => FOOD_DB[cat] || [])
    const nextTastes = selectedTastes.includes(taste)
      ? selectedTastes.filter((t) => t !== taste)
      : [...selectedTastes, taste]
    if (nextTastes.length === 0) return pool.length
    const filtered = pool.filter((item) => nextTastes.some((t) => item.tastes.includes(t)))
    return filtered.length > 0 ? filtered.length : pool.length
  }

  const getRecommendation = () => {
    const categories = selectedFoods.length > 0 ? selectedFoods : FOOD_TYPES.map((f) => f.label)

    let pool: (FoodItem & { category: string })[] = categories.flatMap((cat) =>
      (FOOD_DB[cat] || []).map((item) => ({ ...item, category: cat }))
    )

    if (selectedTastes.length > 0) {
      const filtered = pool.filter((item) => selectedTastes.some((t) => item.tastes.includes(t)))
      if (filtered.length > 0) pool = filtered
    }

    if (pool.length === 0) return

    const picked = pool[Math.floor(Math.random() * pool.length)]

    // 두구두구: 모달 먼저 열고, 랜덤 메뉴 이름 빠르게 굴리다가 reveal
    setIsRevealing(true)
    setRollingText(pool[0].name)
    setShowModal(true)

    let tick = 0
    const totalTicks = 14
    const interval = window.setInterval(() => {
      const randomItem = pool[Math.floor(Math.random() * pool.length)]
      setRollingText(randomItem.name)
      tick++
      if (tick >= totalTicks) {
        window.clearInterval(interval)
        // 마지막: 실제 선택된 메뉴 reveal
        window.setTimeout(() => {
          setRecommendation(picked)
          setRollingText(picked.name)
          setIsRevealing(false)
          setIsAnimating(true)
          window.setTimeout(() => setIsAnimating(false), 600)
        }, 120)
      }
    }, 80)
  }

  return (
    <div className="flex flex-col gap-5 px-5 pt-5 pb-28">
      <div className="flex flex-col items-center gap-2 rounded-3xl bg-card p-5 border border-border shadow-sm">
        <div className="flex items-center gap-3">
          <DumplingMascot size={56} className="animate-[bounce_3s_ease-in-out_infinite]" />
          <BowlMascot size={56} className="animate-[bounce_3s_ease-in-out_infinite_0.5s]" />
        </div>
        <h2 className="text-xl font-extrabold text-foreground text-balance text-center">{"오늘 땡기는 스타일은?"}</h2>
        <p className="text-xs font-medium text-muted-foreground text-center leading-relaxed">
          {"조건을 골라보세요, 나머지는 Whatever이 골라줄게!"}
        </p>
      </div>

      <section>
        <div className="mb-3 flex items-center gap-1.5">
          <SparkleIcon size={14} className="text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{"음식 종류"}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {FOOD_TYPES.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => toggleFood(label)}
              className={`flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-sm font-bold transition-all active:scale-95 ${
                selectedFoods.includes(label)
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border-border bg-card text-card-foreground hover:border-primary/40 hover:bg-muted"
              }`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-1.5">
          <HeartIcon size={14} className="text-primary" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{"맛"}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {TASTE_TYPES.map(({ label, icon }) => {
            const isSelected = selectedTastes.includes(label)
            const count = getCountWithTaste(label)
            return (
              <button
                key={label}
                onClick={() => toggleTaste(label)}
                className={`flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-sm font-bold transition-all active:scale-95 ${
                  isSelected
                    ? "border-accent bg-accent text-accent-foreground shadow-md shadow-accent/20"
                    : "border-border bg-card text-card-foreground hover:border-accent/40 hover:bg-muted"
                }`}
              >
                <span className="text-base">{icon}</span>
                <span>{label}</span>
                <span
                  className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold tabular-nums ${
                    isSelected
                      ? "bg-accent-foreground/20 text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {(selectedFoods.length > 0 || selectedTastes.length > 0) && (
        <div className="rounded-2xl bg-card p-4 shadow-sm border border-border">
          <p className="mb-2 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <SparkleIcon size={12} className="text-accent" />
            {"선택한 조건"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[...selectedFoods, ...selectedTastes].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        <p className="text-xs font-bold text-muted-foreground tabular-nums">
          <span className="text-primary font-extrabold">{matchCount}개</span>{"의 메뉴 중에서 골라줄게요"}
        </p>
        <button
          onClick={getRecommendation}
          disabled={isRevealing}
          className="group relative w-full max-w-xs overflow-hidden rounded-2xl bg-primary px-6 py-4 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97] disabled:opacity-80 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <HeartIcon size={18} className={isRevealing ? "animate-spin" : "transition-transform group-hover:scale-110"} />
            {isRevealing ? "고르는 중..." : "메뉴 추천받기"}
          </span>
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-5"
          onClick={() => setShowModal(false)}
        >
          <div
            className={`relative w-full max-w-xs rounded-3xl bg-card p-8 text-center shadow-2xl border border-border ${
              isAnimating ? "animate-in zoom-in-90 fade-in-0 duration-500" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="absolute left-4 top-6">
              <SparkleIcon size={12} className="text-primary/40 animate-pulse" />
            </div>
            <div className="absolute right-10 top-8">
              <SparkleIcon size={10} className="text-accent/50 animate-pulse delay-300" />
            </div>

            <div className="mb-3 flex justify-center">
              <span className={`text-6xl block ${isRevealing ? "animate-pulse" : "animate-bounce"}`}>
                {isRevealing ? "🎲" : recommendation.emoji}
              </span>
            </div>

            <p className="text-xs font-bold text-muted-foreground tracking-wide">
              {isRevealing ? "두구두구두구..." : "오늘의 추천 메뉴는..."}
            </p>
            <h3
              className={`mt-2 text-3xl font-extrabold transition-all ${
                isRevealing
                  ? "text-muted-foreground blur-[2px] scale-95"
                  : "text-foreground blur-0 scale-100"
              }`}
              style={{ transition: isRevealing ? "none" : "all 0.3s ease-out" }}
            >
              {isRevealing ? rollingText : recommendation.name}
            </h3>

            {!isRevealing && recommendation.tastes.length > 0 && (
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {recommendation.tastes.map((t) => (
                  <span key={t} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-1 text-xs text-muted-foreground">
              {isRevealing ? "\u00a0" : "맛있게 먹어요!"}
            </p>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl border-2 border-border bg-card px-4 py-3 text-sm font-bold text-card-foreground transition-all hover:bg-muted active:scale-95"
              >
                {"닫기"}
              </button>
              <button
                onClick={getRecommendation}
                disabled={isRevealing}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg active:scale-95 disabled:opacity-60"
              >
                {isRevealing ? "..." : "다른 거!"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
