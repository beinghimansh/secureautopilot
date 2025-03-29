import React from 'react';

export interface Rule {
  id: number;
  number: string;
  content: string;
  status?: 'compliant' | 'non_compliant' | 'in_progress' | 'not_applicable';
  notes?: string;
  documents?: any[];
  description?: string;
  requirement?: string;
  clauses?: Rule[];
}

// ISO 27001 control categories mapped to the Annex A controls
const iso27001Rules: Rule[] = [
  {
    id: 1,
    number: "A.5",
    content: "Information Security Policies",
    description: "Management direction for information security",
    status: 'in_progress',
    clauses: [
      {
        id: 101,
        number: "A.5.1",
        content: "Information Security Policies",
        description: "To provide management direction and support for information security in accordance with business requirements and relevant laws and regulations.",
        requirement: "Policies for information security should be defined, approved by management, published and communicated to employees and relevant external parties.",
        status: 'in_progress'
      },
      {
        id: 102,
        number: "A.5.1.1",
        content: "Policies for information security",
        description: "A set of policies for information security should be defined, approved by management, published and communicated to employees and relevant external parties.",
        requirement: "The organization must establish policies for information security, have them approved by management, and communicate them to employees and relevant external parties.",
        status: 'in_progress'
      },
      {
        id: 103,
        number: "A.5.1.2",
        content: "Review of the policies for information security",
        description: "The policies for information security should be reviewed at planned intervals or if significant changes occur to ensure their continuing suitability, adequacy and effectiveness.",
        requirement: "The organization should review information security policies at planned intervals or when significant changes occur.",
        status: 'in_progress'
      }
    ]
  },
  {
    id: 2,
    number: "A.6",
    content: "Organization of Information Security",
    description: "Internal organization and mobile devices/teleworking",
    status: 'compliant',
    clauses: [
      {
        id: 201,
        number: "A.6.1",
        content: "Internal Organization",
        description: "Framework for initiating and controlling the implementation and operation of information security within the organization.",
        requirement: "All information security responsibilities should be defined and allocated.",
        status: 'compliant'
      },
      {
        id: 202,
        number: "A.6.1.1",
        content: "Information security roles and responsibilities",
        description: "All information security responsibilities should be defined and allocated.",
        requirement: "The organization must clearly define and allocate information security responsibilities.",
        status: 'compliant'
      },
      {
        id: 203,
        number: "A.6.1.2",
        content: "Segregation of duties",
        description: "Conflicting duties and areas of responsibility should be segregated to reduce opportunities for unauthorized or unintentional modification or misuse of the organization's assets.",
        requirement: "The organization should implement segregation of duties to prevent conflicts of interest.",
        status: 'compliant'
      },
      {
        id: 204,
        number: "A.6.1.3",
        content: "Contact with authorities",
        description: "Appropriate contacts with relevant authorities should be maintained.",
        requirement: "The organization must maintain appropriate contacts with relevant authorities.",
        status: 'compliant'
      },
      {
        id: 205,
        number: "A.6.1.4",
        content: "Contact with special interest groups",
        description: "Appropriate contacts with special interest groups or other specialist security forums and professional associations should be maintained.",
        requirement: "The organization should maintain contacts with special interest groups or security forums.",
        status: 'compliant'
      },
      {
        id: 206,
        number: "A.6.1.5",
        content: "Information security in project management",
        description: "Information security should be addressed in project management, regardless of the type of the project.",
        requirement: "The organization must address information security in all project management activities.",
        status: 'compliant'
      },
      {
        id: 207,
        number: "A.6.2",
        content: "Mobile devices and teleworking",
        description: "Security of mobile devices and teleworking.",
        requirement: "Policy and supporting security measures should be adopted to manage the risks introduced by using mobile devices.",
        status: 'compliant'
      }
    ]
  },
  {
    id: 3,
    number: "A.7",
    content: "Human Resource Security",
    description: "Prior to, during, and termination or change of employment",
    status: 'non_compliant',
    clauses: [
      {
        id: 301,
        number: "A.7.1",
        content: "Prior to employment",
        description: "To ensure that employees and contractors understand their responsibilities and are suitable for the roles for which they are considered.",
        requirement: "Background verification checks on all candidates for employment should be carried out in accordance with relevant laws, regulations and ethics.",
        status: 'non_compliant'
      },
      {
        id: 302,
        number: "A.7.2",
        content: "During employment",
        description: "To ensure that employees and contractors are aware of and fulfil their information security responsibilities.",
        requirement: "Management should require all employees and contractors to apply information security in accordance with the established policies and procedures of the organization.",
        status: 'in_progress'
      },
      {
        id: 303,
        number: "A.7.3",
        content: "Termination and change of employment",
        description: "To protect the organization's interests as part of the process of changing or terminating employment.",
        requirement: "Information security responsibilities and duties that remain valid after termination or change of employment should be defined, communicated to the employee or contractor and enforced.",
        status: 'non_compliant'
      }
    ]
  },
  {
    id: 4,
    number: "A.8",
    content: "Asset Management",
    description: "Responsibility for assets, information classification, and media handling",
    status: 'in_progress',
    clauses: [
      {
        id: 401,
        number: "A.8.1",
        content: "Responsibility for assets",
        description: "To identify organizational assets and define appropriate protection responsibilities.",
        requirement: "Assets associated with information and information processing facilities should be identified and an inventory of these assets should be drawn up and maintained.",
        status: 'in_progress'
      },
      {
        id: 402,
        number: "A.8.2",
        content: "Information classification",
        description: "To ensure that information receives an appropriate level of protection in accordance with its importance to the organization.",
        requirement: "Information should be classified in terms of legal requirements, value, criticality and sensitivity to unauthorized disclosure or modification.",
        status: 'in_progress'
      },
      {
        id: 403,
        number: "A.8.3",
        content: "Media handling",
        description: "To prevent unauthorized disclosure, modification, removal or destruction of information stored on media.",
        requirement: "Procedures for the management of removable media should be implemented in accordance with the classification scheme adopted by the organization.",
        status: 'in_progress'
      }
    ]
  },
  {
    id: 5,
    number: "A.9",
    content: "Access Control",
    description: "Business requirements, user access mgmt, system and application access control",
    status: 'compliant',
    clauses: [
      {
        id: 501,
        number: "A.9.1",
        content: "Business requirements of access control",
        description: "To limit access to information and information processing facilities.",
        requirement: "An access control policy should be established, documented and reviewed based on business and information security requirements.",
        status: 'compliant'
      },
      {
        id: 502,
        number: "A.9.2",
        content: "User access management",
        description: "To ensure authorized user access and to prevent unauthorized access to systems and services.",
        requirement: "A formal user registration and de-registration process should be implemented to enable assignment of access rights.",
        status: 'compliant'
      },
      {
        id: 503,
        number: "A.9.3",
        content: "User responsibilities",
        description: "To make users accountable for safeguarding their authentication information.",
        requirement: "Users should be required to follow the organization's practices in the use of secret authentication information.",
        status: 'compliant'
      },
      {
        id: 504,
        number: "A.9.4",
        content: "System and application access control",
        description: "To prevent unauthorized access to systems and applications.",
        requirement: "Access to information and application system functions should be restricted in accordance with the access control policy.",
        status: 'compliant'
      }
    ]
  },
  {
    id: 6,
    number: "A.10",
    content: "Cryptography",
    description: "Cryptographic controls",
    status: 'in_progress',
    clauses: [
      {
        id: 601,
        number: "A.10.1",
        content: "Cryptographic controls",
        description: "To ensure proper and effective use of cryptography to protect the confidentiality, authenticity and/or integrity of information.",
        requirement: "A policy on the use of cryptographic controls for protection of information should be developed and implemented.",
        status: 'in_progress'
      }
    ]
  },
  {
    id: 7,
    number: "A.11",
    content: "Physical and Environmental Security",
    description: "Secure areas and equipment",
    status: 'in_progress',
    clauses: [
      {
        id: 701,
        number: "A.11.1",
        content: "Secure areas",
        description: "To prevent unauthorized physical access, damage and interference to the organization's information and information processing facilities.",
        requirement: "Security perimeters should be defined and used to protect areas that contain either sensitive or critical information and information processing facilities.",
        status: 'in_progress'
      },
      {
        id: 702,
        number: "A.11.2",
        content: "Equipment",
        description: "To prevent loss, damage, theft or compromise of assets and interruption to the organization's operations.",
        requirement: "Equipment should be correctly maintained to ensure its continued availability and integrity.",
        status: 'in_progress'
      }
    ]
  },
  {
    id: 8,
    number: "A.12",
    content: "Operations Security",
    description: "Operational procedures, protection from malware, backup, logging, etc.",
    status: 'in_progress',
    clauses: [
      {
        id: 801,
        number: "A.12.1",
        content: "Operational procedures and responsibilities",
        description: "To ensure correct and secure operations of information processing facilities.",
        requirement: "Operating procedures should be documented and made available to all users who need them.",
        status: 'in_progress'
      },
      {
        id: 802,
        number: "A.12.2",
        content: "Protection from malware",
        description: "To ensure that information and information processing facilities are protected against malware.",
        requirement: "Detection, prevention and recovery controls to protect against malware should be implemented, combined with appropriate user awareness.",
        status: 'in_progress'
      },
      {
        id: 803,
        number: "A.12.3",
        content: "Backup",
        description: "To protect against loss of data.",
        requirement: "Backup copies of information, software and system images should be taken and tested regularly in accordance with an agreed backup policy.",
        status: 'in_progress'
      },
      {
        id: 804,
        number: "A.12.4",
        content: "Logging and monitoring",
        description: "To record events and generate evidence.",
        requirement: "Event logs recording user activities, exceptions, faults and information security events should be produced, kept and regularly reviewed.",
        status: 'in_progress'
      },
      {
        id: 805,
        number: "A.12.5",
        content: "Control of operational software",
        description: "To ensure the integrity of operational systems.",
        requirement: "Procedures should be implemented to control the installation of software on operational systems.",
        status: 'in_progress'
      },
      {
        id: 806,
        number: "A.12.6",
        content: "Technical vulnerability management",
        description: "To prevent exploitation of technical vulnerabilities.",
        requirement: "Information about technical vulnerabilities of information systems being used should be obtained in a timely fashion.",
        status: 'in_progress'
      },
      {
        id: 807,
        number: "A.12.7",
        content: "Information systems audit considerations",
        description: "To minimize the impact of audit activities on operational systems.",
        requirement: "Audit requirements and activities involving verification of operational systems should be carefully planned and agreed to minimize disruptions to business processes.",
        status: 'in_progress'
      }
    ]
  },
  {
    id: 9,
    number: "A.13",
    content: "Communications Security",
    description: "Network security management and information transfer",
    status: 'in_progress',
    clauses: [
      {
        id: 901,
        number: "A.13.1",
        content: "Network security management",
        description: "To ensure the protection of information in networks and its supporting information processing facilities.",
        requirement: "Networks should be managed and controlled to protect information in systems and applications.",
        status: 'in_progress'
      },
      {
        id: 902,
        number: "A.13.2",
        content: "Information transfer",
        description: "To maintain the security of information transferred within an organization and with any external entity.",
        requirement: "Formal transfer policies, procedures and controls should be in place to protect the transfer of information through the use of all types of communication facilities.",
        status: 'in_progress'
      }
    ]
  },
  {
    id: 10,
    number: "A.14",
    content: "System Acquisition, Development and Maintenance",
    description: "Security requirements, secure development, test data",
    status: 'in_progress'
  },
  {
    id: 11,
    number: "A.15",
    content: "Supplier Relationships",
    description: "Information security in supplier relationships and service delivery",
    status: 'non_compliant'
  },
  {
    id: 12,
    number: "A.16",
    content: "Information Security Incident Management",
    description: "Management of incidents and improvements",
    status: 'non_compliant'
  },
  {
    id: 13,
    number: "A.17",
    content: "Information Security Aspects of Business Continuity Management",
    description: "Information security continuity and redundancies",
    status: 'non_compliant'
  },
  {
    id: 14,
    number: "A.18",
    content: "Compliance",
    description: "Compliance with legal, regulatory, and contractual requirements",
    status: 'in_progress'
  }
];

