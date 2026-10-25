import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Status } from "@/lib/types";

function statusKey(companySlug: string, questionSlug: string) {
  return `${companySlug}:${questionSlug}`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

interface TrackerState {
  version: 2;
  statusMap: Record<string, "solved">;
  bookmarks: Record<string, true>;
  activityLog: Record<string, number>;
  preparingFor: string[];

  getStatus: (companySlug: string, questionSlug: string) => Status;
  toggleCompleted: (companySlug: string, questionSlug: string) => void;
  isBookmarked: (questionSlug: string) => boolean;
  toggleBookmark: (questionSlug: string) => void;
  addPreparingFor: (companySlug: string) => void;
  removePreparingFor: (companySlug: string) => void;
  getCompanyProgress: (
    companySlug: string,
    questionSlugs: string[]
  ) => { solved: number; total: number };
}

export const useTrackerStore = create<TrackerState>()(
  persist(
    (set, get) => ({
      version: 2,
      statusMap: {},
      bookmarks: {},
      activityLog: {},
      preparingFor: [],

      getStatus: (companySlug, questionSlug) => {
        const key = statusKey(companySlug, questionSlug);
        return get().statusMap[key] === "solved" ? "solved" : "not_started";
      },

      // Binary mark-as-completed toggle: not started <-> solved. No
      // intermediate "attempted" state — this is a done/not-done tracker.
      toggleCompleted: (companySlug, questionSlug) => {
        const key = statusKey(companySlug, questionSlug);
        const isSolved = get().statusMap[key] === "solved";

        set((state) => {
          const statusMap = { ...state.statusMap };
          if (isSolved) {
            delete statusMap[key];
          } else {
            statusMap[key] = "solved";
          }

          let activityLog = state.activityLog;
          if (!isSolved) {
            const day = todayKey();
            activityLog = { ...activityLog, [day]: (activityLog[day] ?? 0) + 1 };
          }

          return { statusMap, activityLog };
        });
      },

      isBookmarked: (questionSlug) => Boolean(get().bookmarks[questionSlug]),

      toggleBookmark: (questionSlug) => {
        set((state) => {
          const bookmarks = { ...state.bookmarks };
          if (bookmarks[questionSlug]) {
            delete bookmarks[questionSlug];
          } else {
            bookmarks[questionSlug] = true;
          }
          return { bookmarks };
        });
      },

      addPreparingFor: (companySlug) => {
        set((state) =>
          state.preparingFor.includes(companySlug)
            ? state
            : { preparingFor: [...state.preparingFor, companySlug] }
        );
      },

      removePreparingFor: (companySlug) => {
        set((state) => ({
          preparingFor: state.preparingFor.filter((s) => s !== companySlug),
        }));
      },

      getCompanyProgress: (companySlug, questionSlugs) => {
        const statusMap = get().statusMap;
        let solved = 0;
        for (const qSlug of questionSlugs) {
          if (statusMap[statusKey(companySlug, qSlug)] === "solved") solved++;
        }
        return { solved, total: questionSlugs.length };
      },
    }),
    {
      name: "leetcode-tracker-store",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        version: state.version,
        statusMap: state.statusMap,
        bookmarks: state.bookmarks,
        activityLog: state.activityLog,
        preparingFor: state.preparingFor,
      }),
      // v1 had a third "attempted" status with no "completed" meaning —
      // drop those entries rather than guess they were finished.
      migrate: (persisted) => {
        const state = persisted as { statusMap?: Record<string, string> };
        const statusMap = Object.fromEntries(
          Object.entries(state.statusMap ?? {}).filter(([, v]) => v === "solved")
        );
        return { ...state, statusMap, version: 2 };
      },
    }
  )
);
