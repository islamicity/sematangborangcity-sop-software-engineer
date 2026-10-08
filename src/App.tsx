import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { OverviewTab } from './components/OverviewTab';
import { CicdTab } from './components/CicdTab';
import { MonitoringTab } from './components/MonitoringTab';
import { RbacTab } from './components/RbacTab';
import { SopLibraryTab } from './components/SopLibraryTab';
import { CalculatorsTab } from './components/CalculatorsTab';
import { DakwahFinanceTab } from './components/DakwahFinanceTab';
import { SecurityAuditTab } from './components/SecurityAuditTab';
import { AlertsModal } from './components/AlertsModal';

import { ActiveTab, UserProfile, UserRole, FinancialTransaction, PipelineRun, SystemAlert, AuditLog } from './types';
import { initialUsers, initialJamaah, initialTransactions, initialPipelines, initialAlerts, initialAuditLogs } from './data/mockData';
import { documentsData } from './data/documentsData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  
  // RBAC & Users
  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialUsers[0]);

  // Data states
  const [pipelines, setPipelines] = useState<PipelineRun[]>(initialPipelines);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(initialTransactions);
  const [jamaahList, setJamaahList] = useState(initialJamaah);
  const [alerts, setAlerts] = useState<SystemAlert[]>(initialAlerts);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  
  // Alerts modal
  const [alertsModalOpen, setAlertsModalOpen] = useState(false);

  // Apply dark mode class to root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handlers
  const handleSelectUser = (user: UserProfile) => {
    setCurrentUser(user);
    handleAuditLogAdd({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userId: user.id,
      userName: user.name,
      action: 'USER_SESSION_SWITCH',
      module: 'RBAC Auth',
      ipAddress: '103.144.12.89',
      status: 'Success',
      details: `Sesi aktif dialihkan ke ${user.name} (${user.role})`
    });
  };

  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, role: newRole }));
    }
    handleAuditLogAdd({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'ROLE_PRIVILEGE_UPDATED',
      module: 'RBAC Policy',
      ipAddress: '103.144.12.89',
      status: 'Success',
      details: `Peran pengguna ID ${userId} diubah menjadi ${newRole}`
    });
  };

  const handleAddUser = (newUser: UserProfile) => {
    setUsers(prev => [newUser, ...prev]);
  };

  const handleAddPipeline = (newRun: PipelineRun) => {
    setPipelines(prev => [newRun, ...prev]);
  };

  const handleAddTransaction = (txn: FinancialTransaction) => {
    setTransactions(prev => [txn, ...prev]);
  };

  const handleUpdateJamaahStatus = (id: string, status: 'Lunas' | 'Tertunggak' | 'Sebagian') => {
    setJamaahList(prev => prev.map(j => j.id === id ? { ...j, paymentStatus: status } : j));
  };

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const handleRemediateAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true, autoRemediated: true, message: `${a.message} (Telah Disembuhkan Otomatis)` } : a));
    handleAuditLogAdd({
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'AUTO_REMEDIATION_TRIGGERED',
      module: 'SRE Auto-Healer',
      ipAddress: '103.144.12.89',
      status: 'Success',
      details: `Self-healing dieksekusi untuk alert ID ${id}`
    });
  };

  const handleClearAllAlerts = () => {
    setAlerts(prev => prev.map(a => ({ ...a, acknowledged: true })));
  };

  const handleAddAlert = (alert: SystemAlert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  const handleAuditLogAdd = (log: AuditLog) => {
    setAuditLogs(prev => [log, ...prev]);
  };

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        users={users}
        onSelectUser={handleSelectUser}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        alerts={alerts}
        onOpenAlerts={() => setAlertsModalOpen(true)}
        unacknowledgedCount={unacknowledgedCount}
      />

      {/* Main Layout Area */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isDarkMode={isDarkMode}
          currentUser={currentUser}
          sopCount={documentsData.length}
        />

        {/* Dynamic Main Workspace Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {activeTab === 'overview' && (
            <OverviewTab
              onNavigateTab={setActiveTab}
              currentUser={currentUser}
              transactions={transactions}
              pipelines={pipelines}
              alerts={alerts}
              sopCount={documentsData.length}
              jamaahCount={jamaahList.length}
            />
          )}

          {activeTab === 'cicd' && (
            <CicdTab
              pipelines={pipelines}
              onAddPipeline={handleAddPipeline}
              onAddAuditLog={handleAuditLogAdd}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'monitoring' && (
            <MonitoringTab
              alerts={alerts}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onRemediateAlert={handleRemediateAlert}
              onAddAlert={handleAddAlert}
              onAddAuditLog={handleAuditLogAdd}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'rbac' && (
            <RbacTab
              users={users}
              onAddUser={handleAddUser}
              onUpdateUserRole={handleUpdateUserRole}
              onAddAuditLog={handleAuditLogAdd}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'sop-library' && (
            <SopLibraryTab
              documents={documentsData}
            />
          )}

          {activeTab === 'calculators' && (
            <CalculatorsTab />
          )}

          {activeTab === 'dakwah-finance' && (
            <DakwahFinanceTab
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
              jamaahList={jamaahList}
              onUpdateJamaahStatus={handleUpdateJamaahStatus}
              onAddAuditLog={handleAuditLogAdd}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'security-audit' && (
            <SecurityAuditTab
              auditLogs={auditLogs}
              currentUser={currentUser}
              onAddAuditLog={handleAuditLogAdd}
            />
          )}
        </main>

      </div>

      {/* Alerts Modal */}
      <AlertsModal
        isOpen={alertsModalOpen}
        onClose={() => setAlertsModalOpen(false)}
        alerts={alerts}
        onAcknowledge={handleAcknowledgeAlert}
        onRemediate={handleRemediateAlert}
        onClearAll={handleClearAllAlerts}
      />

    </div>
  );
}
