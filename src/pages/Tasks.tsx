
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import TasksView from '@/components/tasks/TasksView';
import { PageTransition } from '@/components/common/Transitions';

const TasksPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight mb-2">Tasks Management</h1>
                <p className="text-gray-600">Track and manage your compliance tasks</p>
              </div>
              
              <TasksView />
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default TasksPage;