// GDPR implementation requirements
const gdprRules: Rule[] = [
  {
    id: 1,
    number: "GDPR.1",
    content: "Lawful basis for processing",
    status: 'in_progress',
    description: "Ensuring a lawful basis for processing personal data",
    requirement: "Organizations must identify and document a valid lawful basis for each processing activity."
  },
  {
    id: 2,
    number: "GDPR.2",
    content: "Data subject rights",
    status: 'in_progress',
    description: "Implementation of data subject rights",
    requirement: "Organizations must implement procedures to handle data subject rights including access, rectification, erasure, and portability."
  },
  {
    id: 3,
    number: "GDPR.3",
    content: "Consent management",
    status: 'non_compliant',
    description: "Managing consent for data processing",
    requirement: "When relying on consent, it must be freely given, specific, informed, and unambiguous."
  },
  {
    id: 4,
    number: "GDPR.4",
    content: "Privacy notices",
    status: 'in_progress',
    description: "Transparent information provision",
    requirement: "Organizations must provide clear and transparent privacy notices to data subjects."
  },
  {
    id: 5,
    number: "GDPR.5",
    content: "Data protection impact assessments",
    status: 'non_compliant',
    description: "Conducting DPIAs for high-risk processing",
    requirement: "DPIAs must be conducted where processing is likely to result in high risk to individuals."
  },
  {
    id: 6,
    number: "GDPR.6",
    content: "Records of processing activities",
    status: 'in_progress',
    description: "Documentation of processing activities",
    requirement: "Organizations must maintain records of all categories of processing activities."
  },
  {
    id: 7,
    number: "GDPR.7",
    content: "Data breach notification",
    status: 'non_compliant',
    description: "Procedures for breach notification",
    requirement: "Personal data breaches must be reported to supervisory authorities within 72 hours."
  },
  {
    id: 8,
    number: "GDPR.8",
    content: "Data Protection Officer",
    status: 'non_compliant',
    description: "Appointment of a DPO",
    requirement: "A Data Protection Officer must be appointed in certain circumstances."
  },
  {
    id: 9,
    number: "GDPR.9",
    content: "International data transfers",
    status: 'in_progress',
    description: "Compliance with transfer restrictions",
    requirement: "Personal data may only be transferred outside the EEA if appropriate safeguards are in place."
  },
  {
    id: 10,
    number: "GDPR.10",
    content: "Data minimization and accuracy",
    status: 'in_progress',
    description: "Implementation of data principles",
    requirement: "Personal data should be adequate, relevant, limited, accurate and kept up to date."
  }
];

