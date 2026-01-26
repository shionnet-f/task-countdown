"use client";

import { useState } from "react";

export default function Page() {
  const [taskName, setTaskName] = useState("");
  const [endTime, setEndTime] = useState(""); // "HH:MM"

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Task Countdown</h1>
        <p className="mt-2 text-sm text-neutral-600">
          タスク名と終了時刻を入力し、残り時間を表示する（MVP0）。
        </p>

        <section className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
          <label className="block text-sm font-medium">タスク名</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            placeholder="例：自己PR作成"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <label className="mt-4 block text-sm font-medium">終了時刻</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />

          <div className="mt-4 flex gap-2">
            <button
              className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-40"
              disabled
              title="カウントダウン開始ボタン"
            >
              Start
            </button>
            <button
              className="rounded-lg border px-4 py-2 disabled:opacity-40"
              disabled
              title="カウントダウン終了ボタン"
            >
              Stop
            </button>
            <button
              className="rounded-lg border px-4 py-2 disabled:opacity-40"
              disabled
              title="カウントダウンリセットボタン"
            >
              Reset
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
          <div className="text-sm text-neutral-600">現在のタスク</div>
          <div className="mt-1 text-lg font-medium">
            {taskName.trim() ? taskName : "（未設定）"}
          </div>

          <div className="mt-4 text-sm text-neutral-600">終了時刻</div>
          <div className="mt-1 text-lg font-medium tabular-nums">
            {endTime ? endTime : "--:--"}
          </div>

          <div className="mt-4 text-sm text-neutral-600">残り時間(未実装)</div>
          <div className="mt-1 text-4xl font-semibold tabular-nums">--:--</div>

        </section>
      </div>
    </main>
  );
}
