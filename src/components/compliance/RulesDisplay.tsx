
import React from 'react';
import { Card, CardContent } from '../common/Card';
import { FadeIn } from '../common/Transitions';
import Button from '../common/Button';

interface Rule {
  id: number;
  content: string;
  subrules?: {
    id: string;
    content: string;
  }[];
}

interface RulesDisplayProps {
  rules: Rule[];
  title?: string;
}

const RulesDisplay: React.FC<RulesDisplayProps> = ({ rules, title = "Rules" }) => {
  return (
    <FadeIn>
      <Card className="h-full">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">{title}</h2>
          <ol className="list-decimal pl-6 space-y-4">
            {rules.map((rule) => (
              <li key={rule.id} className="text-gray-800">
                <p className="mb-2">{rule.content}</p>
                {rule.subrules && rule.subrules.length > 0 && (
                  <ol className="list-[lower-alpha] pl-6 space-y-2 mt-2">
                    {rule.subrules.map((subrule) => (
                      <li key={subrule.id} className="text-gray-700 mb-2">
                        {subrule.content}
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-6 text-center">
            <Button variant="ghost" size="sm">
              Show all
            </Button>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default RulesDisplay;