// SOC 2 controls - updated with detailed requirements
const soc2Rules: Rule[] = [
  {
    id: 1,
    number: "CC1",
    content: "Control Environment",
    status: 'in_progress',
    description: "The control environment is the foundation of a service organization's control system",
    requirement: "Management and those charged with governance must establish the tone at the top regarding the importance of internal controls."
  },
  {
    id: 2,
    number: "CC2",
    content: "Communication and Information",
    status: 'in_progress',
    description: "Collection and communication of relevant information",
    requirement: "The organization obtains or generates and uses relevant quality information to support the functioning of internal control."
  },
  {
    id: 3,
    number: "CC3",
    content: "Risk Assessment",
    status: 'non_compliant',
    description: "Process for identifying and managing risks",
    requirement: "The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives."
  },
  {
    id: 4,
    number: "CC4",
    content: "Monitoring Activities",
    status: 'non_compliant',
    description: "Evaluating control effectiveness",
    requirement: "The entity selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning."
  },
  {
    id: 5,
    number: "CC5",
    content: "Control Activities",
    status: 'in_progress',
    description: "Actions established through policies and procedures",
    requirement: "The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives."
  },
  {
    id: 6,
    number: "CC6",
    content: "Logical and Physical Access Controls",
    status: 'compliant',
    description: "Controls over system access and physical facilities",
    requirement: "The entity implements logical access security software, infrastructure, and architectures over protected information assets.",
    clauses: [
      {
        id: 601,
        number: "CC6.1",
        content: "Access Controls (Logical and Physical)",
        description: "The entity implements logical access security software, infrastructure, and architectures for authentication and access enforcement.",
        requirement: "Access to information assets is protected through the implementation of identity management and access controls.",
        status: 'compliant'
      },
      {
        id: 602,
        number: "CC6.2",
        content: "System Monitoring",
        description: "The entity implements and operates monitoring systems to identify potential security breaches and incidents.",
        requirement: "Systems are monitored for unauthorized access attempts and security events to enable timely response.",
        status: 'in_progress'
      },
      {
        id: 603,
        number: "CC6.3",
        content: "Change Management",
        description: "The entity implements policies and procedures to manage changes to system components.",
        requirement: "Changes to infrastructure, data, software, and procedures are authorized, tested, approved, and implemented to meet the entity's objectives.",
        status: 'in_progress'
      },
      {
        id: 604,
        number: "CC6.4",
        content: "Incident Response",
        description: "The entity has formal incident response procedures for security events.",
        requirement: "Security incidents are identified, reported, and addressed in a timely manner to minimize impact.",
        status: 'non_compliant'
      },
      {
        id: 605,
        number: "CC6.5",
        content: "Risk Assessment",
        description: "The entity identifies and assesses risks to achieving its objectives.",
        requirement: "Regular risk assessments are performed to identify threats and vulnerabilities that could impact system security.",
        status: 'in_progress'
      },
      {
        id: 606,
        number: "CC6.6",
        content: "Security Awareness Training",
        description: "The entity implements a security awareness training program for all personnel.",
        requirement: "Personnel receive regular training on security awareness and their responsibilities regarding information security.",
        status: 'compliant'
      },
      {
        id: 607,
        number: "CC6.7",
        content: "Data Protection",
        description: "The entity has controls to protect sensitive data throughout its lifecycle.",
        requirement: "Sensitive data is identified and protected during collection, storage, processing, transmission, and disposal.",
        status: 'in_progress'
      },
      {
        id: 608,
        number: "CC6.8",
        content: "Vulnerability Management",
        description: "The entity identifies and manages vulnerabilities in its systems.",
        requirement: "Systems are regularly scanned for vulnerabilities, and identified vulnerabilities are remediated in a timely manner.",
        status: 'non_compliant'
      },
      {
        id: 609,
        number: "CC6.9",
        content: "Configuration Management",
        description: "The entity manages the configuration of system components to reduce security risks.",
        requirement: "System configurations are documented, implemented according to security best practices, and monitored for compliance.",
        status: 'in_progress'
      },
      {
        id: 610,
        number: "CC6.10",
        content: "Business Continuity and Disaster Recovery",
        description: "The entity has plans for business continuity and disaster recovery.",
        requirement: "Business continuity and disaster recovery plans are documented, tested, and updated to ensure system availability and data recovery.",
        status: 'non_compliant'
      }
    ]
  },
  {
    id: 7,
    number: "CC7",
    content: "System Operations",
    status: 'in_progress',
    description: "Managing system operations",
    requirement: "The entity manages system operations to detect and mitigate security and related system breaches and other incidents."
  },
  {
    id: 8,
    number: "CC8",
    content: "Change Management",
    status: 'in_progress',
    description: "Managing system changes",
    requirement: "The entity authorizes, designs, develops, implements, and tests changes to infrastructure, data, software, and procedures."
  },
  {
    id: 9,
    number: "CC9",
    content: "Risk Mitigation",
    status: 'non_compliant',
    description: "Business disruption and mitigation",
    requirement: "The entity identifies, selects, and develops risk mitigation activities for risks arising from business disruptions."
  }
];

