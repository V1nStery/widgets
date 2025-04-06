import React, { useState, useEffect } from 'react';
import { Widget, WIDGET_TYPES, WidgetData, ChartData } from '../types';
import { WIDGET_STYLES } from '../constants';

interface WidgetSettingsProps {
  widget: Widget;
  onSave: (type: keyof typeof WIDGET_TYPES, data: WidgetData) => void;
  onCancel: () => void;
}

// Массив доступных цветов для виджетов
const WIDGET_COLORS = [
  { name: 'Белый', value: '#FFFFFF' },
  { name: 'Светло-голубой', value: '#E0F0FF' },
  { name: 'Светло-зеленый', value: '#E0FFE0' },
  { name: 'Светло-желтый', value: '#FFFFE0' },
  { name: 'Светло-фиолетовый', value: '#F0E0FF' },
  { name: 'Светло-розовый', value: '#FFE0E0' },
  { name: 'Светло-серый', value: '#F5F5F5' },
  { name: 'Светло-оранжевый', value: '#FFE0C0' },
];

const WidgetSettings: React.FC<WidgetSettingsProps> = ({ widget, onSave, onCancel }) => {
  const [selectedType, setSelectedType] = useState<keyof typeof WIDGET_TYPES>(widget.type);
  const [widgetData, setWidgetData] = useState<WidgetData>(widget.data);

  useEffect(() => {
    console.log('WidgetSettings компонент отрендерен с виджетом:', widget);
  }, [widget]);

  const handleTypeChange = (type: keyof typeof WIDGET_TYPES) => {
    console.log('Изменение типа виджета на:', type);
    setSelectedType(type);
    setWidgetData(WIDGET_STYLES[type].template);
  };

  const handleSave = () => {
    console.log('Сохранение настроек виджета:', selectedType, widgetData);
    onSave(selectedType, widgetData);
  };

  const handleCancel = () => {
    console.log('Отмена редактирования виджета');
    onCancel();
  };

  const handleColorChange = (color: string) => {
    console.log('Изменение цвета виджета на:', color);
    setWidgetData({
      ...widgetData,
      settings: {
        ...widgetData.settings,
        backgroundColor: color
      }
    });
  };

  const renderSettings = () => {
    switch (selectedType) {
      case 'STATS':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заголовок
              </label>
              <input
                type="text"
                value={widgetData.title}
                onChange={(e) => setWidgetData({ ...widgetData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Значение
              </label>
              <input
                type="text"
                value={widgetData.value}
                onChange={(e) => setWidgetData({ ...widgetData, value: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Изменение
              </label>
              <input
                type="text"
                value={widgetData.change}
                onChange={(e) => setWidgetData({ ...widgetData, change: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>
              <textarea
                value={widgetData.description}
                onChange={(e) => setWidgetData({ ...widgetData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        );

      case 'CHART':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заголовок
              </label>
              <input
                type="text"
                value={widgetData.title}
                onChange={(e) => setWidgetData({ ...widgetData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Данные
              </label>
              <div className="space-y-2">
                {(widgetData.data as ChartData[]).map((item: ChartData, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => {
                        const newData = [...(widgetData.data as ChartData[])];
                        newData[index] = { ...item, label: e.target.value };
                        setWidgetData({ ...widgetData, data: newData });
                      }}
                      placeholder="Метка"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => {
                        const newData = [...(widgetData.data as ChartData[])];
                        newData[index] = { ...item, value: Number(e.target.value) };
                        setWidgetData({ ...widgetData, data: newData });
                      }}
                      placeholder="Значение"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setWidgetData({
                      ...widgetData,
                      data: [...(widgetData.data as ChartData[]), { label: '', value: 0 }]
                    });
                  }}
                  className="w-full px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
                >
                  Добавить значение
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={widgetData.settings?.showGrid}
                  onChange={(e) => setWidgetData({
                    ...widgetData,
                    settings: { ...widgetData.settings, showGrid: e.target.checked }
                  })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Показывать сетку</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={widgetData.settings?.showDataLabels}
                  onChange={(e) => setWidgetData({
                    ...widgetData,
                    settings: { ...widgetData.settings, showDataLabels: e.target.checked }
                  })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Показывать значения</span>
              </label>
            </div>
          </div>
        );

      case 'TABLE':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заголовок
              </label>
              <input
                type="text"
                value={widgetData.title}
                onChange={(e) => setWidgetData({ ...widgetData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заголовки столбцов
              </label>
              <div className="flex gap-2 mb-2">
                {widgetData.headers.map((header: string, index: number) => (
                  <input
                    key={index}
                    type="text"
                    value={header}
                    onChange={(e) => {
                      const newHeaders = [...widgetData.headers];
                      newHeaders[index] = e.target.value;
                      setWidgetData({ ...widgetData, headers: newHeaders });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setWidgetData({
                      ...widgetData,
                      headers: [...widgetData.headers, ''],
                      rows: widgetData.rows.map((row: string[]) => [...row, ''])
                    });
                  }}
                  className="px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Данные
              </label>
              <div className="space-y-2">
                {widgetData.rows.map((row: string[], rowIndex: number) => (
                  <div key={rowIndex} className="flex gap-2">
                    {row.map((cell: string, cellIndex: number) => (
                      <input
                        key={cellIndex}
                        type="text"
                        value={cell}
                        onChange={(e) => {
                          const newRows = [...widgetData.rows];
                          newRows[rowIndex][cellIndex] = e.target.value;
                          setWidgetData({ ...widgetData, rows: newRows });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ))}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setWidgetData({
                      ...widgetData,
                      rows: [...widgetData.rows, Array(widgetData.headers.length).fill('')]
                    });
                  }}
                  className="w-full px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
                >
                  Добавить строку
                </button>
              </div>
            </div>
          </div>
        );

      case 'TEXT':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заголовок
              </label>
              <input
                type="text"
                value={widgetData.title}
                onChange={(e) => setWidgetData({ ...widgetData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Содержимое
              </label>
              <textarea
                value={widgetData.content}
                onChange={(e) => setWidgetData({ ...widgetData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={5}
              />
            </div>
          </div>
        );

      case 'CALENDAR':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заголовок
              </label>
              <input
                type="text"
                value={widgetData.title}
                onChange={(e) => setWidgetData({ ...widgetData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                События
              </label>
              <div className="space-y-2">
                {widgetData.events.map((event: { date: string; title: string; type: string }, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="date"
                      value={event.date}
                      onChange={(e) => {
                        const newEvents = [...widgetData.events];
                        newEvents[index] = { ...event, date: e.target.value };
                        setWidgetData({ ...widgetData, events: newEvents });
                      }}
                      className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) => {
                        const newEvents = [...widgetData.events];
                        newEvents[index] = { ...event, title: e.target.value };
                        setWidgetData({ ...widgetData, events: newEvents });
                      }}
                      placeholder="Название события"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <select
                      value={event.type}
                      onChange={(e) => {
                        const newEvents = [...widgetData.events];
                        newEvents[index] = { ...event, type: e.target.value };
                        setWidgetData({ ...widgetData, events: newEvents });
                      }}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="meeting">Встреча</option>
                      <option value="task">Задача</option>
                      <option value="reminder">Напоминание</option>
                    </select>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setWidgetData({
                      ...widgetData,
                      events: [...widgetData.events, { date: '', title: '', type: 'meeting' }]
                    });
                  }}
                  className="w-full px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
                >
                  Добавить событие
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Настройки виджета</h3>
        <div className="space-x-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Отмена
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Сохранить
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Тип виджета
        </label>
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value as keyof typeof WIDGET_TYPES)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {Object.entries(WIDGET_TYPES).map(([key, value]) => (
            <option key={key} value={value}>
              {WIDGET_STYLES[value].title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Цвет фона
        </label>
        <div className="flex flex-wrap gap-2">
          {WIDGET_COLORS.map((color) => (
            <div 
              key={color.value}
              className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                widgetData.settings?.backgroundColor === color.value 
                  ? 'border-blue-500' 
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
              onClick={() => handleColorChange(color.value)}
            />
          ))}
        </div>
      </div>
      {renderSettings()}
    </div>
  );
};

export default WidgetSettings; 