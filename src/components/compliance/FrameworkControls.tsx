
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../common/Button';
import { Card, CardContent } from '../common/Card';
import { FadeIn, SlideUp } from '../common/Transitions';
import { FileText, Plus, CheckCircle, Clock, AlertCircle, Upload, Edit, Save } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// ISO 27001 clauses and controls data
const iso27001Clauses = [
  {
    id: 'a5',
    number: 'A.5',
    title: 'Organizational controls',
    description: 'Controls related to the organization structure and responsibilities',
    controls: [
      { id: 'a5.1', number: 'A.5.1', title: 'Policies for information security', description: 'Management direction for information security.' },
      { id: 'a5.2', number: 'A.5.2', title: 'Information security roles and responsibilities', description: 'Assignment of information security responsibilities.' },
      { id: 'a5.3', number: 'A.5.3', title: 'Segregation of duties', description: 'Separate duties to prevent unauthorized modifications and system misuse.' },
      { id: 'a5.4', number: 'A.5.4', title: 'Management responsibilities', description: 'Management support for information security implementation.' },
      { id: 'a5.5', number: 'A.5.5', title: 'Contact with authorities', description: 'Appropriate contacts with relevant authorities.' },
      { id: 'a5.6', number: 'A.5.6', title: 'Contact with special interest groups', description: 'Maintaining contacts with specialized security forums.' },
      { id: 'a5.7', number: 'A.5.7', title: 'Threat intelligence', description: 'Information about cybersecurity threats is collected and analyzed.' },
      { id: 'a5.8', number: 'A.5.8', title: 'Information security in project management', description: 'Information security in project management methodology.' },
      { id: 'a5.9', number: 'A.5.9', title: 'Inventory of information and other associated assets', description: 'Assets associated with information and information processing are identified and inventoried.' },
      { id: 'a5.10', number: 'A.5.10', title: 'Acceptable use of information and other associated assets', description: 'Rules for acceptable use of information and assets are identified, documented and implemented.' },
      { id: 'a5.11', number: 'A.5.11', title: 'Return of assets', description: 'All employees and external party users return organizational assets upon termination.' },
      { id: 'a5.12', number: 'A.5.12', title: 'Classification of information', description: 'Information is classified in terms of legal requirements, value, criticality and sensitivity.' },
      { id: 'a5.13', number: 'A.5.13', title: 'Labelling of information', description: 'Appropriate information labelling procedure is developed and implemented.' },
      { id: 'a5.14', number: 'A.5.14', title: 'Information transfer', description: 'Information transfer rules, procedures or agreements are in place.' },
      { id: 'a5.15', number: 'A.5.15', title: 'Access control', description: 'Rules to control access to information and other associated assets are established and implemented.' },
      { id: 'a5.16', number: 'A.5.16', title: 'Identity management', description: 'The complete life cycle of identities is managed.' },
      { id: 'a5.17', number: 'A.5.17', title: 'Authentication information', description: 'Allocation and management of authentication information is controlled by a management process.' },
      { id: 'a5.18', number: 'A.5.18', title: 'Access rights', description: 'Information owners allocate access rights in accordance with access control rules.' },
      { id: 'a5.19', number: 'A.5.19', title: 'Information security in supplier relationships', description: 'Processes and procedures are implemented to manage information security risks associated with suppliers.' },
      { id: 'a5.20', number: 'A.5.20', title: 'Addressing information security within supplier agreements', description: 'Relevant information security requirements are established and agreed with each supplier.' },
      { id: 'a5.21', number: 'A.5.21', title: 'Managing information security in the ICT supply chain', description: 'Processes and procedures are implemented to manage the information security risks associated with ICT products and services.' },
      { id: 'a5.22', number: 'A.5.22', title: 'Monitoring, review and change management of supplier services', description: 'Organizations regularly monitor, review and manage changes to supplier services.' },
      { id: 'a5.23', number: 'A.5.23', title: 'Information security for use of cloud services', description: 'Processes for acquisition, use, management and exit from cloud services are established.' },
      { id: 'a5.24', number: 'A.5.24', title: 'Information security incident management planning and preparation', description: 'Information security incident management processes are established.' },
      { id: 'a5.25', number: 'A.5.25', title: 'Assessment and decision on information security events', description: 'Information security events are assessed and decisions made on whether they are information security incidents.' },
      { id: 'a5.26', number: 'A.5.26', title: 'Response to information security incidents', description: 'Information security incidents are responded to in accordance with documented procedures.' },
      { id: 'a5.27', number: 'A.5.27', title: 'Learning from information security incidents', description: 'Knowledge gained from information security incidents is used to strengthen and improve information security controls.' },
      { id: 'a5.28', number: 'A.5.28', title: 'Collection of evidence', description: 'Procedures for identification, collection, acquisition and preservation of evidence related to information security incidents are established and implemented.' },
      { id: 'a5.29', number: 'A.5.29', title: 'Information security during disruption', description: 'Information security is planned for during disruptions.' },
      { id: 'a5.30', number: 'A.5.30', title: 'ICT readiness for business continuity', description: 'ICT readiness is planned, implemented, maintained and tested based on business continuity objectives and ICT continuity requirements.' },
      { id: 'a5.31', number: 'A.5.31', title: 'Legal, statutory, regulatory and contractual requirements', description: 'Legal, statutory, regulatory and contractual requirements related to information security are identified, documented and kept up to date.' },
      { id: 'a5.32', number: 'A.5.32', title: 'Intellectual property rights', description: 'Intellectual property rights and the use of proprietary software products are appropriately managed.' },
      { id: 'a5.33', number: 'A.5.33', title: 'Protection of records', description: 'Records are protected from loss, destruction, falsification, unauthorized access and unauthorized release.' },
      { id: 'a5.34', number: 'A.5.34', title: 'Privacy and protection of PII', description: 'Privacy and protection of personally identifiable information are ensured.' },
      { id: 'a5.35', number: 'A.5.35', title: 'Independent review of information security', description: 'The organization\'s approach to information security is independently reviewed at planned intervals.' },
      { id: 'a5.36', number: 'A.5.36', title: 'Compliance with policies, rules and standards for information security', description: 'Compliance with the organization\'s information security policies, rules and standards is regularly reviewed.' },
      { id: 'a5.37', number: 'A.5.37', title: 'Documented operating procedures', description: 'Operating procedures for information processing facilities are documented and made available to all users who need them.' },
    ]
  },
  {
    id: 'a6',
    number: 'A.6',
    title: 'People controls',
    description: 'Controls related to people and human resources',
    controls: [
      { id: 'a6.1', number: 'A.6.1', title: 'Screening', description: 'Background verification checks on candidates for employment are carried out.' },
      { id: 'a6.2', number: 'A.6.2', title: 'Terms and conditions of employment', description: 'Employment agreements address information security responsibilities.' },
      { id: 'a6.3', number: 'A.6.3', title: 'Information security awareness, education and training', description: 'Organization members receive appropriate information security awareness, education and training.' },
      { id: 'a6.4', number: 'A.6.4', title: 'Disciplinary process', description: 'A disciplinary process for information security violations is established and communicated.' },
      { id: 'a6.5', number: 'A.6.5', title: 'Responsibilities after termination or change of employment', description: 'Information security responsibilities that remain valid after termination or change of employment are defined, communicated and enforced.' },
      { id: 'a6.6', number: 'A.6.6', title: 'Confidentiality or non-disclosure agreements', description: 'Confidentiality or non-disclosure agreements reflecting the organization\'s needs are identified, documented, regularly reviewed and signed.' },
      { id: 'a6.7', number: 'A.6.7', title: 'Remote working', description: 'Security measures are implemented when working remotely.' },
      { id: 'a6.8', number: 'A.6.8', title: 'Information security event reporting', description: 'The organization\'s personnel and other relevant interested parties are required to report any observed or suspected information security events.' },
    ]
  },
  {
    id: 'a7',
    number: 'A.7',
    title: 'Physical controls',
    description: 'Controls related to physical security and environmental protection',
    controls: [
      { id: 'a7.1', number: 'A.7.1', title: 'Physical security perimeter', description: 'Security perimeters are defined and used to protect areas containing sensitive or critical information.' },
      { id: 'a7.2', number: 'A.7.2', title: 'Physical entry', description: 'Secure areas are protected by appropriate entry controls.' },
      { id: 'a7.3', number: 'A.7.3', title: 'Securing offices, rooms and facilities', description: 'Physical security for offices, rooms and facilities is designed and implemented.' },
      { id: 'a7.4', number: 'A.7.4', title: 'Physical security monitoring', description: 'Premises are continuously monitored for unauthorized physical access.' },
      { id: 'a7.5', number: 'A.7.5', title: 'Protecting against physical and environmental threats', description: 'Protection against physical and environmental threats is designed and implemented.' },
      { id: 'a7.6', number: 'A.7.6', title: 'Working in secure areas', description: 'Procedures for working in secure areas are designed and implemented.' },
      { id: 'a7.7', number: 'A.7.7', title: 'Clear desk and clear screen', description: 'Clear desk and clear screen policies are implemented.' },
      { id: 'a7.8', number: 'A.7.8', title: 'Equipment siting and protection', description: 'Equipment is sited and protected to reduce risks from environmental threats and hazards, and opportunities for unauthorized access.' },
      { id: 'a7.9', number: 'A.7.9', title: 'Security of assets off-premises', description: 'Off-site assets are secured.' },
      { id: 'a7.10', number: 'A.7.10', title: 'Storage media', description: 'Storage media are managed through their lifecycle of acquisition, use, removal and disposal.' },
      { id: 'a7.11', number: 'A.7.11', title: 'Supporting utilities', description: 'Equipment is protected from power failures and other disruptions caused by failures in supporting utilities.' },
      { id: 'a7.12', number: 'A.7.12', title: 'Cabling security', description: 'Power and telecommunications cabling is protected from interception, interference or damage.' },
      { id: 'a7.13', number: 'A.7.13', title: 'Equipment maintenance', description: 'Equipment is correctly maintained.' },
      { id: 'a7.14', number: 'A.7.14', title: 'Secure disposal or re-use of equipment', description: 'Items of equipment containing storage media are verified to ensure that sensitive data and licensed software has been removed or securely overwritten prior to disposal or re-use.' },
    ]
  },
  {
    id: 'a8',
    number: 'A.8',
    title: 'Technological controls',
    description: 'Controls related to technology and technical security measures',
    controls: [
      { id: 'a8.1', number: 'A.8.1', title: 'User endpoint devices', description: 'Information stored on, processed by or accessible via user endpoint devices is protected.' },
      { id: 'a8.2', number: 'A.8.2', title: 'Privileged access rights', description: 'The allocation and use of privileged access rights are restricted and managed.' },
      { id: 'a8.3', number: 'A.8.3', title: 'Information access restriction', description: 'Access to information and information processing systems are restricted in accordance with the access control policy.' },
      { id: 'a8.4', number: 'A.8.4', title: 'Access to source code', description: 'Access to source code is restricted.' },
      { id: 'a8.5', number: 'A.8.5', title: 'Secure authentication', description: 'Authentication information is protected against unauthorized access.' },
      { id: 'a8.6', number: 'A.8.6', title: 'Capacity management', description: 'The use of resources is monitored and adjusted in line with current and expected capacity requirements.' },
      { id: 'a8.7', number: 'A.8.7', title: 'Protection against malware', description: 'Protection against malware is implemented and enabled.' },
      { id: 'a8.8', number: 'A.8.8', title: 'Management of technical vulnerabilities', description: 'Technical vulnerabilities are managed in a timely and effective manner.' },
      { id: 'a8.9', number: 'A.8.9', title: 'Configuration management', description: 'Configurations, including security configurations, of hardware, software, services and networks are established, documented, implemented, monitored and reviewed.' },
      { id: 'a8.10', number: 'A.8.10', title: 'Information deletion', description: 'Information stored in information systems, devices or in any other storage media is deleted when no longer required.' },
      { id: 'a8.11', number: 'A.8.11', title: 'Data masking', description: 'Data masking is implemented in accordance with the organization\'s access control policy and other related security policies.' },
      { id: 'a8.12', number: 'A.8.12', title: 'Data leakage prevention', description: 'Data leakage prevention measures are applied to systems, networks and any devices that process, store or transmit sensitive information.' },
      { id: 'a8.13', number: 'A.8.13', title: 'Information backup', description: 'Backup copies of information, software and system configurations are taken and regularly tested.' },
      { id: 'a8.14', number: 'A.8.14', title: 'Redundancy of information processing facilities', description: 'Information processing facilities are implemented with redundancy sufficient to meet availability requirements.' },
      { id: 'a8.15', number: 'A.8.15', title: 'Logging', description: 'Logs that record user activities, exceptions, faults and information security events are produced, stored, protected and analyzed.' },
      { id: 'a8.16', number: 'A.8.16', title: 'Monitoring activities', description: 'Networks, systems and applications are monitored for anomalous behavior and appropriate actions taken to evaluate potential information security incidents.' },
      { id: 'a8.17', number: 'A.8.17', title: 'Clock synchronization', description: 'Clocks of all relevant information processing systems within an organization are synchronized to a single reference time source.' },
      { id: 'a8.18', number: 'A.8.18', title: 'Use of privileged utility programs', description: 'The use of privileged utility programs is restricted and tightly controlled.' },
      { id: 'a8.19', number: 'A.8.19', title: 'Installation of software on operational systems', description: 'Software installation on operational systems is managed.' },
      { id: 'a8.20', number: 'A.8.20', title: 'Networks security', description: 'Networks and network devices are secured, managed and controlled to protect information in systems and applications.' },
      { id: 'a8.21', number: 'A.8.21', title: 'Security of network services', description: 'Security mechanisms, service levels and management requirements of all network services are identified, implemented and monitored.' },
      { id: 'a8.22', number: 'A.8.22', title: 'Segregation of networks', description: 'Groups of information services, users and information systems are segregated in networks.' },
      { id: 'a8.23', number: 'A.8.23', title: 'Web filtering', description: 'Access to external websites is managed to reduce exposure to malicious content.' },
      { id: 'a8.24', number: 'A.8.24', title: 'Use of cryptography', description: 'Rules for the effective use of cryptography are developed and implemented.' },
      { id: 'a8.25', number: 'A.8.25', title: 'Secure development lifecycle', description: 'Rules for the secure development of software and systems are established and applied to in-house developments.' },
      { id: 'a8.26', number: 'A.8.26', title: 'Application security requirements', description: 'Security requirements are included in the requirements for new information systems or enhancements to existing information systems.' },
      { id: 'a8.27', number: 'A.8.27', title: 'Secure system architecture and engineering principles', description: 'Principles for engineering secure systems are established, documented, maintained and applied to any information system implementation efforts.' },
      { id: 'a8.28', number: 'A.8.28', title: 'Secure coding', description: 'Secure coding principles are applied to software development.' },
      { id: 'a8.29', number: 'A.8.29', title: 'Security testing in development and acceptance', description: 'Information systems are tested for security during development and prior to acceptance.' },
      { id: 'a8.30', number: 'A.8.30', title: 'Outsourced development', description: 'The organization supervises, monitors and controls outsourced system development activities.' },
      { id: 'a8.31', number: 'A.8.31', title: 'Separation of development, test and production environments', description: 'Development, testing and production environments are separated and secured.' },
      { id: 'a8.32', number: 'A.8.32', title: 'Change management', description: 'Changes to systems within the development lifecycle are controlled through the use of formal change control procedures.' },
      { id: 'a8.33', number: 'A.8.33', title: 'Test information', description: 'Test information is selected, protected and managed appropriately.' },
      { id: 'a8.34', number: 'A.8.34', title: 'Protection of information systems during audit testing', description: 'Audit requirements and activities involving verification of operational systems are carefully planned to minimize disruptions.' },
    ]
  }
];