// HIPAA controls
const hipaaRules: Rule[] = [
  {
    id: 1,
    number: "H.1",
    content: "Privacy Rule",
    status: 'in_progress',
    description: "Standards for the use and disclosure of protected health information (PHI)",
    requirement: "Covered entities must implement safeguards to protect PHI and limit disclosures to the minimum necessary."
  },
  {
    id: 2,
    number: "H.2",
    content: "Security Rule - Administrative Safeguards",
    status: 'in_progress',
    description: "Administrative actions to manage security measures",
    requirement: "Organizations must implement security management processes, assigned security responsibility, workforce security, etc."
  },
  {
    id: 3,
    number: "H.3",
    content: "Security Rule - Physical Safeguards",
    status: 'non_compliant',
    description: "Physical measures to protect electronic systems",
    requirement: "Controls must be implemented for facility access, workstation use and security, and device and media controls."
  },
  {
    id: 4,
    number: "H.4",
    content: "Security Rule - Technical Safeguards",
    status: 'in_progress',
    description: "Technology to protect and control access to PHI",
    requirement: "Organizations must implement access controls, audit controls, integrity controls, and transmission security."
  },
  {
    id: 5,
    number: "H.5",
    content: "Breach Notification Rule",
    status: 'non_compliant',
    description: "Requirements to provide notification following a breach",
    requirement: "Covered entities must notify affected individuals, HHS, and in some cases the media, following a breach of unsecured PHI."
  },
  {
    id: 6,
    number: "H.6",
    content: "Business Associate Agreements",
    status: 'in_progress',
    description: "Contracts with service providers",
    requirement: "Covered entities must have written contracts with business associates that safeguard PHI."
  },
  {
    id: 7,
    number: "H.7",
    content: "Training and Awareness",
    status: 'in_progress',
    description: "Staff education on HIPAA requirements",
    requirement: "All workforce members must receive appropriate training on policies and procedures."
  },
  {
    id: 8,
    number: "H.8",
    content: "Documentation and Risk Analysis",
    status: 'non_compliant',
    description: "Documentation of compliance efforts",
    requirement: "Organizations must conduct an accurate and thorough assessment of potential risks to PHI."
  }
];

