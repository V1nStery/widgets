import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../styles/resize-handle.css';
import { Widget, WidgetsState, Layouts, WIDGET_TYPES, WidgetData, WidgetType } from './types';
import { WIDGET_STYLES, defaultLayout } from './constants';
import WidgetComponent from './Widgets/Widget';
import WidgetSettings from './Widgets/WidgetSettings';

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultWidgets: WidgetsState = {
  widget1: { 
    type: WIDGET_TYPES.STATS, 
    data: WIDGET_STYLES[WIDGET_TYPES.STATS].template
  },
  widget2: { 
    type: WIDGET_TYPES.CHART, 
    data: WIDGET_STYLES[WIDGET_TYPES.CHART].template
  },
  widget3: { 
    type: WIDGET_TYPES.TABLE, 
    data: WIDGET_STYLES[WIDGET_TYPES.TABLE].template
  }
};

const AdminPanel: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetsState>(defaultWidgets);
  const [layouts, setLayouts] = useState<Layouts>(defaultLayout);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [widgetToDelete, setWidgetToDelete] = useState<string | null>(null);
  const [editingWidget, setEditingWidget] = useState<string | null>(null);
  const [isMovingWidgets, setIsMovingWidgets] = useState(false);

  const handleLayoutChange = (layout: Layout[], layouts: Layouts) => {
    setLayouts(layouts);
  };

  const handleAddWidget = () => {
    const newId = `widget${Object.keys(widgets).length + 1}`;
    setWidgets(prev => ({
      ...prev,
      [newId]: {
        type: WIDGET_TYPES.STATS,
        data: WIDGET_STYLES[WIDGET_TYPES.STATS].template
      }
    }));
  };

  const handleEditWidget = (id: string) => {
    console.log('handleEditWidget вызван для виджета:', id);
    setEditingWidget(id);
  };

  const handleSaveWidget = (id: string, type: keyof typeof WIDGET_TYPES, data: WidgetData) => {
    console.log('handleSaveWidget вызван для виджета:', id, 'тип:', type);
    setWidgets(prev => ({
      ...prev,
      [id]: { type, data }
    }));
    setEditingWidget(null);
  };

  const handleCancelEdit = () => {
    console.log('handleCancelEdit вызван');
    setEditingWidget(null);
  };

  const handleDeleteWidget = (id: string) => {
    console.log('handleDeleteWidget вызван для виджета:', id);
    setWidgetToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteWidget = () => {
    console.log('confirmDeleteWidget вызван для виджета:', widgetToDelete);
    if (widgetToDelete) {
      const newWidgets = { ...widgets };
      delete newWidgets[widgetToDelete];
      setWidgets(newWidgets);
      setShowDeleteConfirm(false);
      setWidgetToDelete(null);
    }
  };

  const cancelDeleteWidget = () => {
    console.log('cancelDeleteWidget вызван');
    setShowDeleteConfirm(false);
    setWidgetToDelete(null);
  };

  const toggleMoveWidgets = () => {
    setIsMovingWidgets(!isMovingWidgets);
  };

  return (
    <div className={`p-4 ${isMovingWidgets ? 'moving-mode' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Панель управления</h1>
        <div className="space-x-2">
          {!isEditing ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                console.log('Включение режима редактирования');
                setIsEditing(true);
              }}
            >
              Редактировать панель
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  console.log('Сохранение изменений');
                  setIsEditing(false);
                }}
              >
                Сохранить
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  console.log('Отмена редактирования');
                  setIsEditing(false);
                }}
              >
                Отмена
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddWidget}
              >
                Добавить виджет
              </button>
              <button
                type="button"
                className={`btn ${isMovingWidgets ? 'btn-move' : 'btn-secondary'}`}
                onClick={toggleMoveWidgets}
              >
                {isMovingWidgets ? 'Завершить перемещение' : 'Переместить виджеты'}
              </button>
            </>
          )}
        </div>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditing && isMovingWidgets}
        isResizable={isEditing && isMovingWidgets}
      >
        {Object.entries(widgets).map(([id, widget]) => (
          <div key={id} className="shadow-lg">
            <WidgetComponent
              id={id}
              widget={widget}
              isEditing={isEditing}
              isMovingWidgets={isMovingWidgets}
              onEdit={() => handleEditWidget(id)}
              onDelete={() => handleDeleteWidget(id)}
            />
          </div>
        ))}
      </ResponsiveGridLayout>

      {editingWidget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Редактирование виджета</h2>
            <WidgetSettings
              widget={widgets[editingWidget]}
              onSave={(type, data) => handleSaveWidget(editingWidget, type, data)}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Подтверждение удаления</h2>
            <p className="mb-4">Вы уверены, что хотите удалить этот виджет?</p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelDeleteWidget}
              >
                Отмена
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDeleteWidget}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;