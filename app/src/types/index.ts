// INNO-HI Type Definitions

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  details: string[];
}

export interface UseCase {
  title: string;
  subtitle: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface TechSpec {
  category: string;
  items: {
    name: string;
    description: string;
  }[];
}

export interface SimulatorData {
  monthlyCases: number;
  avgHandleTime: number;
  staffCount: number;
}

export interface SimulatorResult {
  timeSaved: number;
  costSaved: number;
  efficiencyGain: number;
}
