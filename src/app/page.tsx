"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [taskName, setTaskName] = useState("");
  const [endTime, setEndTime] = useState(""); // "HH:MM"
  const [isRunning, setIsRunning] = useState(false);

  const [nowTimestamp, setNowTimestamp] = useState(0)
  const [endTimestamp, setEndTimestamp] = useState<number | null>(null)

  const onReset = () => {
    setIsRunning(false);
    setTaskName("");
    setEndTime("");
    setNowTimestamp(0)
    setEndTimestamp(null)
  }

  const computeDeadlineTimestamp = (timeHHMM: string) => {
    const [hh, mm] = timeHHMM.split(":").map(Number)

    const now = new Date();
    const end = new Date();

    end.setHours(hh, mm, 0, 0);

    if (end.getTime() <= now.getTime()) {
      end.setDate(end.getDate() + 1);
    }

    return end.getTime();
  };

  const remainMs = useMemo(() => {
    if (endTimestamp === null || nowTimestamp === 0) return null;
    return Math.max(0, endTimestamp - nowTimestamp);
  }, [nowTimestamp, endTimestamp])

  const formatHHMMSS = (ms: number): string => {
    const totalSec = Math.floor(ms / 1000);
    const hh = Math.floor(totalSec / 3600);
    const mm = Math.floor((totalSec % 3600) / 60);
    const ss = totalSec % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isRunning) return;
    if (remainMs === 0) {
      setIsRunning(false)
    }

    const intervalId = window.setInterval(() => {
      setNowTimestamp(Date.now())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isRunning, remainMs])

  const remainText = remainMs === null ? "--:--" : formatHHMMSS(remainMs)

  const timerRun = () => {
    setNowTimestamp(Date.now());
    setIsRunning(true);
  };

  const onMainButtonClick = () => {
    if (isRunning) {
      setIsRunning(false);
      return;
    }

    if (endTimestamp !== null && remainMs !== null && remainMs > 0) {
      timerRun();
      return;
    }

    if (!taskName.trim() || !endTime.trim()) return;
    setEndTimestamp(computeDeadlineTimestamp(endTime));
    timerRun();
  };

  const canStartNew = taskName.trim() !== "" && endTime.trim() !== "";
  const canResume =
    endTimestamp !== null &&
    remainMs !== null &&
    remainMs > 0 &&
    !isRunning;

  const canClickMain = isRunning || canStartNew || canResume;
  const canReset = !isRunning && endTimestamp !== null;

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
              onClick={onMainButtonClick}
              disabled={!canClickMain}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
            <button
              className="rounded-lg border px-4 py-2 disabled:opacity-40"
              onClick={onReset}
              disabled={!canReset}
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

          <div className="mt-4 text-sm text-neutral-600">残り時間</div>
          <div className="mt-1 text-4xl font-semibold tabular-nums">{remainText}</div>
          <div className="mt-3 text-xs text-neutral-500">
            状態：{isRunning ? "実行中" : "未開始"}
          </div>

        </section>
      </div>
    </main>
  );
}

