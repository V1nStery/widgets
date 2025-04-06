import { WIDGET_TYPES } from './types';
import type { StatsWidgetData, ChartWidgetData, TableWidgetData, TextWidgetData, CalendarWidgetData } from './types';

type WidgetStylesType = {
  [WIDGET_TYPES.STATS]: {
    title: string;
    template: StatsWidgetData;
  };
  [WIDGET_TYPES.CHART]: {
    title: string;
    template: ChartWidgetData;
  };
  [WIDGET_TYPES.TABLE]: {
    title: string;
    template: TableWidgetData;
  };
  [WIDGET_TYPES.TEXT]: {
    title: string;
    template: TextWidgetData;
  };
  [WIDGET_TYPES.CALENDAR]: {
    title: string;
    template: CalendarWidgetData;
  };
};

export const WIDGET_STYLES: WidgetStylesType = {
  [WIDGET_TYPES.STATS]: {
    title: 'Статистика',
    template: {
      title: 'Статистика',
      value: '0',
      change: '+0%',
      description: 'Описание статистики',
      settings: {
        showIcon: true,
        iconType: 'arrow-up',
        colorScheme: 'blue',
        size: 'large',
        showTrend: true,
        backgroundColor: '#E0FFE0',
        borderRadius: 'square',
        fontSize: 'large',
        showDescription: true,
        showValue: true,
        showChange: true
      }
    }
  },
  [WIDGET_TYPES.CHART]: {
    title: 'График',
    template: {
      title: 'График',
      data: [
        { label: 'Янв', value: 30 },
        { label: 'Фев', value: 45 },
        { label: 'Мар', value: 60 },
        { label: 'Апр', value: 35 },
        { label: 'Май', value: 50 }
      ],
      settings: {
        showLegend: true,
        showGrid: true,
        animation: true,
        colorScheme: 'default',
        height: 300,
        backgroundColor: '#E0F0FF',
        borderRadius: 'square',
        fontSize: 'medium',
        showTitle: true,
        showAxis: true,
        showDataLabels: true
      }
    }
  },
  [WIDGET_TYPES.TABLE]: {
    title: 'Таблица',
    template: {
      title: 'Таблица',
      headers: ['Заголовок 1', 'Заголовок 2'],
      rows: [['Данные 1', 'Данные 2']],
      settings: {
        striped: true,
        bordered: true,
        hover: true,
        responsive: true,
        pagination: false,
        fontSize: 'medium',
        backgroundColor: '#F0E0FF',
        borderRadius: 'square',
        headerStyle: 'dark',
        rowStyle: 'light',
        showTitle: true,
        showHeaders: true
      }
    }
  },
  [WIDGET_TYPES.TEXT]: {
    title: 'Текст',
    template: {
      title: 'Текстовый блок',
      content: 'Содержимое текстового блока',
      settings: {
        fontSize: 'medium',
        textAlign: 'left',
        allowHtml: false,
        maxHeight: 'auto',
        showReadMore: false,
        backgroundColor: '#FFE0E0',
        borderRadius: 'square',
        showTitle: true,
        padding: 'medium',
        lineHeight: 'normal',
        textColor: '#1f2937'
      }
    }
  },
  [WIDGET_TYPES.CALENDAR]: {
    title: 'Календарь',
    template: {
      title: 'Календарь',
      currentDate: new Date().toISOString(),
      events: [
        { date: '2024-03-01', title: 'Событие 1', type: 'meeting' },
        { date: '2024-03-15', title: 'Событие 2', type: 'task' }
      ],
      settings: {
        view: 'month',
        showToday: true,
        allowEventCreation: true,
        eventColor: 'blue',
        firstDayOfWeek: 1,
        backgroundColor: '#FFFFE0',
        borderRadius: 'square',
        fontSize: 'medium',
        showTitle: true,
        showEvents: true,
        showWeekends: true,
        showWeekNumbers: false
      }
    }
  }
};

export const defaultLayout = {
  lg: [
    { i: 'widget1', x: 0, y: 0, w: 6, h: 4 },
    { i: 'widget2', x: 6, y: 0, w: 6, h: 4 },
    { i: 'widget3', x: 0, y: 4, w: 12, h: 4 },
  ],
  md: [
    { i: 'widget1', x: 0, y: 0, w: 5, h: 4 },
    { i: 'widget2', x: 5, y: 0, w: 5, h: 4 },
    { i: 'widget3', x: 0, y: 4, w: 10, h: 4 },
  ],
  sm: [
    { i: 'widget1', x: 0, y: 0, w: 3, h: 4 },
    { i: 'widget2', x: 3, y: 0, w: 3, h: 4 },
    { i: 'widget3', x: 0, y: 4, w: 6, h: 4 },
  ],
  xs: [
    { i: 'widget1', x: 0, y: 0, w: 2, h: 4 },
    { i: 'widget2', x: 2, y: 0, w: 2, h: 4 },
    { i: 'widget3', x: 0, y: 4, w: 4, h: 4 },
  ],
  xxs: [
    { i: 'widget1', x: 0, y: 0, w: 1, h: 4 },
    { i: 'widget2', x: 0, y: 4, w: 1, h: 4 },
    { i: 'widget3', x: 0, y: 8, w: 2, h: 4 },
  ],
}; 