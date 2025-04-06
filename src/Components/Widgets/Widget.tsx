import React from 'react';
import { Widget as WidgetType, ChartData, WIDGET_TYPES } from '../types';
import CalendarWidget from './CalendarWidget';

interface WidgetProps {
  id: string;
  widget: WidgetType;
  isEditing: boolean;
  isMovingWidgets: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const Widget: React.FC<WidgetProps> = ({ id, widget, isEditing, isMovingWidgets, onEdit, onDelete }) => {
  const renderWidgetContent = () => {
    switch (widget.type) {
      case WIDGET_TYPES.STATS:
        return (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{widget.data.title}</h3>
            <div className="text-3xl font-bold mb-1">{widget.data.value}</div>
            <div className="text-sm text-gray-600">{widget.data.change}</div>
            {widget.data.description && (
              <div className="text-sm text-gray-500 mt-2">{widget.data.description}</div>
            )}
          </div>
        );
      case WIDGET_TYPES.CHART:
        if (!widget.data.data || widget.data.data.length === 0) {
          return <div className="text-center text-gray-500">Нет данных для отображения</div>;
        }
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">{widget.data.title}</h3>
            <div className="h-64">
              {/* Chart implementation */}
              <div className="flex items-end h-full space-x-2">
                {(widget.data.data as ChartData[]).map((item: ChartData, index: number) => (
                  <div
                    key={index}
                    className="bg-blue-500 w-8"
                    style={{ height: `${(item.value / 100) * 100}%` }}
                  >
                    <div className="text-xs text-center mt-2">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case WIDGET_TYPES.TABLE:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">{widget.data.title}</h3>
            <table className="min-w-full">
              <thead>
                <tr>
                  {widget.data.headers.map((header: string, index: number) => (
                    <th key={index} className="px-4 py-2 text-left">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {widget.data.rows.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <td key={cellIndex} className="px-4 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case WIDGET_TYPES.TEXT:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">{widget.data.title}</h3>
            <div className="prose">{widget.data.content}</div>
          </div>
        );
      case WIDGET_TYPES.CALENDAR:
        return <CalendarWidget widget={widget} />;
      default:
        return <div>Неизвестный тип виджета</div>;
    }
  };

  // Получаем цвет фона из настроек виджета или используем значение по умолчанию
  const backgroundColor = widget.data.settings?.backgroundColor || '#FFFFFF';

  return (
    <div 
      className="relative h-full p-4 rounded-lg transition-colors duration-300"
      style={{ backgroundColor }}
    >
      {isEditing && !isMovingWidgets && (
        <div className="absolute top-2 right-2 space-x-2 z-10">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log('Кнопка "Редактировать" нажата для виджета:', id);
              onEdit();
            }}
          >
            Редактировать
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              console.log('Кнопка "Удалить" нажата для виджета:', id);
              onDelete();
            }}
          >
            Удалить
          </button>
        </div>
      )}
      {renderWidgetContent()}
    </div>
  );
};

export default Widget; 