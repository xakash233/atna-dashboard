export interface FraudDetectorData {
  metrics: {
    cvsIngested: { value: number; delta: string };
    shortlisted: { value: number; delta: string };
    fraudFlagged: { value: number; delta: string };
    finalHires: { value: number; delta: string };
  };
  funnel: { label: string; value: number }[];
  volumeTrend: { day: string; volume: number; flags: number }[];
  fraudSignals: { label: string; value: number }[];
  fakeMediaBins: { label: string; value: number }[];
  geoRisk: { region: string; clean: number; flagged: number }[];
  jobs: {
    title: string;
    status: string;
    resumes: number;
    selected: number;
    created: string;
  }[];
  verificationQueue: {
    initials: string;
    name: string;
    ref: string;
    level: string;
    jdMatch: string;
    riskLevel: string;
    atnaScore: string;
  }[];
}

export async function fetchFraudDetector(): Promise<FraudDetectorData> {
  return {
    metrics: {
      cvsIngested: { value: 1, delta: "+1" },
      shortlisted: { value: 0, delta: "0%" },
      fraudFlagged: { value: 1, delta: "+1" },
      finalHires: { value: 0, delta: "0%" },
    },
    funnel: [
      { label: "CVs Ingested", value: 1 },
      { label: "Screened", value: 1 },
      { label: "JD Match", value: 1 },
      { label: "Fraud Check", value: 1 },
      { label: "Final", value: 0 },
    ],
    // Series constrained to known activity around 7/8; other days 0 (no invented spikes)
    volumeTrend: [
      { day: "7/1", volume: 0, flags: 0 },
      { day: "7/2", volume: 0, flags: 0 },
      { day: "7/3", volume: 0, flags: 0 },
      { day: "7/4", volume: 0, flags: 0 },
      { day: "7/5", volume: 0, flags: 0 },
      { day: "7/6", volume: 0, flags: 0 },
      { day: "7/7", volume: 0, flags: 0 },
      { day: "7/8", volume: 1, flags: 1 },
      { day: "7/9", volume: 0, flags: 0 },
      { day: "7/10", volume: 0, flags: 0 },
      { day: "7/11", volume: 0, flags: 0 },
      { day: "7/12", volume: 0, flags: 0 },
      { day: "7/13", volume: 0, flags: 0 },
      { day: "7/14", volume: 0, flags: 0 },
    ],
    fraudSignals: [
      { label: "Email reputation flag", value: 1 },
      { label: "Phone reputation flag", value: 1 },
    ],
    fakeMediaBins: [
      { label: "0-10%", value: 0 },
      { label: "10-30%", value: 0 },
      { label: "30-50%", value: 0 },
      { label: "50-70%", value: 0 },
      { label: "70-90%", value: 0 },
      { label: "90-100%", value: 0 },
    ],
    geoRisk: [
      { region: "EU-West", clean: 0, flagged: 0 },
      { region: "US-East", clean: 0, flagged: 0 },
      { region: "APAC", clean: 0, flagged: 0 },
      { region: "LATAM", clean: 0, flagged: 0 },
      { region: "MEA", clean: 0, flagged: 0 },
    ],
    jobs: [
      {
        title: "Senior Full Stack Engineer",
        status: "Open",
        resumes: 1,
        selected: 0,
        created: "7/8/2026",
      },
    ],
    verificationQueue: [
      {
        initials: "AS",
        name: "Akash S",
        ref: "AKASH_S_262",
        level: "junior",
        jdMatch: "5%",
        riskLevel: "CRITICAL",
        atnaScore: "50%",
      },
    ],
  };
}

export interface DeepfakeData {
  metrics: { videosAnalyzed: number; authentic: number; aiGenerated: number };
  videos: {
    file: string;
    fakeProbability: string;
    reason: string;
    verdict: string;
    date: string;
  }[];
}

export async function fetchDeepfake(): Promise<DeepfakeData> {
  return {
    metrics: { videosAnalyzed: 1, authentic: 1, aiGenerated: 0 },
    videos: [
      {
        file: "Sai.mp4",
        fakeProbability: "13.1%",
        reason: "real",
        verdict: "Authentic",
        date: "7/8/2026",
      },
    ],
  };
}

export interface TruDocData {
  metrics: {
    totalChecked: { value: number; delta: string };
    passRate: { value: string; delta: string };
    flagged: { value: number; delta: string };
    avgTime: string;
  };
  documents: {
    id: string;
    name: string;
    atnaScore: string;
    verdict: string;
    uploadDate: string;
    status: string;
  }[];
}

export async function fetchTruDoc(): Promise<TruDocData> {
  return {
    metrics: {
      totalChecked: { value: 1, delta: "+0%" },
      passRate: { value: "0%", delta: "+0%" },
      flagged: { value: 1, delta: "+0%" },
      avgTime: "—",
    },
    documents: [
      {
        id: "128bf01a",
        name: "edited_sejda_document_1.pdf",
        atnaScore: "—",
        verdict: "Pending",
        uploadDate: "—",
        status: "Processed",
      },
    ],
  };
}