interface FrameworkControlsProps {
  frameworkId: string;
}

const FrameworkControls: React.FC<FrameworkControlsProps> = ({ frameworkId }) => {
  const [selectedClause, setSelectedClause] = useState<string | null>(null);
  const [selectedControl, setSelectedControl] = useState<any | null>(null);
  const [implementationStatus, setImplementationStatus] = useState<string>('not_implemented');
  const [documents, setDocuments] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newDocument, setNewDocument] = useState({ title: '', file: null });
  const [newTask, setNewTask] = useState({ description: '', assignedTo: '', dueDate: '' });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Find the current clause and control
  const currentClause = iso27001Clauses.find(clause => clause.id === selectedClause);
  const currentControl = currentClause?.controls.find(control => control.id === selectedControl);

  // Load control data when a control is selected
  useEffect(() => {
    if (selectedControl) {
      loadControlData();
    }
  }, [selectedControl]);

  // Select the first clause by default
  useEffect(() => {
    if (iso27001Clauses.length > 0 && !selectedClause) {
      setSelectedClause(iso27001Clauses[0].id);
    }
    setLoading(false);
  }, [selectedClause]);

  const loadControlData = async () => {
    if (!selectedControl) return;
    
    try {
      setLoading(true);
      
      // In a real application, we would fetch the data from Supabase here
      // This is a simulated API call
      const controlData = {
        status: 'not_implemented',
        notes: '',
        documents: [],
        tasks: []
      };
      
      // For demo purposes, simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set the data
      setImplementationStatus(controlData.status);
      setNotes(controlData.notes);
      setDocuments(controlData.documents);
      setTasks(controlData.tasks);
    } catch (error) {
      console.error('Error loading control data:', error);
      toast.error('Failed to load control data');
    } finally {
      setLoading(false);
    }
  };

  const handleControlClick = (controlId: string) => {
    setSelectedControl(controlId);
    // The data will be loaded via the useEffect
  };

  const handleStatusChange = async (status: string) => {
    try {
      setSaving(true);
      setImplementationStatus(status);
      
      // In a real application, we would save to Supabase here
      // For now, simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success(`Status updated to ${status.replace('_', ' ')}`);
    } catch (error) {
      console.error('Error saving status:', error);
      toast.error('Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    try {
      setSaving(true);
      
      // In a real application, we would save to Supabase here
      // For now, simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save notes');
    } finally {
      setSaving(false);
    }
  };

  const handleAddDocument = async () => {
    if (!newDocument.title) {
      toast.error('Please provide a document title');
      return;
    }

    try {
      setSaving(true);
      
      // In a real application, we would upload the file to Supabase Storage
      // and save the metadata to the database
      
      const newDocumentObj = { 
        id: Date.now().toString(), 
        title: newDocument.title, 
        date: new Date().toISOString().split('T')[0],
        type: 'pdf'
      };
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setDocuments([...documents, newDocumentObj]);
      setNewDocument({ title: '', file: null });
      setShowAddDocument(false);
      toast.success('Document added successfully');
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error('Failed to add document');
    } finally {
      setSaving(false);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.description) {
      toast.error('Please provide a task description');
      return;
    }

    try {
      setSaving(true);
      
      const taskObj = { 
        id: Date.now().toString(), 
        description: newTask.description, 
        assignedTo: newTask.assignedTo || 'Unassigned',
        dueDate: newTask.dueDate || 'No due date',
        status: 'open'
      };
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTasks([...tasks, taskObj]);
      setNewTask({ description: '', assignedTo: '', dueDate: '' });
      setShowAddTask(false);
      toast.success('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    } finally {
      setSaving(false);
    }
  };

  if (loading && !currentControl) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <FadeIn className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Left sidebar - Clauses and Controls */}
      <div className="md:col-span-4 lg:col-span-3">
        <Card className="h-full overflow-auto max-h-[800px]">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Structure</h3>
            <div className="space-y-1">
              {iso27001Clauses.map((clause) => (
                <div key={clause.id} className="mb-4">
                  <button
                    className={`flex items-center w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedClause === clause.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedClause(clause.id)}
                  >
                    <span className="mr-2 text-blue-600">{clause.number}:</span> {clause.title}
                  </button>
                  
                  {selectedClause === clause.id && (
                    <div className="ml-4 mt-2 space-y-1">
                      {clause.controls.map((control) => (
                        <button
                          key={control.id}
                          className={`flex items-center w-full text-left px-3 py-2 rounded-md transition-colors ${
                            selectedControl === control.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                          }`}
                          onClick={() => handleControlClick(control.id)}
                        >
                          <span className="mr-2 text-blue-600">{control.number}:</span> {control.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right content area - Control details */}
      <div className="md:col-span-8 lg:col-span-9">
        {selectedControl ? (
          <SlideUp>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-2">{currentControl?.number}: {currentControl?.title}</h2>
                  <p className="text-gray-600">{currentControl?.description}</p>
                </div>
                
                {/* Implementation Status */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Implementation Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={implementationStatus === 'not_implemented' ? 'default' : 'outline'} 
                      onClick={() => handleStatusChange('not_implemented')}
                      size="sm"
                      leftIcon={<AlertCircle size={16} />}
                      isLoading={saving && implementationStatus !== 'not_implemented'}
                    >
                      Not Implemented
                    </Button>
                    <Button 
                      variant={implementationStatus === 'in_progress' ? 'default' : 'outline'} 
                      onClick={() => handleStatusChange('in_progress')}
                      size="sm"
                      leftIcon={<Clock size={16} />}
                      isLoading={saving && implementationStatus !== 'in_progress'}
                    >
                      In Progress
                    </Button>
                    <Button 
                      variant={implementationStatus === 'implemented' ? 'default' : 'outline'} 
                      onClick={() => handleStatusChange('implemented')}
                      size="sm"
                      leftIcon={<CheckCircle size={16} />}
                      isLoading={saving && implementationStatus !== 'implemented'}
                    >
                      Implemented
                    </Button>
                    <Button 
                      variant={implementationStatus === 'not_applicable' ? 'default' : 'outline'} 
                      onClick={() => handleStatusChange('not_applicable')}
                      size="sm"
                      isLoading={saving && implementationStatus !== 'not_applicable'}
                    >
                      Not Applicable
                    </Button>
                  </div>
                </div>
                
                {/* Notes */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Notes</h3>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                    placeholder="Add implementation notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      onClick={handleSaveNotes}
                      size="sm"
                      leftIcon={<Save size={16} />}
                      isLoading={saving}
                    >
                      Save Notes
                    </Button>
                  </div>
                </div>
                
                {/* Documents */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Documents</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<Upload size={16} />}
                      onClick={() => setShowAddDocument(true)}
                    >
                      Add Document
                    </Button>
                  </div>
                  
                  {showAddDocument && (
                    <div className="p-4 bg-gray-50 rounded-md mb-4 border border-gray-200">
                      <h4 className="font-medium mb-2">Upload Document</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm mb-1">Document Title</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md" 
                            placeholder="Enter document title"
                            value={newDocument.title}
                            onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">File</label>
                          <input 
                            type="file" 
                            className="w-full p-2 border border-gray-300 rounded-md" 
                            onChange={(e) => setNewDocument({
                              ...newDocument, 
                              file: e.target.files ? e.target.files[0] : null
                            })}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowAddDocument(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleAddDocument}
                            isLoading={saving}
                          >
                            Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {documents.length === 0 ? (
                    <p className="text-gray-500 italic p-4 bg-gray-50 rounded border border-gray-200">No documents attached</p>
                  ) : (
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                          <div className="flex items-center">
                            <FileText size={20} className="text-blue-600 mr-2" />
                            <div>
                              <p className="font-medium">{doc.title}</p>
                              <p className="text-xs text-gray-500">Added on {doc.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Tasks */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">To-dos</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<Plus size={16} />}
                      onClick={() => setShowAddTask(true)}
                    >
                      Add Task
                    </Button>
                  </div>
                  
                  {showAddTask && (
                    <div className="p-4 bg-gray-50 rounded-md mb-4 border border-gray-200">
                      <h4 className="font-medium mb-2">Add Task</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm mb-1">Description</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md" 
                            placeholder="Enter task description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Assigned To</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md" 
                            placeholder="Enter assignee"
                            value={newTask.assignedTo}
                            onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Due Date</label>
                          <input 
                            type="date" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowAddTask(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleAddTask}
                            isLoading={saving}
                          >
                            Add Task
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {tasks.length === 0 ? (
                    <p className="text-gray-500 italic p-4 bg-gray-50 rounded border border-gray-200">No tasks assigned</p>
                  ) : (
                    <div className="overflow-x-auto border border-gray-200 rounded-md">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned to</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Set by</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {tasks.map((task) => (
                            <tr key={task.id}>
                              <td className="px-4 py-3 whitespace-nowrap">{task.description}</td>
                              <td className="px-4 py-3 whitespace-nowrap">{task.assignedTo}</td>
                              <td className="px-4 py-3 whitespace-nowrap">You</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                  Open
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">{task.dueDate}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <Button variant="ghost" size="sm">Complete</Button>
                                <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-50 rounded-xl p-8 text-center">
            <div>
              <h3 className="text-lg font-medium mb-2">Select a control from the sidebar</h3>
              <p className="text-gray-600">Choose a control to view and manage its implementation details</p>
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  );
};

export default FrameworkControls;