// PCI DSS controls
const pciDssRules: Rule[] = [
  {
    id: 1,
    number: "PCI.1",
    content: "Build and Maintain a Secure Network",
    status: 'in_progress',
    description: "Install and maintain a firewall configuration and secure system components",
    requirement: "Organizations must install and maintain a firewall configuration to protect cardholder data."
  },
  {
    id: 2,
    number: "PCI.2",
    content: "Protect Cardholder Data",
    status: 'in_progress',
    description: "Protect stored cardholder data and encrypt transmission",
    requirement: "Protection methods such as encryption, truncation, masking, and hashing are critical components of cardholder data protection."
  },
  {
    id: 3,
    number: "PCI.3",
    content: "Maintain a Vulnerability Management Program",
    status: 'non_compliant',
    description: "Antivirus and secure systems/applications",
    requirement: "Organizations must use and regularly update anti-virus software and develop and maintain secure systems and applications."
  },
  {
    id: 4,
    number: "PCI.4",
    content: "Implement Strong Access Control Measures",
    status: 'compliant',
    description: "Restrict access and authenticate users",
    requirement: "Access to system components and cardholder data should be limited to only those individuals whose job requires such access."
  },
  {
    id: 5,
    number: "PCI.5",
    content: "Regularly Monitor and Test Networks",
    status: 'in_progress',
    description: "Track access and test security systems",
    requirement: "Organizations must track and monitor all access to network resources and cardholder data."
  },
  {
    id: 6,
    number: "PCI.6",
    content: "Maintain an Information Security Policy",
    status: 'in_progress',
    description: "Information security policy maintenance",
    requirement: "A strong security policy sets the security tone for the whole organization and informs personnel what is expected of them."
  }
];

export const getRulesByFramework = (frameworkId: string): Rule[] => {
  switch (frameworkId) {
    case 'iso27001':
      return iso27001Rules;
    case 'gdpr':
      return gdprRules;
    case 'soc2':
      return soc2Rules;
    case 'hipaa':
      return hipaaRules;
    case 'pci_dss':
      return pciDssRules;
    default:
      return [];
  }
};
