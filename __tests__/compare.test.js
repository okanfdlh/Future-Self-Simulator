import { compareRuns, rankRuns } from "@/lib/compare";

describe("compare", () => {
  it("ranks runs by average score", () => {
    const runs = [
      { id: "a", scenarioId: "neutral", metrics: { happiness: 50, finance: 50, health: 50, social: 50, fulfillment: 50 } },
      { id: "b", scenarioId: "positive", metrics: { happiness: 80, finance: 70, health: 60, social: 70, fulfillment: 75 } },
      { id: "c", scenarioId: "negative", metrics: { happiness: 20, finance: 30, health: 10, social: 25, fulfillment: 15 } }
    ];
    const ranked = rankRuns(runs);
    expect(ranked[0].id).toBe("b");
    expect(ranked[ranked.length - 1].id).toBe("c");
  });

  it("compares by metric", () => {
    const runs = [
      { id: "a", scenarioId: "neutral", metrics: { happiness: 50, finance: 50, health: 50, social: 50, fulfillment: 50 } },
      { id: "b", scenarioId: "positive", metrics: { happiness: 80, finance: 70, health: 60, social: 70, fulfillment: 75 } }
    ];
    const cmp = compareRuns(runs);
    expect(cmp.count).toBe(2);
    expect(cmp.byMetric.happiness.best.id).toBe("b");
    expect(cmp.byMetric.happiness.worst.id).toBe("a");
  });
});

