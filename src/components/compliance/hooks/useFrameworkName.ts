
import { useMemo } from 'react';

export function useFrameworkName(frameworkId: string | undefined): string {
  return useMemo(() => {
    switch (frameworkId) {
      case 'iso27001':
        return 'ISO 27001';
      case 'soc2':
        return 'SOC 2';
      case 'gdpr':
        return 'GDPR';
      case 'hipaa':
        return 'HIPAA';
      case 'pci_dss':
        return 'PCI DSS';
      case 'iso42001':
        return 'ISO 42001 (AI Act)';
      default:
        return 'Compliance Framework';
    }
  }, [frameworkId]);
}
