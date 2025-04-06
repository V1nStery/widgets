// Типы виджетов
export const WIDGET_TYPES = {
  STATS: 'STATS',
  CHART: 'CHART',
  TABLE: 'TABLE',
  TEXT: 'TEXT',
  CALENDAR: 'CALENDAR'
} as const;

export type WidgetType = typeof WIDGET_TYPES[keyof typeof WIDGET_TYPES];

// Интерфейсы для настроек виджета
export interface WidgetSettings {
  backgroundColor?: string;
  borderRadius?: string;
  fontSize?: string;
  [key: string]: any;
}

export interface WidgetContentItem {
  id: string;
  type: string;
  content: string;
}

export interface BaseWidgetData {
  title: string;
  settings?: WidgetSettings;
  contentItems?: WidgetContentItem[];
  [key: string]: any;
}

export interface StatsWidgetData extends BaseWidgetData {
  value: string;
  change: string;
  description: string;
}

export interface ChartData {
  label: string;
  value: number;
}

export interface ChartSettings extends WidgetSettings {
  showTitle?: boolean;
  showGrid?: boolean;
  showDataLabels?: boolean;
  showLegend?: boolean;
  showAxis?: boolean;
  animation?: boolean;
  colorScheme?: string;
  height?: number;
}

export interface ChartWidgetData extends BaseWidgetData {
  data: ChartData[];
  settings: ChartSettings;
}

export interface TableWidgetData extends BaseWidgetData {
  headers: string[];
  rows: string[][];
}

export interface TextWidgetData extends BaseWidgetData {
  content: string;
}

export interface CalendarWidgetData extends BaseWidgetData {
  currentDate: string;
  events: Array<{
    date: string;
    title: string;
    type: string;
  }>;
}

export type WidgetData = 
  | StatsWidgetData 
  | ChartWidgetData 
  | TableWidgetData 
  | TextWidgetData 
  | CalendarWidgetData;

export interface Widget {
  type: WidgetType;
  data: WidgetData;
}

export interface WidgetsState {
  [key: string]: Widget;
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Layouts {
  [key: string]: LayoutItem[];
} 