
export function useFrameworkName(frameworkId: string): string {
  return frameworkId === 'iso27001' ? 'ISO 27001' : 
    frameworkId === 'soc2' ? 'SOC 2' : 
    frameworkId === 'gdpr' ? 'GDPR' : 
    frameworkId === 'hipaa' ? 'HIPAA' : 
    frameworkId === 'pci_dss' ? 'PCI DSS' : 'Compliance';
}
