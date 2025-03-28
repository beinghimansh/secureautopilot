
// This file contains sample rule data for different compliance frameworks

export interface Rule {
  id: number;
  number: string;
  content: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
  notes?: string;
  documents?: any[];
  description?: string;
  requirement?: string;
}

// ISO 27001 Controls and Rules
export const iso27001Rules: Rule[] = [
  {
    id: 1,
    number: "A.5.1",
    content: "Information Security Policies",
    description: "Management direction for information security",
    requirement: "Provide management direction and support for information security in accordance with business requirements and relevant laws and regulations.",
    status: "in_progress"
  },
  {
    id: 2,
    number: "A.6.1",
    content: "Internal Organization",
    description: "Organization of information security",
    requirement: "Establish a management framework to initiate and control the implementation and operation of information security within the organization.",
    status: "compliant"
  },
  {
    id: 3,
    number: "A.7.1",
    content: "Human Resources Security",
    description: "Prior to employment",
    requirement: "Ensure that employees and contractors understand their responsibilities and are suitable for the roles for which they are considered.",
    status: "non_compliant"
  },
  {
    id: 4,
    number: "A.8.1",
    content: "Asset Management",
    description: "Responsibility for assets",
    requirement: "Identify organizational assets and define appropriate protection responsibilities.",
    status: "in_progress"
  },
  {
    id: 5,
    number: "A.9.1",
    content: "Access Control",
    description: "Business requirements of access control",
    requirement: "Limit access to information and information processing facilities.",
    status: "compliant"
  }
];

// SOC 2 Controls and Rules
export const soc2Rules: Rule[] = [
  {
    id: 1,
    number: "CC1.1",
    content: "Common Criteria - Control Environment",
    description: "The entity demonstrates a commitment to integrity and ethical values.",
    requirement: "Establish and communicate integrity and ethical values to personnel.",
    status: "compliant"
  },
  {
    id: 2,
    number: "CC2.1",
    content: "Common Criteria - Communication",
    description: "The entity obtains or generates information for security management.",
    requirement: "Obtain relevant, quality information to support the functioning of internal control.",
    status: "in_progress"
  },
  {
    id: 3,
    number: "CC3.1",
    content: "Common Criteria - Risk Assessment",
    description: "The entity specifies objectives with sufficient clarity.",
    requirement: "Specify objectives clearly to enable identification of risks.",
    status: "non_compliant"
  },
  {
    id: 4,
    number: "CC4.1",
    content: "Common Criteria - Monitoring Activities",
    description: "The entity selects, develops, and performs evaluations.",
    requirement: "Evaluate and communicate internal control deficiencies in a timely manner.",
    status: "in_progress"
  },
  {
    id: 5,
    number: "CC5.1",
    content: "Common Criteria - Control Activities",
    description: "The entity selects and develops control activities.",
    requirement: "Select and develop control activities that mitigate risks to objectives.",
    status: "not_applicable"
  }
];

// GDPR Controls and Rules
export const gdprRules: Rule[] = [
  {
    id: 1,
    number: "Art. 5",
    content: "Principles relating to processing",
    description: "Principles for personal data processing",
    requirement: "Process personal data lawfully, fairly, and transparently.",
    status: "in_progress"
  },
  {
    id: 2,
    number: "Art. 6",
    content: "Lawfulness of processing",
    description: "Legal basis for processing",
    requirement: "Ensure processing is based on at least one lawful basis.",
    status: "compliant"
  },
  {
    id: 3,
    number: "Art. 7",
    content: "Conditions for consent",
    description: "Requirements for valid consent",
    requirement: "Obtain freely given, specific, informed, and unambiguous consent.",
    status: "non_compliant"
  },
  {
    id: 4,
    number: "Art. 17",
    content: "Right to erasure",
    description: "Right to be forgotten",
    requirement: "Erase personal data upon request without undue delay.",
    status: "in_progress"
  },
  {
    id: 5,
    number: "Art. 25",
    content: "Data protection by design and default",
    description: "Privacy by design principles",
    requirement: "Implement appropriate technical and organizational measures.",
    status: "compliant"
  }
];

// HIPAA Controls and Rules
export const hipaaRules: Rule[] = [
  {
    id: 1,
    number: "§164.308(a)(1)",
    content: "Security Management Process",
    description: "Implementation of policies and procedures",
    requirement: "Implement policies and procedures to prevent, detect, contain, and correct security violations.",
    status: "in_progress"
  },
  {
    id: 2,
    number: "§164.308(a)(3)",
    content: "Workforce Security",
    description: "Workforce access management",
    requirement: "Implement policies and procedures for workforce member access to electronic PHI.",
    status: "non_compliant"
  },
  {
    id: 3,
    number: "§164.310(a)(1)",
    content: "Facility Access Controls",
    description: "Physical safeguards",
    requirement: "Implement policies and procedures to limit physical access to electronic information systems.",
    status: "compliant"
  },
  {
    id: 4,
    number: "§164.312(a)(1)",
    content: "Access Control",
    description: "Technical safeguards",
    requirement: "Implement technical policies and procedures to allow only authorized access to electronic PHI.",
    status: "in_progress"
  },
  {
    id: 5,
    number: "§164.316(a)",
    content: "Policies and Procedures",
    description: "Documentation requirements",
    requirement: "Implement reasonable and appropriate policies and procedures to comply with the HIPAA Security Rule.",
    status: "not_applicable"
  }
];

// PCI DSS Controls and Rules
export const pciDssRules: Rule[] = [
  {
    id: 1,
    number: "Req. 1",
    content: "Network Security",
    description: "Firewall configuration",
    requirement: "Install and maintain a firewall configuration to protect cardholder data.",
    status: "compliant"
  },
  {
    id: 2,
    number: "Req. 2",
    content: "System passwords",
    description: "Vendor-supplied defaults",
    requirement: "Do not use vendor-supplied defaults for system passwords and other security parameters.",
    status: "in_progress"
  },
  {
    id: 3,
    number: "Req. 3",
    content: "Cardholder data protection",
    description: "Stored cardholder data",
    requirement: "Protect stored cardholder data.",
    status: "non_compliant"
  },
  {
    id: 4,
    number: "Req. 4",
    content: "Data encryption",
    description: "Transmission of cardholder data",
    requirement: "Encrypt transmission of cardholder data across open, public networks.",
    status: "in_progress"
  },
  {
    id: 5,
    number: "Req. 5",
    content: "Anti-virus",
    description: "Malware protection",
    requirement: "Use and regularly update anti-virus software or programs.",
    status: "not_applicable"
  }
];

export const getRulesByFramework = (frameworkId: string): Rule[] => {
  switch (frameworkId) {
    case "iso27001":
      return iso27001Rules;
    case "soc2":
      return soc2Rules;
    case "gdpr":
      return gdprRules;
    case "hipaa":
      return hipaaRules;
    case "pci_dss":
      return pciDssRules;
    default:
      return [];
  }
};
